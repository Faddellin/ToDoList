import React from "react"

import TextInput from "../TextInputs/TextInput"
import Switch from "../Switch/Switch"

import AuthPhoto from "../../Icons/Authorization_Photo.svg"
import PrimaryButton from "../Buttons/PrimaryButton"
import OutlinedButton from "../Buttons/OutlinedButton"


interface AuthorizationFormProps{
	onRegisterClickP : () => void,
	onLoginClickP : () => void
}

const AuthorizationForm: React.FC<AuthorizationFormProps> = 
	({
		onRegisterClickP,
		onLoginClickP
	}) => {

	return (
		<div className="AuthorizationFormContainer">
			<h1 className="AuthorizationFormHeader">Вход в аккаунт</h1>
			<div className="AuthorizationForm">
				<TextInput placeHolderP="" labelTextP="Электронная почта" disabledP={false}/>
				<TextInput placeHolderP="" labelTextP="Пароль" disabledP={false}/>
				<div className="AuthorizationFormButtons">
					<PrimaryButton disabledP={false} onClickP={onLoginClickP} buttonTextP="Войти"/>
					<OutlinedButton disabledP={false} onClickP={onRegisterClickP} buttonTextP="Регистрация"/>
				</div>
			</div>
		</div>)

}

export default AuthorizationForm
