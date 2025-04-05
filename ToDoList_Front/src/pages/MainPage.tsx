import React, { useEffect,useRef } from "react"

import TaskCreateForm from "../components/UI/Forms/TaskCreateForm"
import TaskEditForm from "../components/UI/Forms/TaskEditForm"

import Vector from "../Icons/Vector.svg"
import RequestHandler from "../RequestHandler"
import useLocalStorage from "../hooks/useLocalStorage"
import Tasks, { Task } from "../components/UI/Task/Tasks"
import { useAuth } from "../hooks/useAuth"
import WorkingArea from "../components/UI/WorkingArea/WorkingArea"
import { AxiosError } from "axios"
import {AlertC} from "../components/UI/Alert/Alert"
import { Alert, AlertType } from "../Providers/AlertProvider"
import { AlertList } from "../components/UI/Alert/AlertList"
import { useAlert } from "../hooks/useAlert"

interface MainViewProps{
}

const MainPage: React.FC<MainViewProps> = 
	({

	}) => {
	const [tasksList, setTasksList] = React.useState<Array<any>>(new Array());
	const [isCreatingTask, setIsCreatingTask] = React.useState<boolean>(false);
	const [isEditingTask, setIsEditingTask] = React.useState<boolean>(false);
	const currentEditingTask = useRef<Task>(null);
	const {jwtToken, setAsUnauthorized} = useAuth();
	const {addAlert} = useAlert();
	var TaskSortType: string = "AscCreationTime";

	const onCreateTask = async (title: string, description: string, deadline: string, priority:string) => {
		if(title.length == 0){
			addAlert(new Alert(AlertType.Error, "Название задачи не может быть пустым"));
			return false;
		}
		if(description.length == 0){
			addAlert(new Alert(AlertType.Error, "Описание задачи не может быть пустым"));
			return false;
		}
		if(deadline.length == 0){
			addAlert(new Alert(AlertType.Error, "Дедлайн задачи не может быть пустым"));
			return false;
		}

		try{
			await RequestHandler.createTask(jwtToken, title, description, deadline, priority);
			loadTasks();
			return true;
		}catch(e : any)
		{
			if (e.status == 401){
				setAsUnauthorized();
			}
			addAlert(new Alert(AlertType.Error, e.message));
			return false;
		}
	}

	const loadTasks = async () =>{
		try{
			const tasks = await RequestHandler.getUserTasks(jwtToken, TaskSortType);
			setTasksList(tasks);
		}catch(e : any){
			console.log(e);
			if (e.status == 401){
				setAsUnauthorized();
			}
			addAlert(new Alert(AlertType.Error, e.message));
		}
	}
	useEffect(() => {
		loadTasks();
	}, [])

	const handleSortTypeChange = (newTaskSortModel: string) => {
		TaskSortType = newTaskSortModel;
		loadTasks();
	}
	const startEditingTask = async (taskId: string) => {
		try{
			currentEditingTask.current = await RequestHandler.getConcreteTasks(jwtToken, taskId);
			console.log(currentEditingTask.current);
			setIsEditingTask(true);
		}catch(e : any){
			console.log(e);
			if (e.status == 401){
				setAsUnauthorized();
			}
			addAlert(new Alert(AlertType.Error, e.message));
		}
	}

	return (
		<div className="MainViewContainer">
			{isCreatingTask ? <TaskCreateForm onDiscardTaskCreation={() => setIsCreatingTask(false)} onCreateTask={onCreateTask}/> : null }
			{isEditingTask ? <TaskEditForm onDiscardTaskEditingP={() => setIsEditingTask(false)} onEditTaskP={onCreateTask} taskP={currentEditingTask.current!}/> : null }
			<div className="MainViewTasksContainer">
				<div className="MainViewTasksContainerHandler">
					<button onClick={() => startEditingTask("0f905d7f-8551-4dd3-a5e5-9bdffcb22872")}>fdfsf</button>
					<Tasks tasksListP={tasksList}/>
				</div>
			</div>
			<WorkingArea onTaskCreateButtonClickP={() => setIsCreatingTask(true)} onSortChange={handleSortTypeChange}/>
		</div>)

}

export default MainPage
