
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