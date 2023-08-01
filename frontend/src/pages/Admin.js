import EmployeeTable from '../components/EmployeeTable';
import NavBar from '../components/NavBar';
import PlanTable from '../components/PlanTable';
import { Card, Button } from '@mui/material';
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Company from '../components/Company';
import CarrierTable from '../components/CarrierTable';
import DependentTable from '../components/DependentTable';
import { EmpContext, SetEmp } from '../utility/helper';
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`
	};
}

const Admin = () => {
	const [ value, setValue ] = useState(0);
	const empDetails = useContext(EmpContext);

	const [ emp, setEmp ] = empDetails;
	console.log(empDetails);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<NavBar />
			<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
				<Card sx={{ display: 'flex', width: '90vw', margin: '1vw', padding: '2vw', flexDirection: 'column' }}>
					<h1>Admin</h1>
					<Box>
						<h5>Name : {emp.employeeName}</h5>
						<h5>Email: {emp.employeeEmail}</h5>
					</Box>
				</Card>
			</Box>
			<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					sx={{ borderRight: 1, borderColor: 'divider' }}
				>
					<Tab label="Company" {...a11yProps(0)} />
					<Tab label="Carrier" {...a11yProps(1)} />
					<Tab label="Plan" {...a11yProps(2)} />
					{/* <Tab label="Employee" {...a11yProps(3)} />
					<Tab label="Dependents" {...a11yProps(4)} /> */}
				</Tabs>
				<TabPanel value={value} index={0}>
					<Company />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<CarrierTable />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<PlanTable />
				</TabPanel>
			</Box>
		</div>
	);
};

export default Admin;
