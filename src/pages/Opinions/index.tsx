import { SingleOpinion } from "./SingleOpinion";
import React, { useEffect, useState } from "react";
import { opinionCalls, teacherCalls, userCalls} from "../../api/calls";
import { UserResponse } from "../../api/types/responses";
import { SelectOption } from "../../types";
import { retrieveJWTData } from "../../util/cookies";
import { useNavigate } from "react-router-dom";
import { SelectField } from "../../components";

import '../../css/opinions.css';
import '../../css/singleOpinion.css';

interface OpinionState {
    opinion: string;
    teacher_id: number;
    user: UserResponse | null;
}

export const OpinionPage = () => {

    const navigate = useNavigate();
    const [teacherOptions, setTeacherOptions] = useState<SelectOption[]>([]);
    const [opinionIds, setOpinionIds] = useState<number[]>([]);
    const [submit, setSubmit] = useState<boolean>(false);
    const [state, setState] = useState<OpinionState>({
        opinion: "",
        teacher_id: -1,
        user: null
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        opinionCalls.postNewOpinion(state.teacher_id, state.user!.secondary_id!, state.opinion);
        setSubmit(true);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    useEffect(() => {
        const getUser = () => {
            const cookieData = retrieveJWTData();
            if (typeof cookieData.user_id === 'undefined')
                navigate("/signIn");
            else {
                userCalls.getUserFromId(cookieData.user_id).then((res) => {
                    if (typeof res === 'string')
                        navigate("/signIn");
                    else {
                        setState({
                            ...state,
                            user: res
                        })
                    }
                });
            }
        }
        const getOpinionIds = () => {
            opinionCalls.getAllOpinionIds().then((ids) => {
                setOpinionIds(ids);
            })
        }
        const getOptions = () => {
            teacherCalls.getAllTeacherNames().then(idNamesPair => {
                for (const idNamePair of idNamesPair) {
                    teacherOptions.push({
                        label: idNamePair[1],
                        value: idNamePair[0].toString()
                    });
                }
                setState({
                    ...state,
                    teacher_id: idNamesPair[0][0]
                });
            });
        }

        if (!state.user)
            getUser();
        if (opinionIds.length === 0)
            getOpinionIds();
        if (teacherOptions.length === 0)
            getOptions();
    });

    return (
        <div id="opinionRoot">
            <div id="opinionFormWrapper">
                <div className="OpinionForm">
                    <form onSubmit={handleSubmit}>
                        <label> Opinia: <br/>
                            <textarea
                                name="opinion"
                                value={state.opinion}
                                onChange={handleChange}
                                placeholder={"Twoja opinia"}
                                rows = {5}
                            />
                        </label>
                        <div className="HorizontalFlexContainer">
                            <SelectField label="Nauczyciel" name="teacher_id" value={state.teacher_id.toString()}
                                         options={teacherOptions} onChange={handleChange}/>
                        </div>
                        <div id="submitContainer">
                            <input className="SubmitButton" type="submit" value="Opublikuj"/>
                        </div>
                    </form>
                </div>
            </div>
            <div id="opinionContainer">
                <h1>Opinie</h1>
                <br/><br/>
                {
                    opinionIds.map((id) => <SingleOpinion opinion_id={id}/>)
                }
            </div>
        </div>
    );
}