import React, {useEffect, useState} from "react";
import { opinionCalls, studentCalls, teacherCalls } from "../../api/calls";
import {OpinionResponse} from "../../api/types/responses";

interface SingleOpinionParams {
    opinion_id: number;
}

export const SingleOpinion = (params: SingleOpinionParams) => {

    const [opinion, setOpinion] = useState<OpinionResponse | null>(null);
    const [name, setName] = useState<string>('');
    const [teacherName, setTeacherName] = useState<string>('');

    useEffect(() => {
        if (opinion == null)
            opinionCalls.getOpinionData(params.opinion_id).then((opinionRes) => {
               setOpinion(opinionRes);
               teacherCalls.getUserFromTeacherId(opinionRes.teacher_id).then((res) => {
                   if (!(typeof res === 'string')) {
                       setTeacherName(res.name + ' ' + res.surname);
                   }
               });
               studentCalls.getUserFromStudentId(opinionRes.student_id).then((res) => {
                   if (!(typeof res === 'string')) {
                       setName(res.name + ' ' + res.surname);
                   }
               });
            });
    });

    return (
        <div className="SingleOpinionBox">
            <div className="SingleOpinionPreamble"><b>{name}</b> o {teacherName}</div>
            <div className="SingleOpinionOpinion">{opinion ? opinion.opinion : ''}</div>
            <h3 className="SingleOpinionDate">{opinion ? new Date(opinion.posted).toLocaleDateString() : ''}</h3>
        </div>
    )
}