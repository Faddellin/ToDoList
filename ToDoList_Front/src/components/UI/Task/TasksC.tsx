import React from "react"
import TaskShortC from "./TaskShortC"
import { TaskShort } from "../../../models/Task/TaskShort";

interface TasksProps{
	tasksListP: Array<TaskShort>;
	onTaskClickP: (taskId: string) => void;
}

const Tasks: React.FC<TasksProps> = 
	({
		tasksListP,
		onTaskClickP
	}) => {

	return (
		<React.Fragment>
			{tasksListP.map(element => 
				<TaskShortC key={element.id} taskP={element} onTaskClickP={onTaskClickP}/>
			)}
		</React.Fragment>)

}

export default Tasks
