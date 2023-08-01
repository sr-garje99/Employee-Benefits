import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavBar from './NavBar';
import {Box, TextField, Typography, MenuItem, Card,Button, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useState, useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../auth';
//import companyActions from '../actions/companyActions';

const Company = () => {
	const [ rowId, setRowId ] = useState(null);
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [selectedRow,setSelectedRow]= useState(null);
	const [carrier,setCarrier] = useState([]);
    const [carrierId,setCarrierId] =useState();
	const [ company, setcompany ] = useState([]);
	const [companyData, setCompanyData] = useState({
		companyName: "",
		companyEmail: "",
		companyContact:"",
		companyAddress:""
  	});
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
    setOpenForm(true);
	setSelectedRow(params);
	console.log(params.row.companyId);
	setCompanyData({companyName: params.row.companyName,
		companyEmail : params.row.companyEmail,
		companyAddress : params.row.companyAddress,
	companyContact: params.row.companyContact})
  };
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
	const response =await axios.delete(`http://localhost:8080/api/company/${id}`,config)
	console.log(response);
	setcompany((prev) => prev.filter((item) => id !== item.companyId));
	toast.success("deleted sucessfully");
	}catch(err){
	if(err.response.data.status >= 200){
		toast.error("Can not delete entity")
	}}
	handleClose();
	
	
	
  }
  const handleChange =(e) =>{
    setCompanyData({...companyData, [e.target.name]: e.target.value})
  }
  const onSubmit = async (id) =>{
    //e.preventDefault();
   const addedCompany = await axios.put(`http://localhost:8080/api/company/${id}/`,companyData,config);
   //setcompany((prev) => prev.filter((item) => id !== item.companyId));
   fetchcompanys();
    console.log(id);
    handleClose();
  }
  const onSubmitAdd = async (id) =>{
   // e.preventDefault();
   var re = /\S+@\S+\.\S+/;
		if (!re.test(companyData.companyEmail)) {
			toast.error('email is invalid !');
			return;
		}
   const newCompany = await axios.post(`http://localhost:8080/api/company/`,companyData,config);
   await axios.put(`http://localhost:8080/api/company/${newCompany?.data.companyId}/ccid/${id}`,"",config);
   fetchcompanys();
    handleClose();
  }
	const columns = useMemo(
		() => [
			{ field: 'companyId', headerName: 'ID', width: 70 },
			{ field: 'companyName', headerName: 'Name', width: 130 },
			{ field: 'companyEmail', headerName: 'Email', width: 180 },
			{ field: 'companyAddress', headerName: 'Address', width: 180 },
			{
				field: 'companyContact',
				headerName: 'Mobile Number',
				type: 'number',
				width: 200
			},
			{ field: 'carrier', headerName: 'Carrier', width: 130, valueFormatter: ({value}) =>value[0].carrierName },
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
		],
		[ rowId ]
	);

	const fetchcompanys = async () => {
		const result = await axios.get('http://localhost:8080/api/company/');
        setcompany(result.data);
		const response = await axios.get('http://localhost:8080/api/carrier/');
        setCarrier(response.data);
	};
	useEffect(() => {
		fetchcompanys();
		
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
				<div style={{ height: 400, width: '100%' }}>
					
					<DataGrid
						rows={company}
						columns={columns}
						getRowId={(row) => row.companyId}
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
						<Button onClick={()=>handleDelete(selectedRow.row.companyId)}>Delete</Button>
						<Button onClick={handleClose} autoFocus>
							Cancel
						</Button>
						</DialogActions>
					</Dialog>
				</div>
			</Card>
	    <Dialog open={openForm} onClose={handleClose} fullWidth >
        <DialogTitle>Add Company Details</DialogTitle>
        <DialogContent >

          <TextField
            autoFocus
            margin="normal"
            id="company-name"
            label="Company Name"
            type="text"
            name="companyName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={companyData.companyName}
          />
          <TextField
            autoFocus
            margin="normal"
            id="company-email"
            label="Email"
            type="text"
            name="companyEmail"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={companyData.companyEmail}
          />
          <TextField
          id="company-contact"
          margin="normal"
          label="company contact"
          fullWidth
          name="companyContact"
          value={companyData.companyContact}
          onChange={handleChange}
        > 
        </TextField>
		 <TextField
          id="company-address"
          margin="normal"
          label="company address"
          fullWidth
          name="companyAddress"
          value={companyData.companyAddress}
          onChange={handleChange}
        ></TextField>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button  variant='contained' onClick={()=>onSubmit(selectedRow.row.companyId)}>Add</Button>
        </DialogActions>
      </Dialog>
	  <Dialog open={openAddForm} onClose={handleClose} fullWidth >
        <DialogTitle>Edit Company Details</DialogTitle>
        <DialogContent >

          <TextField
            autoFocus
            margin="normal"
            id="company-name"
            label="Company Name"
            type="text"
            name="companyName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={companyData.companyName}
          />
          <TextField
            autoFocus
            margin="normal"
            id="company-email"
            label="Email"
            type="text"
            name="companyEmail"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={companyData.companyEmail}
          />
          <TextField
          id="company-contact"
          margin="normal"
          label="company contact"
          fullWidth
          name="companyContact"
          value={companyData.companyContact}
          onChange={handleChange}
        > 
        </TextField>
		 <TextField
          id="company-address"
          margin="normal"
          label="company address"
          fullWidth
          name="companyAddress"
          value={companyData.companyAddress}
          onChange={handleChange}
        ></TextField>
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
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button  variant='contained' onClick={()=>onSubmitAdd(carrierId)}>Add</Button>
        </DialogActions>
      </Dialog>
		</div>
	);
};

export default Company;
