import React, { createRef, useRef } from "react";
import { useEffect } from "react";
import { SelectElement } from "../../../models/Select/SelectElement";

interface SelectProps{
	selectedValueP?: string;
	labelTextP: string;
	disabledP: boolean;
	valuesToSelectP: Array<SelectElement>;
	setParentValueFromSelectP: (selectedValue: string) => void;
}

const SelectC: React.FC<SelectProps> = 
	({
		selectedValueP,
		labelTextP,
		disabledP,
		valuesToSelectP,
		setParentValueFromSelectP
	}) => {
	const [isOptionsOpened, setIsOptionsOpened] = React.useState<boolean>(false);
	const [selectedValue, setSelectedValue] = React.useState<string>(selectedValueP ? selectedValueP : valuesToSelectP[0].text);
	const [disabled, setDisabled] = React.useState<boolean>(disabledP);
	const box = useRef<HTMLDivElement>(null);

	const changeSelectedValue = (value: SelectElement) => {
		setSelectedValue(value.text);
		setIsOptionsOpened(!isOptionsOpened);
		setParentValueFromSelectP(value.value);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(isOptionsOpened && box && !box.current!!.contains(event.target as Node)){
				setIsOptionsOpened(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOptionsOpened]);

	return(
		<div className={"SelectContainer" + (disabled == true ? " Disabled" : "" )}>
			<div ref={box} className="SelectHandler">
				<label className="SelectLabel">{labelTextP}</label>
				<button className="Select" value={selectedValue} onClick={() => setIsOptionsOpened(!isOptionsOpened)} disabled={disabled}>
					{selectedValue}
				</button>
				<ul className={"SelectOptionsContainer" + (isOptionsOpened ? "" : " Display-None")}>
					{valuesToSelectP.map(obj =>
							<li key={obj.value} value={obj.value} onClick={() => changeSelectedValue(obj)}>{obj.text}</li>
						)}
				</ul>
			</div>
		</div>
	);
}

export default SelectC