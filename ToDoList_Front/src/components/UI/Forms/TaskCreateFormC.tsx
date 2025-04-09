import React from "react"

import TextInputC from "../TextInputs/TextInputC"
import TextInputAreaC from "../TextInputs/TextInputAreaC"
import SelectC from "../Selectors/SelectC"
import PrimaryButtonC from "../Buttons/PrimaryButtonC"
import TextInputDateC from "../TextInputs/TextInputDateC"
import { SelectElement } from "../../../models/Select/SelectElement"
import { DateConvertor } from "../../../utility/DateConvertor"
import { ConstantValues } from "../../../constants/SelectValues"
import { TaskCreateModel } from "../../../models/Task/TaskCreateModel"

interface TaskCreateFormProps{
	onDiscardTaskCreationP: () => void;
	onCreateTaskP: (taskCreateModel: TaskCreateModel) => Promise<boolean>
}

const TaskCreateFormC: React.FC<TaskCreateFormProps> = 
	({
		onDiscardTaskCreationP,
		onCreateTaskP
	}) => {

	const [title, setTitle] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");
	const [deadline, setDeadline] = React.useState<Date | undefined>(undefined);
	const [priority, setPriority] = React.useState<string | undefined>(undefined);

	const onBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.preventDefault();
		if(event.target === event.currentTarget) {
			onDiscardTaskCreationP();
		}
	}

	const onCreateButtonClick = async () =>{
		var result:Boolean = await onCreateTaskP(new TaskCreateModel(title, DateConvertor.GetDateWithoutTime(deadline), description, priority));
		if(result){
			onDiscardTaskCreationP();
		}
	}

	return (
		<div className="TaskCreateContainer">
			<div className="TaskCreateBackground" onClick={(event) => onBackgroundClick(event)}>
			</div>
			<div className="TaskCreateFormContainer">
				<h1 className="TaskCreateFormHeader">Создать задачу</h1>
				<div className="TaskCreateForm">
					<TextInputC placeHolderP="" labelTextP="Название" disabledP={false} setParentValueFromInputP={setTitle}/>

					<SelectC labelTextP="Приоритет" disabledP={false} 
					valuesToSelectP={ConstantValues.getPrioritiesToSelect()} 
					setParentValueFromSelectP={setPriority}/>

					<TextInputDateC inputDateP={undefined} labelTextP="Дедлайн" disabledP={false} setParentValueFromInputP={setDeadline}/>

					<TextInputAreaC placeHolderP="" labelTextP="Описание" disabledP={false} setParentValueFromInput={setDescription}/>
					
					<div className="TaskCreateFormButtonContainer">
						<PrimaryButtonC disabledP={false} onClickP={() => onCreateButtonClick()} buttonTextP="Создать"/>
					</div>
				</div>
			</div>
		</div>
		)

}

export default TaskCreateFormC
