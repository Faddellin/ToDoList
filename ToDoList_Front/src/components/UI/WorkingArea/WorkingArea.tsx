import React from "react"

import Vector from "../../../Icons/Vector.svg"

import PrimaryButton from "../Buttons/PrimaryButton"

import Select, { SelectElement } from "../Selectors/Select"
import { useAuth } from "../../../hooks/useAuth"

interface RegistrationFormProps{
	onTaskCreateButtonClickP: () => void;
	onSortChange: (taskSortModel: string) => void;
}

const WorkingArea: React.FC<RegistrationFormProps> = 
	({
		onTaskCreateButtonClickP,
		onSortChange
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
						<PrimaryButton buttonTextP="Выход" disabledP={false} onClickP={setAsUnauthorized} isSmallP={true}/>
					</div>
					<div className="WorkingAreaUsableSettings">
						<Select labelTextP="Сортировать по" disabledP={false} valuesToSelectP={arrayOfValuesToSelect} setParentValueFromSelectP={onSortChange}/>
					</div>
					<div className="WorkingAreaUsableCreateTask">
						<PrimaryButton buttonTextP="Создать задачу" disabledP={false} onClickP={onTaskCreateButtonClickP}/>
					</div>
				</div>
			</div>
		</React.Fragment>
			
)

}

export default WorkingArea
