import React from "react"

import TextInput from "../TextInputs/TextInput"
import Switch from "../Switch/Switch"

import AuthPhoto from "../../Icons/Authorization_Photo.svg"
import PrimaryButton from "../Buttons/PrimaryButton"
import OutlinedButton from "../Buttons/OutlinedButton"

import RequestHandler from "../../RequestHandler"

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


	const handleRegistration = async () =>{
		let JwtToken = await RequestHandler.registerUser(emailValue,passwordValue);

		if (JwtToken != null){
			localStorage.setItem("jwtToken", JSON.stringify(JwtToken));
			onRegisterClickP();
		}

	}

	return (
		<div className="RegistrationFormContainer">
			<h1 className="RegistrationFormHeader">Регистрация</h1>
			<div className="RegistrationForm">
				<TextInput placeHolderP="" labelTextP="Электронная почта" disabledP={false} setParentValueFromInput={setEmailValue}/>
				<TextInput placeHolderP="" labelTextP="Пароль" disabledP={false} setParentValueFromInput={setPasswordValue}/>
				<div className="RegistrationFormButtons">
					<PrimaryButton disabledP={false} onClickP={handleRegistration} buttonTextP="Зарегестрироваться"/>
					<OutlinedButton disabledP={false} onClickP={onLoginClickP} buttonTextP="Войти"/>
				</div>
			</div>
		</div>)

}

export default RegistrationForm
