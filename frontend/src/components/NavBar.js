import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { EmpContext } from '../utility/helper';
import { Button, AppBar, Typography, Toolbar } from '@mui/material';
import pic from '../Persistent-logo.png';
import { doLogout } from '../auth';

const NavBar = () => {
	const [ emp, setEmp ] = useContext(EmpContext);
	const navigate = useNavigate();
	const logout = () => {
		setEmp(null);
		navigate('/');
		doLogout();
	};
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<img
						alt="logo"
						src={pic}
						style={{
							height: 40,
							width: 40,
							margin: 2
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
					>
						Employee Benefits
					</Typography>

					{emp && (
						<Button variant="outlined" color="secondary" onClick={logout}>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
