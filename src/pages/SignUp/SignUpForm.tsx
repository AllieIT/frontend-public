import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import facultyOptions from '../../static/faculties.json';
import groupOptions from '../../static/groupTypes.json';

import { InputField, SelectField } from "../../components";
import { SignUpRequestBody } from "../../api/types/requests";
import { userCalls } from "../../api/calls";

interface SignUpState {
    name: string;
    surname: string;
    password: string;
    repeatPassword: string;
    faculty: string;
    group_type: string;
    email: string;
}

export const SignUpForm = () => {

    const navigate = useNavigate();
    const [state, setState] = useState<SignUpState>({
        name: "",
        surname: "",
        email: "",
        group_type: "Męska",
        password: "",
        repeatPassword: "",
        faculty: "EAIIB",
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const requestBody: SignUpRequestBody = {
            name: state.name,
            surname: state.surname,
            password: state.password,
            group_type: state.group_type,
            faculty: state.faculty,
            email: state.email
        }
        userCalls.signUp(requestBody).then(() => {
            navigate('/signin');
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
        <div className="SignUpForm">
            <form onSubmit={handleSubmit}>
                <div className="HorizontalFlexContainer">
                    <InputField label="Imię" type="text" name="name"
                                value={state.name} onChange={handleChange}/>
                    <InputField label="Nazwisko" type="text" name="surname"
                                value={state.surname} onChange={handleChange}/>
                </div>
                <div className="HorizontalFlexContainer">
                    <InputField label="E-mail" type="email" name="email"
                                value={state.email} onChange={handleChange}/>
                    <SelectField label="Rodzaj grupy" name="group_type" value={state.group_type}
                                 options={groupOptions} onChange={handleChange}/>
                </div>
                <div className="HorizontalFlexContainer">
                    <InputField label="Hasło" type="password" name="password"
                                value={state.password} onChange={handleChange}/>
                    <InputField label="Powtórz hasło" type="password" name="repeatPassword"
                                value={state.repeatPassword} onChange={handleChange}/>
                </div>
                <div className="HorizontalFlexContainer">
                    <SelectField label="Wydział" name="faculty" value={state.faculty}
                                 options={facultyOptions} onChange={handleChange}/>
                </div>
                <div id="submitContainer">
                    <input className="SubmitButton" type="submit" value="Zarejestruj"/>
                </div>
            </form>
        </div>
    )
}