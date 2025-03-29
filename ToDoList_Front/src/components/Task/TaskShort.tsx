import React from "react"


interface TaskProps{
	task: any,
}

const TaskShort: React.FC<TaskProps> = 
	({
		task,
	}) => {

	return (
		<div className="TaskContainer">
			<div className="TaskElementHandler">
				<label className="weight-600">Название</label>
				<label className="TaskElementText">{task.title}</label>
			</div>
			<div className="TaskElementHandler">
				<label className="weight-600">Статус</label>
				<label className="TaskElementText">{task.status}</label>
			</div>
			<div className="TaskElementHandler">
				<label className="weight-600">Приоритет</label>
				<label className="TaskElementText">{task.priority}</label>
			</div>
			<div className="TaskElementHandler">
				<label className="weight-600">Дедлайн</label>
				<label className="TaskElementText">{task.deadline}</label>
			</div>
		</div>)

}

export default TaskShort
