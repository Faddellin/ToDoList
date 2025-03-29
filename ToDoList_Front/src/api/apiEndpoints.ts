
const baseApiRoute = "http://localhost:8080/api/v1/";

class ApiEndpoints{

	static getAuthorizeUserUrl(){
		return `${baseApiRoute}users/auth`;
	}
	static getRegisterUserUrl(){
		return `${baseApiRoute}users`;
	}
	static getCreateTaskUrl(){
		return `${baseApiRoute}tasks`;
	}
	static getEditTaskUrl(taskId: string){
		return `${baseApiRoute}tasks/${taskId}`;
	}
	static getChangeTaskStatusUrl(taskId: string){
		return `${baseApiRoute}tasks/${taskId}/status`;
	}
	static getDeleteTaskUrl(taskId: string){
		return `${baseApiRoute}tasks/${taskId}`;
	}
	static getGetTaskUrl(taskId: string){
		return `${baseApiRoute}tasks/${taskId}`;
	}
	static getGetUserTasksUrl(){
		return `${baseApiRoute}tasks`;
	}
}

export default ApiEndpoints