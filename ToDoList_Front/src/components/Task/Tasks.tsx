import React from "react"
import TaskShort from "./TaskShort"

interface TaskProps{
	tasksListP: Array<any>
}

const Tasks: React.FC<TaskProps> = 
	({
		tasksListP
	}) => {

	return (
		<div className="TaskContainer">
			{tasksListP.map(element => 
				<TaskShort task={element} />
			)}
		</div>)

}

export default Tasks
