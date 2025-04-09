import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiEndpoints from "./api/apiEndpoints";
import { Task } from "./models/Task/Task";
import { TaskShort } from "./models/Task/TaskShort";
import { TaskCreateModel } from "./models/Task/TaskCreateModel";
import { TaskEditModel } from "./models/Task/TaskEditModel";

const requestType = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete
}

type ErrorModel = {
	message: string,
	status: number
}

class RequestHandler{
	

	private static async sendRequest(
		method: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse>,
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	  ) {
		const answer = await method(url, data, config)
			.catch(error =>{
			return Promise.reject(error.response.data);
		});

		return answer!!.data;
	}


	static async authorizeUser(
		email: string,
		password: string)
	{
		const data = await RequestHandler.sendRequest(
			requestType.post,
			ApiEndpoints.getAuthorizeUserUrl(),
			{
				email: email,
				password: password
			});
		return data.jwtToken;
	}


	static async registerUser(
		email: string,
		password: string)
	{
		const data = await RequestHandler.sendRequest(
			requestType.post,
			ApiEndpoints.getRegisterUserUrl(),
			{
				email: email,
				password: password
			});
			return data.jwtToken;
	}


	static async getUserTasks(jwtToken: string, taskSortModel: string) : Promise<Array<TaskShort>>
	{	
		const data = await RequestHandler.sendRequest(
			requestType.get,
			ApiEndpoints.getGetUserTasksUrl(taskSortModel),
			{
				headers:{
					Authorization: `Bearer ${jwtToken}`
				}
			});

			return data.taskShortModelList;
	}

	static async getConcreteTasks(jwtToken: string, taskId: string) : Promise<Task>
	{	
		const data = await RequestHandler.sendRequest(
			requestType.get,
			ApiEndpoints.getGetTaskUrl(taskId),
			{
				headers:{
					Authorization: `Bearer ${jwtToken}`
				}
			});

			return data;
	}

	static async createTask(jwtToken: string, taskCreateModel: TaskCreateModel) : Promise<Array<any>>
	{	
		const data = await RequestHandler.sendRequest(
			requestType.post,
			ApiEndpoints.getGetUserTasksUrl(),
			{
				title: taskCreateModel.title,
				deadline: taskCreateModel.deadline,
				priority: taskCreateModel.priority,
				description: taskCreateModel.description,
			},
			{
				headers:{
					Authorization: `Bearer ${jwtToken}`
				}
			});

			return data;
	}

	static async editTask(jwtToken: string, taskId:string, taskEditModel:TaskEditModel) : Promise<any>
	{	
		const data = await RequestHandler.sendRequest(
			requestType.put,
			ApiEndpoints.getEditTaskUrl(taskId),
			{
				title: taskEditModel.title,
				deadline: taskEditModel.deadline,
				priority: taskEditModel.priority,
				description: taskEditModel.description,
				status: taskEditModel.status
			},
			{
				headers:{
					Authorization: `Bearer ${jwtToken}`
				}
			});

			return data;
	}

	static async deleteTask(jwtToken: string, taskId: string) : Promise<boolean>
	{	
		const data = await RequestHandler.sendRequest(
			requestType.delete,
			ApiEndpoints.getDeleteTaskUrl(taskId),
			{
				headers:{
					Authorization: `Bearer ${jwtToken}`
				}
			});

			return data;
	}
}

export default RequestHandler
