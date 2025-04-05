import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiEndpoints from "./api/apiEndpoints";
import { Task, TaskShort } from "./components/UI/Task/Tasks";

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
		return data.status != null ? data : data!!.jwtToken;
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
			return data.status != null ? data : data!!.jwtToken;
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

			return data.status != null ? data : data!!.taskShortModelList;
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

			return data.status != null ? data : data!!.taskShortModelList;
	}

	static async createTask(jwtToken: string, title: string, description: string, deadline: string, priority:string) : Promise<Array<any>>
	{	
		const data = await RequestHandler.sendRequest(
			requestType.post,
			ApiEndpoints.getGetUserTasksUrl(),
			{
				title: title,
				deadline: deadline,
				priority: priority,
				description: description,
			},
			{
				headers:{
					Authorization: `Bearer ${jwtToken}`
				}
			});

			return data.status != null ? data : data!!.taskShortModelList;
	}
}

export default RequestHandler
