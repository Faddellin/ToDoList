import React from "react"

import Vector from "../../../Icons/Vector.svg"

import PrimaryButtonC from "../Buttons/PrimaryButtonC"

import SelectC from "../Selectors/SelectC"
import { SelectElement } from "../../../models/Select/SelectElement"

import { useAuth } from "../../../hooks/useAuth"

interface RegistrationFormProps{
	onTaskCreateButtonClickP: () => void;
	onSortChangeP: (taskSortModel: string) => void;
}

const WorkingAreaC: React.FC<RegistrationFormProps> = 
	({
		onTaskCreateButtonClickP,
		onSortChangeP
	}) => {

	const arrayOfValuesToSelect = [new SelectElement("AscCreationTime","Возрастанию даты создания"),
		new SelectElement("DescCreationTime", "Убыванию даты создания"),
		new SelectElement("AscDeadline","Возрастанию даты дедлайна"), 
		new SelectElement("DescDeadline","Убыванию даты дедлайна")];

	const {setAsUnauthorized} = useAuth();

	return (
		<React.Fragment>
			<input id="WorkingAreaCheckbox" type="checkbox" className="WorkingAreaCheckbox"></input>
			<div className="WorkingArea">
				<label className="WorkingAreaEntrance" htmlFor="WorkingAreaCheckbox">
					<img className="WorkingAreaEntranceImage" src={Vector}></img>
				</label>
				<div className="WorkingAreaUsable">
					<div className="WorkingAreaUsableLogout">
						<PrimaryButtonC buttonTextP="Выход" disabledP={false} onClickP={setAsUnauthorized} isSmallP={true}/>
					</div>
					<div className="WorkingAreaUsableSettings">
						<SelectC labelTextP="Сортировать по" disabledP={false} valuesToSelectP={arrayOfValuesToSelect} setParentValueFromSelectP={onSortChangeP}/>
					</div>
					<div className="WorkingAreaUsableCreateTask">
						<PrimaryButtonC buttonTextP="Создать задачу" disabledP={false} onClickP={onTaskCreateButtonClickP}/>
					</div>
				</div>
			</div>
		</React.Fragment>
			
)

}

export default WorkingAreaC
