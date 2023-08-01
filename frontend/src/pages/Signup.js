import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Card } from 'react-bootstrap';
import { Card, Button } from '@mui/material';
import { toast } from 'react-toastify';
//import axios from 'axios';
import { signUp } from '../services/employee-service';
const Signup = () => {
	let navigate = useNavigate();
	const [ data, setData ] = useState({
		employeeName: '',
		employeeEmail: '',
		employeePassword: ''
	});

	const handleChange = (event, field) => {
		setData({ ...data, [field]: event.target.value });
	};
	const handleSubmit = async (e) => {
		var re = /\S+@\S+\.\S+/;
		if (!re.test(data.employeeEmail)) {
			toast.error('email is invalid !');
			return;
		}

		if (data.employeePassword.length < 8) {
			toast.error('password must be atleast 8 characters !');
			return;
		}
		if (
			data.employeeName.trim() === '' ||
			data.employeePassword.trim() === '' ||
			data.employeeEmail.trim() === ''
		) {
			toast.error('Username or Password  is required !!');
			return;
		}
		const resp = await signUp(data);
		console.log(resp);
		if (resp.status > 200) {
			toast.error('Email or Password is invalid!');
			return;
		} else {
			console.log(resp.data);
			toast.success('User registered successfully !!');
		}
		//console.log(data);
		// try {
		// 	await axios.post('http://localhost:8080/api/employee/', data);

		// 	toast.success('User registered successfully !!');
		// 	navigate('/');
		// } catch (err) {
		// 	if (err.response.data.status >= 200) {
		// 		toast.error('Email id exists, please enter unique one ');
		// 	}
		// }
	};

	return (
		<div>
			<Card style={{ width: '25rem', align: 'centre', padding: '5%', margin: '1%', float: 'left' }}>
				<div>
					<div>
						<h2 className="text-center mb-4">Register !</h2>
						<h6>Name :</h6>
						<input
							type="text"
							className="form-control form-control-lg"
							placeholder="Enter User Name"
							id="employeeName"
							value={data.employeName}
							onChange={(e) => handleChange(e, 'employeeName')}
							//invalid ={ error.errors?.response?.data.name ? true : false}
						/>
					</div>
					<br />
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
					<div className="form-group">
						<h6>Password :</h6>
						<input
							type="password"
							className="form-control form-control-lg"
							placeholder="Enter Password"
							id="employeePassword"
							value={data.employeePassword}
							onChange={(e) => handleChange(e, 'employeePassword')}
							required
						/>
					</div>

					<br />
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						Join
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Signup;
