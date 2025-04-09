import React from "react"

import useLocalStorage from '../hooks/useLocalStorage'

import AuthorizationPage from "../pages/AuthorizationPage"
import MainView from "../pages/MainPage"

import { AlertListC } from "./UI/Alert/AlertListC"

import {Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

import { AuthProvider } from "../Providers/AuthProvider";
import { AlertProvider } from "../Providers/AlertProvider";
import { useAlert } from "../hooks/useAlert";


interface AppProps{

}
const App: React.FC<AppProps> = 
	({

	}) => {
	const navigator = useNavigate();


	return (
		<AlertProvider>
			<AuthProvider>
				<AlertListC/>
				<Routes>
					<Route element={<ProtectedRoute pathToRedirect="/auth" />}>
						<Route path="/" element={<MainView />}></Route>
						<Route path="*" element={<MainView />} ></Route>
					</Route>
					<Route path="/auth" element={<AuthorizationPage onLoginP={() => navigator("/")}/>}></Route>
				</Routes>
			</AuthProvider>
		</AlertProvider>
	);
}


export default App
