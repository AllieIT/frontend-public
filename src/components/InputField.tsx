import React, { ChangeEventHandler } from "react";

export interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const InputField = (props: InputFieldProps) => {
    return (
        <div className="InputContainer">
            <label>{props.label}<br/>
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
            </label>
        </div>
    )
}