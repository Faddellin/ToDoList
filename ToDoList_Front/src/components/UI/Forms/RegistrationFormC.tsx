import React from "react"

import TextInputC from "../TextInputs/TextInputC"

import { Alert, AlertType } from "../../../models/Alert/Alert"

import PrimaryButtonC from "../Buttons/PrimaryButtonC"
import OutlinedButtonC from "../Buttons/OutlinedButtonC"

import RequestHandler from "../../../RequestHandler"
import { useAuth } from "../../../hooks/useAuth"
import { useAlert } from "../../../hooks/useAlert"

interface RegistrationFormProps{
	onLoginClickP : () => void
	onRegisterClickP : () => void,
}

const RegistrationFormC: React.FC<RegistrationFormProps> = 
	({
		onLoginClickP
	}) => {

	const [emailValue, setEmailValue] = React.useState<string>("");
	const [passwordValue, setPasswordValue] = React.useState<string>("");
	const { registrate, setAsUnauthorized } = useAuth();
	const {addAlert} = useAlert();

	return (
		<div className="RegistrationFormContainer">
			<h1 className="RegistrationFormHeader">Регистрация</h1>
			<div className="RegistrationForm">
				<TextInputC placeHolderP="" labelTextP="Электронная почта" disabledP={false} setParentValueFromInputP={setEmailValue}/>
				<TextInputC placeHolderP="" labelTextP="Пароль" disabledP={false} setParentValueFromInputP={setPasswordValue}/>
				<div className="RegistrationFormButtons">
					<PrimaryButtonC disabledP={false} onClickP={() => registrate(emailValue, passwordValue)} buttonTextP="Зарегестрироваться"/>
					<OutlinedButtonC disabledP={false} onClickP={onLoginClickP} buttonTextP="Войти"/>
				</div>
			</div>
		</div>)

}

export default RegistrationFormC
