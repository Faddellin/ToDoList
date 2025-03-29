import React, { useEffect } from "react"

import AuthorizationForm from "../components/Forms/AuthorizationForm"
import RegistrationForm from "../components/Forms/RegistrationForm"

import Vector from "../Icons/Vector.svg"
import RequestHandler from "../RequestHandler"
import useLocalStorage from "../hooks/useLocalStorage"
import Tasks from "../components/Task/Tasks"

interface MainViewProps{
}

const AuthorizationPage: React.FC<MainViewProps> = 
	({

	}) => {
	const [TasksList, setTasksList] = React.useState<Array<any>>(new Array());
	const [jwtToken, setJwtToken] = useLocalStorage('jwtToken',"");
	useEffect(() => {
		const loadTasks = async () =>{
			setTasksList(await RequestHandler.getUserTasks(jwtToken));
		}
		loadTasks();
		return;
	},[]);

	return (
		<div className="MainViewContainer">
			<div className="MainViewTasksContainer">
				<div className="MainViewTasksContainerHandler">
					<Tasks tasksListP={TasksList}/>
				</div>
			</div>
			<input id="WorkingAreaCheckbox" type="checkbox" className="MainViewWorkingAreaChecker"></input>
			<label className="MainViewWorkingArea" htmlFor="WorkingAreaCheckbox">
				<img className="MainViewWorkingAreaCheckerImage" src={Vector}></img>
			</label>
		</div>)

}

export default AuthorizationPage
