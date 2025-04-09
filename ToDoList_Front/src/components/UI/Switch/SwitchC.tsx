import React from "react"

interface SwitchProps{
	switchTextP: string;
	disabledP: boolean;
	checkedP: boolean;
}
const SwitchC: React.FC<SwitchProps> = 
	({
		switchTextP,
		disabledP,
		checkedP
	}) => {
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);
	const [checked, setChecked] = React.useState<boolean>(checkedP);

	const changeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(!checked);
	};

	return (
		<div className="SwitchContainer">
			<div className={"Switch" + (disabled == true ? " Disabled" : "")}>
				<input id="SwitchCheckbox" className="SwitchCheckbox" type="checkbox" disabled={disabled} checked={checked} onChange={changeSwitch}></input>
				<label className="SwitchBackground" htmlFor="SwitchCheckbox">
					<div className="SwitchCircleBackground">
						<label className="SwitchCircle" htmlFor="SwitchCheckbox"></label>
					</div>
				</label>
			</div>
			<label className="SwitchText">{switchTextP}</label>
		</div>

	)
}

export default SwitchC