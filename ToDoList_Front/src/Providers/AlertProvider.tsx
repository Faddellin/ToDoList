import React, { createContext, ReactNode, useCallback, useRef } from "react"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export class Alert{
	alertType: AlertType;
	alertText: string;
	id: number;
	constructor(alertType: AlertType, alertText: string){
		this.alertType = alertType;
		this.alertText = alertText;
		this.id = 0;
	}
}
export enum AlertType {
	Information,
	Error,
	Success,
	Warning
}

interface AlertContextType {
	addAlert: (alert: Alert) => void;
	addAlertInQueueToDestroy: (alert: Alert, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
	removeAlertFromArrayManually: (alert: Alert, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
	alerts: Array<Alert>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
	const [alerts, setAlerts] = React.useState<Array<Alert>>([]);
	const alertQueue = useRef<Array<[Alert, React.Dispatch<React.SetStateAction<boolean>>]>>([]);
	const id = useRef(0);
	const repeaterRef = useRef<NodeJS.Timeout>(null);
	
	const periodOfAlertClearing = 3000;

	//При изменении времени анимации, для качественного визуального
	//вида, нужно изменить свойство transition в AlertContainer в Alert.css
	const periodOfAlertClearingAnimation = 300;

	const clearRepeater = () => {
		clearInterval(repeaterRef.current!);
		repeaterRef.current = null;
	}

	const startRepeater = () => {
		repeaterRef.current = setInterval(checkQueue, periodOfAlertClearing);
	}

	const addAlert = (alert: Alert) => {
		alert.id = id.current;
		id.current++;
		setAlerts([...alerts, alert]);
	}

	const addAlertInQueueToDestroy = (alert: Alert, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
		alertQueue.current.push([alert, setIsVisible]);

		if(repeaterRef.current == null){
			startRepeater();
		}

	}

	const checkQueue = () => {

		const [alert, setIsVisible] = alertQueue.current.shift()!;
		
		setIsVisible(false);
		setTimeout(() => removeAlert(alert), periodOfAlertClearingAnimation);
		
		if(alertQueue.current.length == 0){
			clearRepeater();
		}
	};

	const removeAlertFromArrayManually = (alert: Alert, setIsVisible: React.Dispatch<React.SetStateAction<boolean>>) => {

		clearRepeater();

		alertQueue.current = alertQueue.current.filter(item => item[0] != alert);

		setIsVisible(false);
		setTimeout(() => removeAlert(alert), periodOfAlertClearingAnimation);
		
		if(alertQueue.current.length > 0){
			startRepeater();
		}
	}

	const removeAlert = (alert: Alert) => {
		setAlerts(curAlerts => curAlerts.filter(item => item != alert));
	}

	const value = {
		alerts,
		addAlert,
		addAlertInQueueToDestroy,
		removeAlertFromArrayManually
	};

	return (
	  <AlertContext.Provider value={value}>
		{children}
	  </AlertContext.Provider>
	);
};

export default AlertContext