import React, { useEffect } from "react"

import { DateConvertor } from "../../../utility/DateConvertor"
import { TaskShort } from "../../../models/Task/TaskShort"
import { ConstantValues } from "../../../constants/SelectValues"

interface TaskShortProps{
	taskP: TaskShort,
	onTaskClickP: (taskId: string) => void
}

const TaskShortC: React.FC<TaskShortProps> = 
	({
		taskP,
		onTaskClickP
	}) => {

	var taskBorderColor: string = "";

	
	
	if (taskP.deadline != null){

		var dateOfDeadline = new Date(taskP.deadline).getTime();
		var dateOfToday = new Date(DateConvertor.GetDateWithoutTimeISOFormat(new Date(Date.now()))!).getTime();
		
		if (!ConstantValues.checkStatusOnCompleted(taskP.status)){
			if(dateOfDeadline - dateOfToday < 0){
				
				taskBorderColor = "Red";
			}else if(dateOfDeadline - dateOfToday <= 259200000){
				taskBorderColor = "Orange";
			}
		}
	}
	

	return (
		<div className={"TaskContainer " + taskBorderColor} onClick={() => onTaskClickP(taskP.id)}>
			<div className="TaskElementHandler">
				<label className="weight-600">Название</label>
				<label className="TaskElementText">{taskP.title}</label>
			</div>
			<div className="TaskElementHandler">
				<label className="weight-600">Статус</label>
				<label className="TaskElementText">{ConstantValues.getStatusTextByValue(taskP.status)}</label>
			</div>
			<div className="TaskElementHandler">
				<label className="weight-600">Приоритет</label>
				<label className="TaskElementText">{ConstantValues.getPriorityTextByValue(taskP.priority)}</label>
			</div>
			<div className="TaskElementHandler">
				<label className="weight-600">Дедлайн</label>
				<label className="TaskElementText">{taskP.deadline ? DateConvertor.GetDateWithoutTime(new Date(taskP.deadline)) : "Нет"}</label>
			</div>
		</div>)

}

export default TaskShortC
