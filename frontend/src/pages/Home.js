import NavBar from '../components/NavBar';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { React, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import pic from '../login.png';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
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

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}
const Home = ({ setEmp }) => {
	const [ value, setValue ] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<NavBar />
			<Box sx={{ width: '40%', float: 'right' }}>
				<img
					src={pic}
					style={{
						height: 400,
						width: 400,
						margin: 20,
						padding: 10
					}}
				/>
			</Box>
			<Box sx={{ width: '40%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab label="Log in" {...a11yProps(0)} />
						<Tab label="Sign up" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<Login setEmp={setEmp} />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<Signup />
				</CustomTabPanel>
			</Box>

		</div>
	);
};
export default Home;
