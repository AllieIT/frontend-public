import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { userCalls } from "../../api/calls";
import { destroyJWTToken, retrieveJWTData } from "../../util/cookies";

export const Dashboard = () => {

    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        // Attempt to retrieve JWT token
        const cookieData = retrieveJWTData();
        if (typeof cookieData.user_id === 'undefined')
            navigate("/signIn");
        else {
            userCalls.getUserFromId(cookieData.user_id).then((res) => {
                // If user is not found
                if (typeof res === 'string')
                    navigate("/signIn");
                else {
                    setFullName(res.name + ' ' + res.surname);
                }
            });
        }
    })

    const handleLogout = () => {
        userCalls.logOut().then(() => {
            destroyJWTToken();
            navigate("/signIn");
        });
    }

    return (
        <div id="dashboard">
            <h1>{fullName}</h1>
            <hr/>
            <div id="dashboard_menu">
                <a href="/enroll" className="NoDecor"><div className="dashboard_MenuOption">Zapisz się na zajęcia</div></a>
                <a href="/opinions" className="NoDecor"><div className="dashboard_MenuOption">Wystaw opinię</div></a>
                <div className="dashboard_MenuOption">Twoje zajęcia</div>
            </div>
            <div id="dashboard_freeSpace"/>
            <div onClick={handleLogout} id="dashboard_logOutButton">Wyloguj</div>
        </div>
    );
}