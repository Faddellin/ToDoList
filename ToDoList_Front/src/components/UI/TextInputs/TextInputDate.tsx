import React from "react";
import { DateConvertor } from "../../../utility/DateConvertor";

interface TextInputDateProps{
	inputDateP?: string;
	labelTextP: string;
	disabledP: boolean;
	setParentValueFromInput: (inputValue: string) => void
}

const TextInputDate: React.FC<TextInputDateProps> = 
	({
		labelTextP,
		disabledP,
		setParentValueFromInput
	}) => {
	const [inputDate, setInputDate] = React.useState<Date>(new Date(Date.now()));
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);

	const changeInputTextDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(event.target.value);
		setInputDate(newDate);

		setParentValueFromInput(DateConvertor.GetDateWithoutTime(newDate));
	};

	return(
		<div className={"TextInputDateContainer" + (disabled == true ? " Disabled" : "" )}>
			<div className="TextInputDateHandler">
				<label className="TextInputDateLabel">{labelTextP}</label>
				<input type="date" value={DateConvertor.GetDateWithoutTimeISOFormat(inputDate)} className="TextInputDate" onChange={changeInputTextDate} disabled={disabled}>
				</input>
			</div>
		</div>
	);
}

export default TextInputDate