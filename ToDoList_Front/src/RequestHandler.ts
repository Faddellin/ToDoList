import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiEndpoints from "./api/apiEndpoints";


const requestType = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete
}

class RequestHandler{
	

	private static async sendRequest(
		method: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse>,
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	  ) {
		var isSuccess = true;
		const answer = await method(url, data, config)
			.catch(error =>{
			isSuccess = false;
			console.log(error);
		});

		return isSuccess == true ? answer!!.data : null;
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
			return data == null ? null : data!!.jwtToken;
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
			return data == null ? null : data!!.jwtToken;
	}


	static async getUserTasks(jwtToken: string) : Promise<Array<any>>
	{
		const data = await RequestHandler.sendRequest(
			requestType.get,
			ApiEndpoints.getGetUserTasksUrl(),
			{
				headers:{
					Authorization: `Bearer ${jwtToken}`
				}
			});
			return data == null ? new Array() : data!!.taskShortModelList;
	}
}

export default RequestHandler
