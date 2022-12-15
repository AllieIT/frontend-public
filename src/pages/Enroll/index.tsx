import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { classCalls, enrollCalls, userCalls } from '../../api/calls';
import { ClassResponse, UserResponse } from "../../api/types/responses";
import { CookieData, retrieveJWTData } from "../../util/cookies";

import { SingleEnroll } from './SingleEnroll';

import '../../css/enroll.css';

export const EnrollPage = () => {

    const navigate = useNavigate();

    const [dayClassMap, setDayClassMap] = useState<[string, ClassResponse[]][]>([]);
    const [enrollsChecked, setEnrollsChecked] = useState<boolean>(false);
    const [userEnrolls, setUserEnrolls] = useState<number[]>([]);
    const [user, setUser] = useState<UserResponse>();

    useEffect(() => {

        const getClasses = async () => {
            classCalls.getAllClasses().then((res) => {

                const dateSet: Set<string> = new Set();
                const startDates = res.map(classObj => classObj.start_time);
                startDates.sort();

                const dayClassMap: [string, ClassResponse[]][] = []

                for (const startDate of startDates) {
                    const date = new Date(startDate);
                    const dateString = `${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    dateSet.add(dateString);
                }

                const days = Array.from(dateSet);
                for (const dayStr of days) {
                    dayClassMap.push([dayStr, []]);
                }

                for (const classObj of res) {
                    const date = new Date(classObj.start_time);
                    const dateString = `${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    for (const dateListPair of dayClassMap) {
                        if (dateListPair[0] === dateString) {
                            dateListPair[1].push(classObj);
                        }
                    }
                }

                setDayClassMap(dayClassMap);
            })
        }

        const getUserAndEnrolls = (cookieData: CookieData) => {
            if (typeof cookieData.user_id === 'undefined') {
                navigate("/signIn");
            } else {
                if (!user) {
                    userCalls.getUserFromId(cookieData.user_id).then((res) => {
                        if (typeof res !== 'string') {
                            setUser(res)
                            if (!enrollsChecked) {
                                setEnrollsChecked(true)
                                if (!res.is_teacher) {
                                    enrollCalls.getClassIdsForStudent(res.secondary_id!).then((res) => {
                                        setUserEnrolls(res);
                                    });
                                }
                            }
                        }
                    });
                }
            }
        }

        if (dayClassMap.length === 0)
            getClasses().then();
        if (!user) {
            getUserAndEnrolls(retrieveJWTData());
        }
    });

    return (
        <div id="enrollPageContainer">
            <div id="enrollContainer">
                <h1>{user ? (user.name + ' ' + user.surname) : ''}</h1>
                <hr/><br/>
                {
                    dayClassMap.map(dayClassPair =>
                        <div className="enroll_dayContainer">
                            <h2>{dayClassPair[0]}</h2>
                            {dayClassPair[1].map(classObj => <SingleEnroll classObj={classObj} user={user} userClasses={userEnrolls}/>)}
                        </div>
                    )
                }
            </div>
        </div>
    );
}
