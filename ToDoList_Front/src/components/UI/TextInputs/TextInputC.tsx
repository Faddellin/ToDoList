import React from "react";

interface TextInputProps{
	placeHolderP: string;
	labelTextP: string;
	disabledP: boolean;
	inputTextP?: string;
	supportTextP?: string;
	setParentValueFromInputP: (inputValue: string) => void
}

const TextInputC: React.FC<TextInputProps> = 
	({
		placeHolderP,
		labelTextP,
		disabledP,
		inputTextP,
		supportTextP,
		setParentValueFromInputP
	}) => {
	const [inputText, setInputText] = React.useState<string>(inputTextP === undefined ? "" : inputTextP);
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);
	const [invalid, setInvalid] = React.useState<boolean>(false);

	const changeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
		setParentValueFromInputP(event.target.value);
	};

	return(
		<div className={"TextInputContainer" + (invalid ? " Invalid" : "") + (disabled == true ? " Disabled" : "" )}>
			<div className="TextInputField">
				<div className="TextInputStateLayer">
					<label id="Label" className="TextInputLabel">{labelTextP}</label>
					<input className="TextInput" placeholder={placeHolderP} value={inputText}
						onChange={changeInputText} disabled={disabled}>
					</input>
				</div>
			</div>
			<div className="TextInputSupportText">
					{supportTextP}
			</div>
		</div>
	);
}

export default TextInputC