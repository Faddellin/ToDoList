import React from "react"

import TextInputC from "../TextInputs/TextInputC"
import TextInputAreaC from "../TextInputs/TextInputAreaC"
import SelectC from "../Selectors/SelectC"
import PrimaryButtonC from "../Buttons/PrimaryButtonC"
import TextInputDateC from "../TextInputs/TextInputDateC"
import { SelectElement } from "../../../models/Select/SelectElement"
import { Task } from "../../../models/Task/Task"
import { DateConvertor } from "../../../utility/DateConvertor"
import { ConstantValues } from "../../../constants/SelectValues"
import { TaskEditModel } from "../../../models/Task/TaskEditModel"

interface TaskEditFormProps{
	taskP: Task;
	onDiscardTaskEditingP: () => void;
	onDeletButtonClickP: (taskId: string) => Promise<boolean>;
	onEditTaskP: (taskId: string, taskEditModel: TaskEditModel) => Promise<boolean>
}

const TaskEditFormC: React.FC<TaskEditFormProps> = 
	({
		taskP,
		onDiscardTaskEditingP,
		onDeletButtonClickP,
		onEditTaskP
	}) => {
	const [title, setTitle] = React.useState<string>(taskP.title);
	const [description, setDescription] = React.useState<string>(taskP.description);
	const [deadline, setDeadline] = React.useState<Date | undefined>(taskP.deadline ? new Date(taskP.deadline) : undefined);
	const [priority, setPriority] = React.useState<string | undefined>(taskP.priority);

	const [status, setStatus] = React.useState<string>(taskP.status);

	const onBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.preventDefault();
		if(event.target === event.currentTarget) {
			onDiscardTaskEditingP();
		}
	}

	const onEditButtonClick = async () =>{
		var result: Boolean = await onEditTaskP(taskP.id, new TaskEditModel(title, DateConvertor.GetDateWithoutTime(deadline), description, priority, status));
		if(result){
			onDiscardTaskEditingP();
		}
	}

	const onDeleteButtonClick = async () =>{
		var result: Boolean = await onDeletButtonClickP(taskP.id);
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
					<TextInputC inputTextP={title} placeHolderP="" labelTextP="Название" disabledP={false} setParentValueFromInputP={setTitle}/>

					<SelectC selectedValueP={ConstantValues.getPriorityTextByValue(priority)} labelTextP="Приоритет" disabledP={false} 
					valuesToSelectP={ConstantValues.getPrioritiesToSelect()} setParentValueFromSelectP={setPriority}/>

					<SelectC selectedValueP={ConstantValues.getStatusTextByValue(status)} labelTextP="Статус" disabledP={false} 
					valuesToSelectP={ConstantValues.getStatusesToSelect()} setParentValueFromSelectP={setStatus}/>

					<TextInputDateC inputDateP={deadline} labelTextP="Дедлайн" disabledP={false} setParentValueFromInputP={setDeadline}/>

					<TextInputAreaC inputTextP={description} placeHolderP="" labelTextP="Описание" disabledP={false} setParentValueFromInput={setDescription}/>
					
					<p className="TaskEditFormTimeHandler">Дата создания: {DateConvertor.GetDateWithTime(new Date(taskP.createTime))}</p>
					<p className="TaskEditFormTimeHandler">Дата последнего обновления: {
					taskP.updateTime ? DateConvertor.GetDateWithTime(new Date(taskP.updateTime)) : "-"
					}</p>
					
					<div className="TaskEditFormButtonContainer">
						<button className="TaskEditFormDeleteButton" onClick={onDeleteButtonClick}></button>
						<PrimaryButtonC disabledP={false} onClickP={onEditButtonClick} buttonTextP="Сохранить"/>
					</div>
				</div>
			</div>
		</div>
		)

}

export default TaskEditFormC
