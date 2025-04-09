
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