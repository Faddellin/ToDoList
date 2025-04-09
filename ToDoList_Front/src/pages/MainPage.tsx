import React, { useEffect,useRef } from "react"

import TaskCreateFormC from "../components/UI/Forms/TaskCreateFormC"
import TaskEditFormC from "../components/UI/Forms/TaskEditFormC"

import RequestHandler from "../RequestHandler"
import useLocalStorage from "../hooks/useLocalStorage"
import { Task } from "../models/Task/Task"
import TasksC from "../components/UI/Task/TasksC"
import { useAuth } from "../hooks/useAuth"
import WorkingAreaC from "../components/UI/WorkingArea/WorkingAreaC"

import { Alert, AlertType } from "../models/Alert/Alert"
import { AlertListC } from "../components/UI/Alert/AlertListC"
import { useAlert } from "../hooks/useAlert"

import { TaskCreateModel } from "../models/Task/TaskCreateModel"
import { TaskEditModel } from "../models/Task/TaskEditModel"

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

	const onCreateTask = async (taskCreateModel: TaskCreateModel) => {
		if(taskCreateModel.title.length == 0){
			addAlert(new Alert(AlertType.Error, "Название задачи не может быть пустым"));
			return false;
		}
		if(taskCreateModel.description.length == 0){
			addAlert(new Alert(AlertType.Error, "Описание задачи не может быть пустым"));
			return false;
		}
		if(taskCreateModel.priority == ""){
			taskCreateModel.priority = undefined;
		}
		try{

			await RequestHandler.createTask(jwtToken, taskCreateModel);
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

	const onEditTask = async (taskId: string, taskEditModel: TaskEditModel) => {
		if(taskEditModel.title.length == 0){
			addAlert(new Alert(AlertType.Error, "Название задачи не может быть пустым"));
			return false;
		}
		if(taskEditModel.description.length == 0){
			addAlert(new Alert(AlertType.Error, "Описание задачи не может быть пустым"));
			return false;
		}
		if(taskEditModel.priority == ""){
			taskEditModel.priority = undefined;
		}

		try{
			await RequestHandler.editTask(jwtToken, taskId, taskEditModel);
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

	const onDeleteTask = async (taskId: string) => {
		try{
			await RequestHandler.deleteTask(jwtToken, taskId);
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
			setIsEditingTask(true);
		}catch(e : any){
			if (e.status == 401){
				setAsUnauthorized();
			}
			addAlert(new Alert(AlertType.Error, e.message));
		}
	}

	return (
		<div className="MainViewContainer">
			{isCreatingTask ? <TaskCreateFormC onDiscardTaskCreationP={() => setIsCreatingTask(false)} onCreateTaskP={onCreateTask}/> : null }
			{isEditingTask ? <TaskEditFormC onDiscardTaskEditingP={() => setIsEditingTask(false)} onEditTaskP={onEditTask}
			 taskP={currentEditingTask.current!} onDeletButtonClickP={onDeleteTask}/> : null }
			<div className="MainViewTasksContainer">
				<div className="MainViewTasksContainerHandler">
					<TasksC tasksListP={tasksList} onTaskClickP={startEditingTask} />
				</div>
			</div>
			<WorkingAreaC onTaskCreateButtonClickP={() => setIsCreatingTask(true)} onSortChangeP={handleSortTypeChange}/>
		</div>)

}

export default MainPage
