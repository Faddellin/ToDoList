import React from "react"

interface OutlinedButtonProps{
	buttonTextP: string;
	onClickP: () => void;
	disabledP: boolean;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = 
	({
		buttonTextP,
		onClickP,
		disabledP
	}) => {
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);

	return (
		<button id="OutlinedButtonContainer" className="OutlinedButtonContainer" disabled={disabledP} onClick={onClickP}>
			<label htmlFor="OutlinedButtonContainer" className="OutlinedButtonText">
				{buttonTextP}
			</label>
		</button>
	)
}

export default OutlinedButton