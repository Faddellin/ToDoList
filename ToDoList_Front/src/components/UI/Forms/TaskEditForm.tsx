import React from "react"

import TextInput from "../TextInputs/TextInput"
import TextInputArea from "../TextInputs/TextInputArea"
import Select from "../Selectors/Select"
import PrimaryButton from "../Buttons/PrimaryButton"
import TextInputDate from "../TextInputs/TextInputDate"
import { SelectElement } from "../Selectors/Select"
import { Task } from "../Task/Tasks"
import { DateConvertor } from "../../../utility/DateConvertor"

interface TaskEditFormProps{
	taskP: Task;
	onDiscardTaskEditingP: () => void;
	onEditTaskP: (title: string, description: string, deadline: string, priority:string) => Promise<boolean>
}

const TaskEditForm: React.FC<TaskEditFormProps> = 
	({
		taskP,
		onDiscardTaskEditingP,
		onEditTaskP
	}) => {
	const [title, setTitle] = React.useState<string>(taskP.title);
	const [description, setDescription] = React.useState<string>(taskP.description);
	const [deadline, setDeadline] = React.useState<string>(taskP.deadline);
	const [priority, setPriority] = React.useState<string>(taskP.priority);
	var priorityText: string;
	const [status, setStatus] = React.useState<string>(taskP.status);
	var statusText: string;
	

	const arrayOfProiritiesToSelect = [new SelectElement("Low","Низкий"),
			new SelectElement("Medium", "Средний"),
			new SelectElement("High","Высокий"), 
			new SelectElement("Critical","Критический")];

	arrayOfProiritiesToSelect.forEach(element => {
		if(element.value == priority){
			priorityText = element.text;
		}
	});

	const arrayOfStatuses = [new SelectElement("Active","В работе"),
				new SelectElement("Completed", "Выполнено"),
				new SelectElement("Late", "Просрочено"),
				new SelectElement("Overdue", "В работе (срок пропущен)")];
	
	const arrayOfStatusesToSelect = [new SelectElement("Active","В работе"),
		new SelectElement("Completed", "Выполнено")];

	arrayOfStatuses.forEach(element => {
		if(element.value == status){
			statusText = element.text;
		}
	});

	const onBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.preventDefault();
		if(event.target === event.currentTarget) {
			onDiscardTaskEditingP();
		}
	}

	const onEditButtonClick = async () =>{
		var result:Boolean = await onEditTaskP(title, description, deadline, priority);
		if(result){
			onDiscardTaskEditingP();
		}
	}

	return (
		<div className="TaskEditContainer">
			<div className="TaskEditBackground" onClick={(event) => onBackgroundClick(event)}>
			</div>
			<div className="TaskEditFormContainer">
				<h1 className="TaskEditFormHeader">Просмотр/<br/>Редактирование задачи</h1>
				<div className="TaskEditForm">
					<TextInput inputTextP={title} placeHolderP="" labelTextP="Название" disabledP={false} setParentValueFromInput={setTitle}/>

					<Select selectedValueP={priorityText!} labelTextP="Приоритет" disabledP={false} 
					valuesToSelectP={arrayOfProiritiesToSelect} setParentValueFromSelectP={setPriority}/>

					<Select selectedValueP={statusText!} labelTextP="Статус" disabledP={false} 
					valuesToSelectP={arrayOfStatusesToSelect} setParentValueFromSelectP={setStatus}/>

					<TextInputDate labelTextP="Дедлайн" disabledP={false} setParentValueFromInput={setDeadline}/>

					<TextInputArea inputTextP={description} placeHolderP="" labelTextP="Описание" disabledP={false} setParentValueFromInput={setDescription}/>
					
					<p>Дата создания: {DateConvertor.GetDateWithTime(new Date(taskP.createTime))}</p>
					<p>Дата последнего обновления: {DateConvertor.GetDateWithTime(new Date(taskP.updateTime))}</p>
					
					<div className="TaskEditFormButtonContainer">
						<PrimaryButton disabledP={false} onClickP={() => onEditButtonClick()} buttonTextP="Сохранить"/>
					</div>
				</div>
			</div>
		</div>
		)

}

export default TaskEditForm
