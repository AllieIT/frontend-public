import { useEffect, useState } from "react";
import { enrollCalls, teacherCalls } from "../../api/calls";
import { ClassResponse, UserResponse } from "../../api/types/responses";

import '../../css/singleEnroll.css';

export interface SingleEnrollProps {
    classObj: ClassResponse;
    user: UserResponse | undefined;
    userClasses: number[];
}

export const SingleEnroll = (props: SingleEnrollProps) => {

    const [teacherName, setTeacherName] = useState<string>("Nieznany");
    const [buttonStates, setButtonStates] = useState<boolean[]>([false, true]);

    useEffect(() => {
        const getTeacherName = async () => {
            teacherCalls.getUserFromTeacherId(props.classObj.teacher_id).then((res) => {
                if (typeof res !== 'string') {
                    setTeacherName(res.name + ' ' + res.surname);
                }
            })
        }

        if (teacherName === "Nieznany")
            getTeacherName().then();
        if (props.userClasses.includes(props.classObj.class_id)) {
            setButtonStates([true, false]);
        }
    }, [teacherName, props.userClasses, props.classObj.class_id, props.classObj.teacher_id]);

    const enrollOnClick = () => {
        console.log(JSON.stringify(props.user));
        enrollCalls.enrollIntoClass(props.classObj.class_id, props.user!.secondary_id!).then((res) => {
            alert(res);
        });
        setButtonStates([true, false]);
        props.classObj.enrolled ++;
    }

    const deleteOnClick = () => {
        enrollCalls.cancelEnroll(props.classObj.class_id, props.user!.secondary_id!).then((res) => {
            alert(res);
        });
        setButtonStates([false, true]);
        props.classObj.enrolled --;
    }

    return (
        <div className="singleEnroll_container">
            <div className="singleEnroll_name">{props.classObj.name}</div>
            <div className="singleEnroll_teacher">Prowadzący: {teacherName}</div>
            <div>Dostępnych miejsc: {Math.max(0, props.classObj.limit - props.classObj.enrolled)} / {props.classObj.limit}</div>
            <div>Na liście rezerwowej: {Math.max(0, props.classObj.enrolled - props.classObj.limit)}</div>
            <div className="singleEnroll_actionContainer">
                <button className="singleEnroll_button" id="singleEnroll_enrollButton" onClick={enrollOnClick} disabled={buttonStates[0]}>Zapisz</button>
                <button className="singleEnroll_button" id="singleEnroll_deleteButton" onClick={deleteOnClick} disabled={buttonStates[1]}>Zrezygnuj</button>
            </div>
        </div>
    );
}