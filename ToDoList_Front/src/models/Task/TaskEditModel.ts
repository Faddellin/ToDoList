
export class TaskEditModel{
	title: string;
	deadline: string | undefined;
	description: string;
	priority: string | undefined;
	status: string;
	constructor(title: string, deadline:string | undefined, description:string, 
				priority: string | undefined, status: string){
		this.title = title;
		this.deadline = deadline;
		this.description = description;
		this.priority = priority;
		this.status = status;
	}
}