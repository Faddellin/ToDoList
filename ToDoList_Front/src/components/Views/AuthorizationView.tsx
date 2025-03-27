import React from "react"

import AuthorizationForm from "../Forms/AuthorizationForm"
import RegistrationForm from "../Forms/RegistrationForm"


interface AuthorizationViewProps{
	onLoginP : () => void
}

const AuthorizationView: React.FC<AuthorizationViewProps> = 
	({
		onLoginP
	}) => {
	const [authorizing, setAuthorizing] = React.useState<boolean>(true);

	const changeAuthorizing = () =>{
		console.log("check");
		setAuthorizing(!authorizing);
	}

	return (
		<div className="AuthorizationViewContainer">
			<div className="AuthorizationViewContentHandler">
				{authorizing == true ? 
				<AuthorizationForm onLoginClickP={onLoginP} onRegisterClickP={changeAuthorizing}/> : 
				<RegistrationForm onLoginClickP={changeAuthorizing} onRegisterClickP={() => console.log("logined")}/>
				}
			</div>
		</div>)

}

export default AuthorizationView
