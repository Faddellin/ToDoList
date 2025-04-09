import React from "react";
import { DateConvertor } from "../../../utility/DateConvertor";

interface TextInputDateProps{
	inputDateP?: Date | undefined;
	labelTextP: string;
	disabledP: boolean;
	setParentValueFromInputP: (inputValue: Date | undefined) => void
}

const TextInputDateC: React.FC<TextInputDateProps> = 
	({
		inputDateP,
		labelTextP,
		disabledP,
		setParentValueFromInputP
	}) => {
	const [inputDate, setInputDate] = React.useState<Date | undefined>(inputDateP);
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);

	const changeInputTextDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(event.target.value);
		
		if (isNaN(newDate.getTime())){
			setInputDate(undefined);
			setParentValueFromInputP(undefined);
		}else{
			setInputDate(newDate);
			setParentValueFromInputP(newDate);
		}

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

export default TextInputDateC