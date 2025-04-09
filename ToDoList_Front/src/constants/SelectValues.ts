import { SelectElement } from "../models/Select/SelectElement";


export class ConstantValues{
	private static arrayOfPrioritiesToSelect = [
		new SelectElement("","Нет"),
		new SelectElement("Low","Низкий"),
		new SelectElement("Medium", "Средний"),
		new SelectElement("High","Высокий"), 
		new SelectElement("Critical","Критический")];

	private static arrayOfStatuses = [
		new SelectElement("Active","В работе"),
		new SelectElement("Completed", "Выполнено"),
		new SelectElement("Late", "Просрочено"),
		new SelectElement("Overdue", "В работе (срок пропущен)")];
	
	private static arrayOfStatusesToSelect = [new SelectElement("Active","В работе"),
		new SelectElement("Completed", "Выполнено")];

	static getPrioritiesToSelect(){
		return this.arrayOfPrioritiesToSelect;
	}

	static getPriorityTextByValue(value: string | undefined){
		var answer: SelectElement | undefined = this.arrayOfPrioritiesToSelect.find(o => o.value == value);

		if (answer == undefined){
			answer = this.arrayOfPrioritiesToSelect[0];
		}

		return answer.text;
	}

	static getStatusesToSelect(){
		return this.arrayOfStatusesToSelect;
	}

	static getStatusTextByValue(value: string){
		var answer: SelectElement | undefined = this.arrayOfStatuses.find(o => o.value == value);

		if (answer == undefined){
			throw new Error("Status is not found");
		}

		return answer.text;
	}

	static checkStatusOnCompleted(value: string){
		var answer: SelectElement | undefined = this.arrayOfStatuses.find(o => o.value == value);
		
		if (answer == undefined){
			throw new Error("Status is not found");
		}

		if(answer.value == "Completed" || answer.value == "Late"){
			return true;
		}else{
			return false;
		}
	}
}
