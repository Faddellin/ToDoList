import React from "react"

import TextInputC from "../TextInputs/TextInputC"

import PrimaryButtonC from "../Buttons/PrimaryButtonC"
import OutlinedButtonC from "../Buttons/OutlinedButtonC"
import { useAuth } from "../../../hooks/useAuth"


interface AuthorizationFormProps{
	onRegisterClickP : () => void,
	onLoginClickP : () => void
}

const AuthorizationFormC: React.FC<AuthorizationFormProps> = 
	({
		onRegisterClickP
	}) => {

	const [emailValue, setEmailValue] = React.useState<string>("");
	const [passwordValue, setPasswordValue] = React.useState<string>("");
	const {authorize} = useAuth()

	return (
		<div className="AuthorizationFormContainer">
			<h1 className="AuthorizationFormHeader">Вход в аккаунт</h1>
			<div className="AuthorizationForm">
				<TextInputC placeHolderP="" labelTextP="Электронная почта" disabledP={false} setParentValueFromInputP={setEmailValue}/>
				<TextInputC placeHolderP="" labelTextP="Пароль" disabledP={false} setParentValueFromInputP={setPasswordValue}/>
				<div className="AuthorizationFormButtons">
					<PrimaryButtonC disabledP={false} onClickP={() => authorize(emailValue,passwordValue)} buttonTextP="Войти"/>
					<OutlinedButtonC disabledP={false} onClickP={onRegisterClickP} buttonTextP="Регистрация"/>
				</div>
			</div>
		</div>)

}

export default AuthorizationFormC
