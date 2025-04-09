
export class TaskCreateModel{
	title: string;
	deadline: string | undefined;
	description: string;
	priority: string | undefined;
	constructor(title: string, deadline:string | undefined, description:string, 
				priority: string | undefined){
		this.title = title;
		this.deadline = deadline;
		this.description = description;
		this.priority = priority;
	}
}