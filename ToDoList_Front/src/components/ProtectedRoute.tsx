import React from 'react';
import useLocalStorage from "../hooks/useLocalStorage";
import { Navigate } from "react-router";
import { Outlet } from 'react-router';

type ProtectedRouteProps = {
	pathToRedirect: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = 
	({
		pathToRedirect
	}) => {
	const [jwtToken, setJwtToken] = useLocalStorage("jwtToken","");

	if (jwtToken == "") {
		return <Navigate to={pathToRedirect} replace />;
	}
	
	return <Outlet />;
}

export default ProtectedRoute;