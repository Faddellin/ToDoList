export class Alert{
	alertType: AlertType;
	alertText: string;
	id: number;
	constructor(alertType: AlertType, alertText: string, id: number = 0){
		this.alertType = alertType;
		this.alertText = alertText;
		this.id = id;
	}
}
export enum AlertType {
	Information,
	Error,
	Success,
	Warning
}