import React from "react"

import TextInput from "../TextInputs/TextInput"
import Switch from "../Switch/Switch"

import AuthPhoto from "../../Icons/Authorization_Photo.svg"
import PrimaryButton from "../Buttons/PrimaryButton"
import OutlinedButton from "../Buttons/OutlinedButton"
import RequestHandler from "../../RequestHandler"
import useLocalStorage from "../../hooks/useLocalStorage"


interface AuthorizationFormProps{
	onRegisterClickP : () => void,
	onLoginClickP : () => void
}

const AuthorizationForm: React.FC<AuthorizationFormProps> = 
	({
		onRegisterClickP,
		onLoginClickP
	}) => {

	const [emailValue, setEmailValue] = React.useState<string>("");
	const [passwordValue, setPasswordValue] = React.useState<string>("");

	const handleAuthorization = async () =>{
		let JwtToken = await RequestHandler.authorizeUser(emailValue,passwordValue);

		if (JwtToken != null){
			localStorage.setItem("jwtToken", JSON.stringify(JwtToken));
			onLoginClickP();
		}
	}

	return (
		<div className="AuthorizationFormContainer">
			<h1 className="AuthorizationFormHeader">Вход в аккаунт</h1>
			<div className="AuthorizationForm">
				<TextInput placeHolderP="" labelTextP="Электронная почта" disabledP={false} setParentValueFromInput={setEmailValue}/>
				<TextInput placeHolderP="" labelTextP="Пароль" disabledP={false} setParentValueFromInput={setPasswordValue}/>
				<div className="AuthorizationFormButtons">
					<PrimaryButton disabledP={false} onClickP={handleAuthorization} buttonTextP="Войти"/>
					<OutlinedButton disabledP={false} onClickP={onRegisterClickP} buttonTextP="Регистрация"/>
				</div>
			</div>
		</div>)

}

export default AuthorizationForm
