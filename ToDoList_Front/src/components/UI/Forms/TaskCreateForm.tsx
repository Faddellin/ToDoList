import React from "react"

import TextInput from "../TextInputs/TextInput"
import TextInputArea from "../TextInputs/TextInputArea"
import Select from "../Selectors/Select"
import PrimaryButton from "../Buttons/PrimaryButton"
import TextInputDate from "../TextInputs/TextInputDate"
import { SelectElement } from "../Selectors/Select"

interface TaskCreateFormProps{
	onDiscardTaskCreation: () => void;
	onCreateTask: (title: string, description: string, deadline: string, priority:string) => Promise<boolean>
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = 
	({
		onDiscardTaskCreation,
		onCreateTask
	}) => {

	const [title, setTitle] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");
	const [deadline, setDeadline] = React.useState<string>("");
	const [priority, setPriority] = React.useState<string>("Low");

	const arrayOfValuesToSelect = [new SelectElement("Low","Низкий"),
			new SelectElement("Medium", "Средний"),
			new SelectElement("High","Высокий"), 
			new SelectElement("Critical","Критический")];

	const onBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.preventDefault();
		if(event.target === event.currentTarget) {
			onDiscardTaskCreation();
		}
	}

	const onCreateButtonClick = async () =>{
		var result:Boolean = await onCreateTask(title, description, deadline, priority);
		if(result){
			onDiscardTaskCreation();
		}
	}

	return (
		<div className="TaskCreateContainer">
			<div className="TaskCreateBackground" onClick={(event) => onBackgroundClick(event)}>
			</div>
			<div className="TaskCreateFormContainer">
				<h1 className="TaskCreateFormHeader">Создать задачу</h1>
				<div className="TaskCreateForm">
					<TextInput placeHolderP="" labelTextP="Название" disabledP={false} setParentValueFromInput={setTitle}/>
					<Select labelTextP="Приоритет" disabledP={false} 
					valuesToSelectP={arrayOfValuesToSelect} 
					setParentValueFromSelectP={setPriority}/>
					<TextInputDate labelTextP="Дедлайн" disabledP={false} setParentValueFromInput={setDeadline}/>
					<TextInputArea placeHolderP="" labelTextP="Описание" disabledP={false} setParentValueFromInput={setDescription}/>
					<div className="TaskCreateFormButtonContainer">
						<PrimaryButton disabledP={false} onClickP={() => onCreateButtonClick()} buttonTextP="Создать"/>
					</div>
				</div>
			</div>
		</div>
		)

}

export default TaskCreateForm
