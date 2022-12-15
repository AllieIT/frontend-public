import React from "react";
import { SignInForm } from "./SignInForm";

import '../../css/signIn.css';

export const SignInPage = () => {
    return (
        <div className="CentralFormWrapper">
            <SignInForm/>
        </div>
    );
}