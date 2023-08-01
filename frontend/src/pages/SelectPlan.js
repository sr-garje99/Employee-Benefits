import * as React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
//import NavBar from './NavBar';
import {	
	Card,
	Button,
	Box
} from '@mui/material';
import { toast } from 'react-toastify';
import { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { EmpContext } from '../utility/helper';
import { getToken } from '../auth';

const SelectPlan = () => {
	const { id } = useParams();
	let navigate = useNavigate();
	const empDetails = useContext(EmpContext);
	const [ emp, setEmp ] = empDetails;
	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
	const [ rowId, setRowId ] = useState(null);

	const [ selectedRows, setSelectedRows ] = useState([]);
	const [ plan, setPlan ] = useState([]);
	const [ carrier, setCarrier ] = useState([]);
	const [ carrierId, setCarrierId ] = useState();
	const [ checked, setChecked ] = React.useState(true);
	let token = getToken();
  let config ={
     headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }

	const handleChangee = (event) => {
		setChecked(event.target.checked);
	};
	const isRowSelectable = React.useCallback(
    ( GridRowParams) => {
      if (selectedRows.includes(id)) return true;
      if (selectedRows.length > 3) {
		
		return false};
      return true;
    },
    [selectedRows]
  );
	const [ planData, setPlanData ] = useState({
		planName: '',
		planType: '',
		planEmi: '',
		coverAmount: '',
		tenure: ''
	});

	const handleChange = (e) => {
		setPlanData({ ...planData, [e.target.name]: e.target.value });
	};

	const onSubmit = async () => {
		for (let i = 0; i < selectedRows.length; i++) {
			await axios.put(`http://localhost:8080/api/employee/${emp.employeeId}/add/${selectedRows[i]}`,'',config);
		}
		navigate(`/user/employeeDashboard/${emp.employeeId}`);
	};
	const columns = useMemo(
		() => [
			{ field: 'planId', headerName: 'ID', width: 70 },
			{ field: 'planName', headerName: 'Name', width: 130 },
			{ field: 'carrier', headerName: 'Carrier', width: 130, valueFormatter: ({ value }) => value.carrierName },
			{ field: 'planEmi', headerName: 'EMI', width: 120 },
			{ field: 'tenure', headerName: 'Tenure', type: 'number', width: 90 },
            { field: 'planType',headerName: 'Type',width: 150 },
			{ field: 'coverAmount', headerName: 'Cover Amount', type: 'number', width: 150 }
		],
		[ rowId ]
	);

	const fetchplans = async () => {
		let Avlplans = [];
        let filtplans = [];
        const { data } = await axios.get(`http://localhost:8080/api/dependent/eid/${emp?.employeeId}`);
		
		for (let i = 0; i < emp.company.carrier.length; i++) {
			let result = await axios.get(`http://localhost:8080/api/plan/cid/${emp.company.carrier[i].carrierId}`);
			//console.log(result.data, 'hiii');
			result.data.forEach((element) => {
				Avlplans.push(element);
			});

			// console.log(plan)
		}
        if (data.length == 0) {
			setPlan(Avlplans.filter((plan) => plan.planType == 'Employee'));
		} else  {
			setPlan(Avlplans.filter((plan) => plan.planType !== 'Employee'));
		}
		// setPlan(Avlplans);
	};
	useEffect(() => {
		fetchplans();
	}, []);
	return (
		<div>
			<NavBar />
			
			<Card
				sx={{
					width: '80vw',
					margin: '1vw',
					justifyContent: 'right',
					float: 'center'
				}}
			>
				
				<div style={{ height: 500, width: '100%' }}>
					<h4 style={{}}>Select Plans</h4>
					<h6>(you can select up to 3 plans)</h6>
					<Box style={{ margin: '0.5rem' }}>
						<DataGrid
							rows={plan}
							columns={columns}
							getRowId={(row) => row.planId}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 }
								}
							}}
							pageSizeOptions={[ 5, 10 ]}
							checkboxSelection
							onRowSelectionModelChange={(newSelectionArray) => {
								setSelectedRows(newSelectionArray);
								// console.log(newSelectionArray, selectedRows, 'this');
							}}
							isRowSelectable={isRowSelectable}
							selectedRows={selectedRows}
							{...plan}
						/>
					</Box>
				</div>

				<Button style={{ margin: ' 0.5rem' }} variant="contained" onClick={onSubmit}>
					{' '}
					Continue
				</Button>
			</Card>
		</div>
	);
};

export default SelectPlan;
