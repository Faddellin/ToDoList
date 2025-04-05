import React, { createRef, useRef } from "react";
import { useEffect } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { AlertC } from "./Alert";

interface AlertListProps{

}

export const AlertList: React.FC<AlertListProps> = 
	({

	}) => {

	const { alerts } = useAlert();

	return(
		<div className="AlertListContainer">
			{alerts.map(alert => 
				<AlertC key={alert.id} alertP={alert}></AlertC>
			)}
		</div>
	);
}