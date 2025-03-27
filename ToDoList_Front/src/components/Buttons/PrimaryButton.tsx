import React from "react"

interface PrimaryButtonProps{
	buttonTextP: string;
	onClickP: () => void;
	disabledP: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = 
	({
		buttonTextP,
		onClickP,
		disabledP
	}) => {
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);

	return (
		<button id="PrimaryButtonContainer" className="PrimaryButtonContainer" disabled={disabledP} onClick={onClickP}>
			<label htmlFor="PrimaryButtonContainer" className="PrimaryButtonText">
				{buttonTextP}
			</label>
		</button>
	)
}

export default PrimaryButton