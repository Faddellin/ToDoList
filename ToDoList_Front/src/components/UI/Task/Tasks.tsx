import React from "react"
import TaskShortC from "./TaskShort"

export class Task{
	id: string;
	title: string;
	deadline: string;
	description: string;
	priority: string;
	status: string;
	createTime: string;
	updateTime: string;
	constructor(id: string, title: string, deadline:string, description:string, 
				status: string, priority: string, createTime: string, updateTime: string){
		this.id = id;
		this.title = title;
		this.deadline = deadline;
		this.description = description;
		this.priority = priority;
		this.status = status;
		this.createTime = createTime;
		this.updateTime = updateTime;
	}
}

export class TaskShort{
	id: string;
	title: string;
	deadline: string;
	priority: string;
	status: string;
	createTime: string;
	constructor(id: string, title: string, deadline:string,
				status: string, priority: string, createTime: string){
		this.id = id;
		this.title = title;
		this.deadline = deadline;
		this.priority = priority;
		this.status = status;
		this.createTime = createTime;
	}
}

interface TasksProps{
	tasksListP: Array<any>
}

const Tasks: React.FC<TasksProps> = 
	({
		tasksListP
	}) => {

	return (
		<React.Fragment>
			{tasksListP.map(element => 
				<TaskShortC key={element.id} task={element} />
			)}
		</React.Fragment>)

}

export default Tasks
