import React, { createRef, useRef } from "react";
import { useEffect } from "react";

import AlertInformationErrorIcon from "../../../Icons/Alert/Error/AlertInformation.svg"
import AlertCloseErrorIcon from "../../../Icons/Alert/Error/AlertClose.svg"
import AlertInformationSuccessIcon from "../../../Icons/Alert/Success/AlertInformation.svg"
import AlertCloseSuccessIcon from "../../../Icons/Alert/Success/AlertClose.svg"
import AlertInformationWarningIcon from "../../../Icons/Alert/Warning/AlertInformation.svg"
import AlertCloseWarningIcon from "../../../Icons/Alert/Warning/AlertClose.svg"
import AlertInformationInformationIcon from "../../../Icons/Alert/Information/AlertInformation.svg"
import AlertCloseInformationIcon from "../../../Icons/Alert/Information/AlertClose.svg"

import { Alert, AlertType } from "../../../models/Alert/Alert"
import { useAlert } from "../../../hooks/useAlert";

interface AlertCProps{
	alertP: Alert
}

export const AlertC: React.FC<AlertCProps> = 
	({
		alertP
	}) => {
	const {addAlertInQueueToDestroy, removeAlertFromArrayManually} = useAlert();
	const [isVisible, setIsVisible] = React.useState<boolean>(false);
	
	useEffect(() => {
		setIsVisible(true);
		addAlertInQueueToDestroy(alertP,setIsVisible);
	}, []);
	
	let AlertInformationIcon;
	let AlertCloseIcon;
	let AlertHeaderText;

	switch(alertP.alertType){
		case AlertType.Information:
			AlertInformationIcon = AlertInformationInformationIcon;
			AlertCloseIcon = AlertCloseInformationIcon;
			AlertHeaderText = "Информация";
			break;
		case AlertType.Error:
			AlertInformationIcon = AlertInformationErrorIcon;
			AlertCloseIcon = AlertCloseErrorIcon;
			AlertHeaderText = "Ошибка";
			break;
		case AlertType.Warning:
			AlertInformationIcon = AlertInformationWarningIcon;
			AlertCloseIcon = AlertCloseWarningIcon;
			AlertHeaderText = "Предупреждение";
			break;
		case AlertType.Success:
			AlertInformationIcon = AlertInformationSuccessIcon;
			AlertCloseIcon = AlertCloseSuccessIcon;
			AlertHeaderText = "Успех";
			break;
		default:
			AlertInformationIcon = AlertInformationInformationIcon;
			AlertCloseIcon = AlertCloseInformationIcon;
			AlertHeaderText = "Информация";
	}

	return(
		<div className={"AlertContainer" + (isVisible ? " visible " : " invisible ")}>
			<div className="AlertHandler" >
				<div className={"AlertHeaderHandler " + AlertType[alertP.alertType]}>
					<div className="AlertHeaderInformationHandler">
						<div className="AlertHeaderIconContainer">
							<img className="AlertHeaderInformationIcon" src={AlertInformationIcon}></img>
						</div>
						<label className="AlertHeader">{AlertHeaderText}</label>
					</div>
					<div className="AlertHeaderIconContainer">
						<img className="AlertHeaderCloseIcon" src={AlertCloseIcon} onClick={() => removeAlertFromArrayManually(alertP,setIsVisible)}></img>
					</div>
				</div>
				<div className="AlertMainHandler">
					<label className="AlertMainText">{alertP.alertText}</label>
				</div>
			</div>
		</div>
	);
}