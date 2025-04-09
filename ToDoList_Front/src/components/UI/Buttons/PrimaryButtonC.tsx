import React from "react"

interface PrimaryButtonProps{
	buttonTextP: string;
	onClickP: () => void;
	disabledP: boolean;
	isSmallP?: boolean;
}

const PrimaryButtonC: React.FC<PrimaryButtonProps> = 
	({
		buttonTextP,
		onClickP,
		disabledP,
		isSmallP
	}) => {
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);

	return (
		<button className={"PrimaryButtonContainer" + (isSmallP ? " small": "")} disabled={disabled} onClick={onClickP}>
			<label className={"PrimaryButtonText" + (isSmallP ? " small": "")}>
				{buttonTextP}
			</label>
		</button>
	)
}

export default PrimaryButtonC