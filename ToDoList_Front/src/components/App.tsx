import React from "react"

import useLocalStorage from '../hooks/useLocalStorage'

import AuthorizationPage from "../pages/AuthorizationPage"
import MainView from "../pages/MainPage"


import {Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

interface AppProps{

}
const App: React.FC<AppProps> = 
	({

	}) => {
	const navigator = useNavigate();


	return (
		<Routes>
			<Route element={<ProtectedRoute pathToRedirect="/auth" />}>
				<Route path="/" element={<MainView />}></Route>
				<Route path="*" element={<MainView />} ></Route>
			</Route>
			<Route path="/auth" element={<AuthorizationPage onLoginP={() => navigator("/")}/>}></Route>

		</Routes>

	);
}


export default App
