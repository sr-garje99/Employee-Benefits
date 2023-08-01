import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Card } from 'react-bootstrap';
import { Button,Card } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { EmpContext, SetEmp } from '../utility/helper';
import { doLogin } from '../auth';

const Login = () => {
	let navigate = useNavigate();
	const [ validated, setValidated ] = useState(false);
	const [ data, setData ] = useState({ employeeEmail: '', employeePassword: '' });
	const [ emp, setEmp ] = useContext(EmpContext);

	useEffect(
		() => {
			console.log(data);
		},
		[ data ]
	);

	const handleChange = (event, field) => {
		setData({ ...data, [field]: event.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;

		if (
			data.employeePassword.trim() === '' ||
			data.employeeEmail.trim() === ''
		) {
			toast.error('Email and Password  are required!');
			return;
		}
		if (data.employeePassword.length < 8) {
			setData({ ...data, error: 'Password must be at least 8 characters!' });
			return;
		}
		console.log("onSubmit");
		const response = await SetEmp(data);
		console.log(response);
		if (response.status > 200) {
			toast.error('Email or Password is invalid!');
			return;
		}
		else{

			setEmp(response.user);
			doLogin(response, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
        //   userContxtData.setUser({
        //     data: data.user,
        //     login: true,
        //   });
        //   navigate("/user/dashboard");
        });
			if (response?.user.admin) {
			toast.success('login successful!');
			navigate(`/admin/${response.user.employeeId}`);
			} else {
			toast.success('User login successful!');
			navigate(`/user/employeeDashboard/${response.user.employeeId}`);
			}
		}
		//if(response.employeeId )
		
	};

	return (
		<div>
			<Card style={{ width: '25rem', align: 'centre', padding: '3%', margin: '1%', color:(253, 127, 57) }}>
				<div>
					<div className="form-group">
						<h6>Email:</h6>
						<input
							type="email"
							className="form-control form-control-lg"
							placeholder="Enter email address"
							id="employeeEmail"
							value={data.employeeEmail}
							onChange={(e) => handleChange(e, 'employeeEmail')}
							required // Add the required attribute for form validation
						/>
					</div>
					<br />
					<br />
					<div className="form-group">
						<h6>Password:</h6>
						<input
							type="password"
							className="form-control form-control-lg"
							placeholder="Enter Password"
							id="employeePassword"
							value={data.employeePassword}
							onChange={(e) => handleChange(e, 'employeePassword')}
							required // Add the required attribute for form validation
						/>
						{data.error && <p className="text-danger">{data.error}</p>}
					</div>
					<br />
					<Button variant="contained"  onClick={handleSubmit}>
						Log in
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Login;
