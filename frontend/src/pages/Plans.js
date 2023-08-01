import NavBar from '../components/NavBar';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col, Container,Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { EmpContext } from '../utility/helper';
import { Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
	const [ Plans, setPlan ] = useState();
	const [selectPlan,setSelectPlan] = useState([]);
	const empDetails = useContext(EmpContext);
	const [ emp, setEmp ] = empDetails;
	let navigate = useNavigate();
	let planns = [];
	const handleSelect = async (e, plan) => {
		console.log(selectPlan,"############")
		await axios.put(`http://localhost:8080/api/employee/plan/${emp.employeeId}`, plan);
		navigate(`/employeeDashboard/${emp.employeeId}`);
	};

	const fetchPlans = async () => {
		const { data } = await axios.get(`http://localhost:8080/api/dependent/eid/${emp?.employeeId}`);
		
		for (let i = 0; i < emp.company.carrier.length; i++) {
			let result = await axios.get(`http://localhost:8080/api/plan/cid/${emp.company.carrier[i].carrierId}`);
			console.log(result.data, 'hiii');
			result.data.forEach((element) => {
				//console.log(element, "hl")
				planns.push(element);
			});
		}
		

		// if (data.length == 0) {
		// 	setPlan(planns.filter((plan) => plan.planType == 'employee'));
		// } else {
		// 	setPlan(planns.filter((plan) => plan.planType !== 'employee'));
		// }
			setPlan(planns);
		// console.log(planns, 'plan');
	};

	useEffect(() => {
		fetchPlans();
		console.log(selectPlan,"############")
	},[]);

	return (
		<div>
			<NavBar />
			<div className="main-product-show">
				<div className="m-3 rounded shadow-lg main-product-show">
					<Container fluid>
						<Row>
							{<h1> Plans </h1>}
							{Plans?.map((plan, index) => (
								<Col md={4} lg={4} sm={4} xs={12} key={index}>
									<Card style={{ margin: ' 0.5rem' }}>
										<Card.Body>
											<Card.Title>
												<b>{plan.planName}</b>
											</Card.Title>
											<h5> Cover :&#8377;{plan.coverAmount} </h5>

											<h5> emi : &#8377; {plan.planEmi} </h5>
											<h5>tenure: {plan.tenure} yrs</h5>
											<h5>type: {plan.planType}</h5>
											<h5>carrier: {plan.carrier.carrierName} </h5>

											<Form.Check aria-label={plan.planId} 
											onChange={(e) => setSelectPlan(plan.planId)}/>
											<Button
												style={{ margin: ' 0.5rem' }}
												className="btn btn-contained-primary"
												onClick={(e) => handleSelect(e, plan)}
											>
												Select
											</Button>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					</Container>
				</div>
			</div>
		</div>
	);
};

export default Plans;
