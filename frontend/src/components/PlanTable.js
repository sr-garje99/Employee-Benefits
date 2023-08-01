import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavBar from './NavBar';
import { MenuItem,DialogTitle,Card,TextField,Button,Dialog,DialogActions,DialogContent,DialogContentText } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getToken } from '../auth';

const PlanTable = () => {
	const [ rowId, setRowId ] = useState(null);
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [selectedRow,setSelectedRow]= useState(null);
	const [ plan, setPlan ] = useState([]);
  const [carrier,setCarrier] = useState([]);
  const [carrierId,setCarrierId] =useState();
	const [planData, setPlanData] = useState({
		planName: "",
		planType:"",
		planEmi:"",
		coverAmount:"",
		tenure:""		
  	});
    const pType  = [{
    value: "Family",
   },{
    value: "Employee + child"
   },{
    value: "Employee"
   },]
  let token = getToken();
  let config ={
     headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }

  const handleClickOpen = (e,params) => {
    setOpen(true);
	setSelectedRow(params);
	console.log(params.row.employeeId);
  };
const handleClickOpenForm = (e,params) => {
	console.log(e, "event")
    setOpenForm(true);
	setSelectedRow(params);
	console.log(params.row, "params");
	setPlanData({planName: params.row.planName,
				 planType: params.row.planType,
				 planEmi: params.row.planEmi,
				 coverAmount: params.row.coverAmount,
				 tenure:params.row.tenure
		
	})
}
	const handleClickOpenAddForm = (e,params) => {
	  console.log(e, "event")
    setOpenAddForm(true);
  };

  const handleClose = () => {
    setOpen(false);
	  setOpenForm(false);
	  setOpenAddForm(false);
  };
  const handleDelete = async (id) =>{
	
	try{
	await axios.delete(`http://localhost:8080/api/plan/${id}`,config)
	handleClose();
	setPlan((prev) => prev.filter((item) => id !== item.planId));
	toast.success("deleted sucessfully");
  }catch(err){
    if(err.response.data.status >= 200){
		toast.error("Can not delete entity")
	}
  }
	//window.location.reload();
	
  }
  const handleChange =(e) =>{
    setPlanData({...planData, [e.target.name]: e.target.value})
  }
  const onSubmit = async (id) =>{
   // e.preventDefault();
   const addedPlan = await axios.put(`http://localhost:8080/api/plan/${id}/`,planData,config);
   //setcompany((prev) => prev.filter((item) => id !== item.companyId));
    fetchplans();
    console.log(id);
    handleClose();
  }
  const onSubmitAdd = async () =>{
   // e.preventDefault();
   try{
      const addedPlan = await axios.post(`http://localhost:8080/api/plan/${carrierId}`,planData,config);
      //setcompany((prev) => prev.filter((item) => id !== item.companyId));
        fetchplans();
        
    }catch(err){

    }
    handleClose();
  }
	const columns = useMemo(() => [
		{ field: 'planId', headerName: 'ID', width: 70 },
		{ field: 'planName', headerName: 'Name', width: 130 },
		{ field: 'carrier', headerName: 'Carrier', width: 130, valueFormatter: ({value}) =>value.carrierName },
		{ field: 'planEmi', headerName: 'EMI', width: 120 },
		{ field: 'tenure',headerName: 'Tenure',type: 'number',width: 90 },
    { field: 'planType',headerName: 'Type',width: 150 },
		{ field: 'coverAmount', headerName: 'Cover Amount', type: 'number', width: 150 },
		{
				field: 'actions',
				headerName: 'Actions',
		renderCell: (params) => {
					//console.log(params) ;
					return(
					<>	
					<IconButton aria-label="delete" size="large"onClick={(e)=>handleClickOpenForm(e,params)}>
						<EditIcon />
					</IconButton> 

					<IconButton aria-label="delete" size="large" onClick={(e)=>handleClickOpen(e,params)}>

						< DeleteIcon  />
					</IconButton>
					 
					
					</>)
				}
			}
	],[ rowId ]);
	

	const fetchplans = async () => {
		const result = await axios.get('http://localhost:8080/api/plan/');
    setPlan(result.data);
    const response = await axios.get('http://localhost:8080/api/carrier/');
    setCarrier(response.data);
		
		// console.log(plan)
	};
	useEffect(() => {
		fetchplans();
	}, []);
	return (
		<div>
			<Card
				sx={{
					width: '80vw',
					margin: '1vw',
					justifyContent: 'right',
					float: 'right'
				}}
			>
        <Button variant='contained'  onClick={handleClickOpenAddForm}>add</Button>
				<div style={{ height: 500, width: '100%' }}>
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
						checkboxSelection={false}
					/>
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
						{"Are you sure you want to Delete ?"}
						</DialogTitle>
						<DialogContent>
						<DialogContentText id="alert-dialog-description">
							
						</DialogContentText>
						</DialogContent>
						<DialogActions>
						<Button onClick={()=>handleDelete(selectedRow.row.planId)}>Delete</Button>
						<Button onClick={handleClose} autoFocus>
							Cancel
						</Button>
						</DialogActions>
					</Dialog>
					<Button variant="outlined" onClick={handleClickOpen}>
        				Open form dialog
      				</Button>
      
				</div>
			</Card>
		<Dialog open={openForm} onClose={handleClose} fullWidth >
        <DialogTitle>Edit </DialogTitle>
        <DialogContent >

          <TextField
            autoFocus
            margin="normal"
            id="plan-name"
            label=" plan Name"
            type="text"
            name="planName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.planName}
          />
          <TextField
            autoFocus
            margin="normal"
            id="plan-type"
            select
            label="Plan Type"
            name="planType"
            helperText="Please select your plan type"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.planType}
          >
            {pType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
            </TextField>
		  <TextField
            autoFocus
            margin="normal"
            id="plan-emi"
            label="Emi"
            type="number"
            name="planEmi"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.planEmi}
          />
		  <TextField
            autoFocus
            margin="normal"
            id="plan-tenure"
            label="Tenure"
            type="number"
            name="tenure"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.tenure}
          />
		  <TextField
            autoFocus
            margin="normal"
            id="cover-amount"
            label="Cover Amount"
            type="number"
            name="coverAmount"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.coverAmount}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button  variant='contained' onClick={()=>onSubmit(selectedRow.row.planId)}>Add</Button>
        </DialogActions>
      </Dialog>
	  <Dialog open={openAddForm} onClose={handleClose} fullWidth >
        <DialogTitle>Add new Plan </DialogTitle>
        <DialogContent >
            <div>
        <TextField
          id="carrier"
          select
          label="carrier"
          helperText="Please select carrier"
          fullWidth
          value={carrierId}
          onChange={e => setCarrierId( e.target.value)}
        >
          {carrier?.map((option) => (
            <MenuItem key={option.carrierName} value={option.carrierId}>
              {option.carrierName}
            </MenuItem>
            
          ))}
        </TextField>
        
       
      </div>
          <TextField
            autoFocus
            margin="normal"
            id="plan-name"
            label=" plan Name"
            type="text"
            name="planName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.planName}
          />
          <TextField
            autoFocus
            margin="normal"
            id="plan-type"
            select
            label="Plan Type"
            name="planType"
            helperText="Please select your plan type"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.planType}
          >
            {pType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
            </TextField>
		  <TextField
            autoFocus
            margin="normal"
            id="plan-emi"
            label="Emi"
            type="number"
            name="planEmi"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.planEmi}
          />
		  <TextField
            autoFocus
            margin="normal"
            id="plan-tenure"
            label="Tenure"
            type="number"
            name="tenure"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.tenure}
          />
		  <TextField
            autoFocus
            margin="normal"
            id="cover-amount"
            label="Cover Amount"
            type="number"
            name="coverAmount"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={planData.coverAmount}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button  variant='contained' onClick={()=>onSubmitAdd()}>Add</Button>
        </DialogActions>
      </Dialog>
		</div>
	);
};

export default PlanTable;
