import { Card } from 'react-bootstrap';
import { Box, TextField, Typography, MenuItem, Button, Grid } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { SetEmp } from '../utility/helper';
import { getToken } from '../auth';

const EmployeeDashBoard = () => {
	const [ employee, setEmployee ] = useState([]);
	const { id } = useParams();
	let navigate= useNavigate();
	let token = getToken();
  let config ={
     headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }
	
	const UnSubscribe = async (eid,pid) =>{
			const response =await axios.put(`http://localhost:8080/api/employee/${eid}/plan/${pid}`,'',config)
			setEmployee(response.data);
			//employee.plan.foreach((prev) => prev.filter((item) => id !== item.pid))

	}

	const fetchEmployee = async () => {
		const result = await axios.get(`http://localhost:8080/api/employee/${id}/`);

		setEmployee(result.data);
	};
	useEffect(() => {
		fetchEmployee();
	}, []);

	return (
		<div>
			<NavBar />
			<Box>
				<Card
					style={{
						margin: ' 0.5rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
						width: '90vw',
						padding: '0 20px'
					}}
				>
					<Card.Body>
						<Card.Title sx={{ alignItems: 'center' }}>
							<b>Employee Details </b>
						</Card.Title>
						<hr />
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-around',
								padding: '20px'
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column'
								}}
							>
								<h5>Name :</h5>
								<h5>{employee.employeeName}</h5>
							</Box>

							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column'
								}}
							>
								<h5> Email :</h5>
								<h5>{employee.employeeEmail} </h5>
							</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column'
								}}
							>
								<h5> Basic Salary : </h5>
								<h5>&#8377; {employee.basicSalary} </h5>
							</Box>
						</Box>
						
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-around',
								padding: '20px'
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column'
								}}
							>
								<h5> Mobile No : </h5>
								<h5> {employee.employeeMobNo} </h5>
							</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column'
								}}
							>
								<h5> Age : </h5>
								<h5> {employee.employeeAge} </h5>
							</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column'
								}}
							>
								<h5> Company : </h5>
								<h5> {employee?.company?.companyName} </h5>
							</Box>
						</Box>
						
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-around',
								padding: '20px'
							}}
						>
					
						<Button style={{ margin: ' 0.5rem' }} variant="contained" onClick={(e)=>navigate(`/user/enroll/${id}`)}> Enroll</Button>
						</Box>
					</Card.Body>
				</Card>

			</Box>
			
				
			{employee.plan?.length > 0 && 
			<Grid
                                container
                                spacing={2}
                                direction="row"
								display="flex"
								flexGrow = "1"
                                justify="flex-start"
                                alignItems="flex-start"
                              >
				{(employee?.plan).map((p,index) => (
					
					 <Grid item lg={4}>
				<Card sx={{padding:"1vw"}}>
											<Box sx={{padding:"2vw"}}>
												<h3>Subscribed Plan</h3>
												
												<h5>{p.planName} </h5>
												<h5> emi : &#8377; {p.planEmi} </h5>
												<h5>tenure: {p.tenure} yrs</h5>
												<h5>type: {p.planType} </h5>
												<h5> Cover :&#8377;{p.coverAmount} </h5>
												<h5>Carrier: {p.carrier.carrierName}</h5>
												<Button
												style={{ margin: ' 0.5rem' }}
												font-color="#FFFFFFF"
												variant="contained"
												 onClick={(e) => UnSubscribe(employee.employeeId,employee.plan[0].planId)}
											>
												UnSubscribe
											</Button>
												
											</Box>
				</Card>
        </Grid>			

				))}</Grid>}
				
			
		</div>
	);
};

export default EmployeeDashBoard;
