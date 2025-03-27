import React from "react"

import useLocalStorage from '../hooks/useLocalStorage'
import AuthorizationView from "./Views/AuthorizationView"
import MainView from "./Views/MainView"
import View from "../enums/View"
import axios from "axios"

interface AppProps{

}
const App: React.FC<AppProps> = 
	({

	}) => {
	const [language, setLanguage] = useLocalStorage('language', 'ru')
	const [currentView, setView] = React.useState<View>(View.AuthorizationView);

	var currentViewComponent;
	switch (currentView){
		case View.AuthorizationView:
			currentViewComponent = <AuthorizationView onLoginP={() => setView(View.MainView)}/>;
			break;
		case View.MainView:
			currentViewComponent = <MainView />;
			break;
	}

	return (
		currentViewComponent

	);
}


export default App
