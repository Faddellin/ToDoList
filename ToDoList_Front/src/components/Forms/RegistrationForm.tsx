import React from "react"

import TextInput from "../TextInputs/TextInput"
import Switch from "../Switch/Switch"

import AuthPhoto from "../../Icons/Authorization_Photo.svg"
import PrimaryButton from "../Buttons/PrimaryButton"
import OutlinedButton from "../Buttons/OutlinedButton"


interface RegistrationFormProps{
	onLoginClickP : () => void
	onRegisterClickP : () => void,
}

const RegistrationForm: React.FC<RegistrationFormProps> = 
	({
		onLoginClickP,
		onRegisterClickP
	}) => {

	return (
		<div className="RegistrationFormContainer">
			<h1 className="RegistrationFormHeader">Регистрация</h1>
			<div className="RegistrationForm">
				<TextInput placeHolderP="" labelTextP="Электронная почта" disabledP={false}/>
				<TextInput placeHolderP="" labelTextP="Пароль" disabledP={false}/>
				<div className="RegistrationFormButtons">
					<PrimaryButton disabledP={false} onClickP={onRegisterClickP} buttonTextP="Зарегестрироваться"/>
					<OutlinedButton disabledP={false} onClickP={onLoginClickP} buttonTextP="Войти"/>
				</div>
			</div>
		</div>)

}

export default RegistrationForm
