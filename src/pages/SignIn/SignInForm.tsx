import React, { useState } from "react";
import { InputField } from "../../components";
import { useNavigate } from "react-router-dom";
import { SignInRequestBody } from "../../api/types/requests";
import { userCalls } from "../../api/calls";

interface SignInState {
    email: string;
    password: string;
}

export const SignInForm = () => {

    const navigate = useNavigate();
    const [state, setState] = useState<SignInState>({
        email: "",
        password: ""
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const requestBody: SignInRequestBody = {
            email: state.email,
            password: state.password
        }
        userCalls.signIn(requestBody).then(() => {
            navigate('/dashboard');
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    return (
        <div className="SignInForm">
            <form onSubmit={handleSubmit}>
                <InputField label="E-mail" type="email" name="email" value={state.email} onChange={handleChange}/>
                <InputField label="Hasło" type="password" name="password" value={state.password} onChange={handleChange}/>
                <div id="submitContainer">
                    <input className="SubmitButton" type="submit" value="Zaloguj się"/>
                </div>
            </form>
        </div>
    );
}