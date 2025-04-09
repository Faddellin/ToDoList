import React from "react";

interface TextInputAreaProps{
	placeHolderP: string;
	labelTextP: string;
	disabledP: boolean;
	inputTextP?: string;
	setParentValueFromInput: (inputValue: string) => void
}

const TextInputAreaC: React.FC<TextInputAreaProps> = 
	({
		placeHolderP,
		labelTextP,
		disabledP,
		inputTextP,
		setParentValueFromInput
	}) => {
	const [inputText, setInputText] = React.useState<string>(inputTextP === undefined ? "" : inputTextP);
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);
	const [invalid, setInvalid] = React.useState<boolean>(false);

	const changeInputText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value);
		setParentValueFromInput(event.target.value);
	};

	return(
		<div className={"TextInputAreaContainer" + (disabled == true ? " Disabled" : "" )}>
			<div className="TextInputAreaHandler">
				<label className="TextInputAreaLabel">{labelTextP}</label>
				<textarea className="TextInputArea" placeholder={placeHolderP} value={inputText}
					onChange={changeInputText} onClick={() => setInvalid(false)} disabled={disabled}>
				</textarea>
			</div>
		</div>
	);
}

export default TextInputAreaC