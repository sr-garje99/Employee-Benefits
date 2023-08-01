import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Plans from './pages/Plans';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Enroll from './pages/Enroll';
import Admin from './pages/Admin';
import PlanTable from './components/PlanTable';
import EmployeeDashBoard from './pages/EmployeeDashboard';
import AddDependents from './components/AddDependents';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { EmpContext } from './utility/helper';
import SelectPlan from './pages/SelectPlan';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PrivateRoute from './components/PrivateRoute';
const theme = createTheme({
	palette: {
		primary: { main: '#FD7F39', contrastText: '#fff' },
		secondary: { main: '#FFFFFFF' }
	}
});

function App() {
	const [ emp, setEmp ] = useState();
	// console.log(emp, 'djfas;lf');
	return (
		<EmpContext.Provider value={[ emp, setEmp ]}>
			<BrowserRouter>
				<ToastContainer className="toast-position" position="top-center" />
				<ThemeProvider theme={theme}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/admin/:id" element={<Admin />} />
						<Route path="/plan" element={<PlanTable />} />

						<Route path="/user" element={<PrivateRoute />}>
							<Route path="employeeDashboard/:id" element={<EmployeeDashBoard />} />
							<Route path="enroll/:id" element={<Enroll />} />
							<Route path="plans/:id" element={<SelectPlan />} />
							<Route path="addDependents/:id" element={<AddDependents />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</EmpContext.Provider>
	);
}

export default App;
