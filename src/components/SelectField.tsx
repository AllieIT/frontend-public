import React, { ChangeEventHandler } from "react";
import { SelectOption } from "../types";

export interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    options: SelectOption[];
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const SelectField = (props: SelectFieldProps) => {
    return (
        <div className="SelectContainer">
            <label>{props.label}<br/>
                <select name={props.name} value={props.value} onChange={props.onChange}>
                    {props.options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}