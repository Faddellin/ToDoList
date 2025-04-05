import React from "react"

import TextInput from "../TextInputs/TextInput"
import Switch from "../Switch/Switch"

import AuthPhoto from "../../Icons/Authorization_Photo.svg"
import PrimaryButton from "../Buttons/PrimaryButton"
import OutlinedButton from "../Buttons/OutlinedButton"

import RequestHandler from "../../../RequestHandler"
import { useAuth } from "../../../hooks/useAuth"

interface RegistrationFormProps{
	onLoginClickP : () => void
	onRegisterClickP : () => void,
}

const RegistrationForm: React.FC<RegistrationFormProps> = 
	({
		onLoginClickP,
		onRegisterClickP
	}) => {

	const [emailValue, setEmailValue] = React.useState<string>("");
	const [passwordValue, setPasswordValue] = React.useState<string>("");
	const {authorize} = useAuth();

	return (
		<div className="RegistrationFormContainer">
			<h1 className="RegistrationFormHeader">Регистрация</h1>
			<div className="RegistrationForm">
				<TextInput placeHolderP="" labelTextP="Электронная почта" disabledP={false} setParentValueFromInput={setEmailValue}/>
				<TextInput placeHolderP="" labelTextP="Пароль" disabledP={false} setParentValueFromInput={setPasswordValue}/>
				<div className="RegistrationFormButtons">
					<PrimaryButton disabledP={false} onClickP={() => authorize(emailValue,passwordValue)} buttonTextP="Зарегестрироваться"/>
					<OutlinedButton disabledP={false} onClickP={onLoginClickP} buttonTextP="Войти"/>
				</div>
			</div>
		</div>)

}

export default RegistrationForm
