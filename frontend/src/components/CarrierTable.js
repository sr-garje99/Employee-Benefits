import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavBar from './NavBar';
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../auth';
//import carrierActions from '../actions/carrierActions';

const CarrierTable = () => {
	const [ rowId, setRowId ] = useState(null);
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [openAddForm, setOpenAddForm] = useState(false);
	const [selectedRow,setSelectedRow]= useState(null);
	const [carrierData, setCarrierData] = useState({
		carrierName: "",
		carrierContact:""		
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
	console.log(params.row.carrierId);
  };
const handleClickOpenForm = (e,params) => {
    setOpenForm(true);
	setSelectedRow(params);
	console.log(params.row.carrierId);
	setCarrierData({carrierName:params.row.carrierName,
	              carrierContact:params.row.carrierContact})
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
	await axios.delete(`http://localhost:8080/api/carrier/${id}`,config)
	handleClose();
	setCarrier((prev) => prev.filter((item) => id !== item.carrierId));
	fetchCarriers();
	toast.success("deleted sucessfully");
	}catch(err){
		 if(err.response.data.status >= 200){
		toast.error("Can not delete entity")
	}
	}
	//window.location.reload();
	
  }
  const handleChange =(e) =>{
    setCarrierData({...carrierData, [e.target.name]: e.target.value})
  }
  const onSubmit = async (id) =>{
	var re = /\S+@\S+\.\S+/;
		if (!re.test(carrierData.carrierContact)) {
			toast.error('email is invalid !');
			return;
		}
   // e.preventDefault();
   const addedCarrier = await axios.put(`http://localhost:8080/api/carrier/${id}/`,carrierData,config);
   //setcompany((prev) => prev.filter((item) => id !== item.companyId));
   fetchCarriers();
    handleClose();
  }
  const onSubmitAdd = async () =>{
   // e.preventDefault();
   var re = /\S+@\S+\.\S+/;
		if (!re.test(carrierData.carrierContact)) {
			toast.error('email is invalid !');
			return;
		}
   const addedCarrier = await axios.post(`http://localhost:8080/api/carrier/`,carrierData,config);
   //setCarrier(addedCarrier);
   fetchCarriers();
   //setcompany((prev) => prev.filter((item) => id !== item.companyId));
    handleClose();
  }
	const columns = useMemo(
		() => [
			{ field: 'carrierId', headerName: 'ID', width: 70 },
			{ field: 'carrierName', headerName: 'Name', width: 130 },
			{ field: 'carrierContact', headerName: 'Email', width: 180 },
			
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
	const [ carrier, setCarrier ] = useState([]);

	const fetchCarriers = async () => {
		const result = await axios.get('http://localhost:8080/api/carrier/');

		setCarrier(result.data);
	};
	useEffect(() => {
		fetchCarriers();
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
			><Button variant='contained'  onClick={handleClickOpenAddForm}>add</Button>
				<div style={{ height: 400, width: '100%' }}>
					
					
					<DataGrid
						rows={carrier}
						columns={columns}
						getRowId={(row) => row.carrierId}
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
						<Button onClick={()=>handleDelete(selectedRow.row.carrierId)}>Delete</Button>
						<Button onClick={handleClose} autoFocus>
							Cancel
						</Button>
						</DialogActions>
					</Dialog>
					<Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      	 <Dialog open={openForm} onClose={handleClose} fullWidth >
        <DialogTitle>Edit </DialogTitle>
        <DialogContent >

          <TextField
            autoFocus
            margin="normal"
            id="carrier-name"
            label="Carrier Name"
            type="text"
            name="carrierName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={carrierData.carrierName}
          />
          <TextField
            autoFocus
            margin="normal"
            id="carrier-contact"
            label="Email"
            type="text"
            name="carrierContact"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={carrierData.carrierContact}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button  variant='contained' onClick={()=>onSubmit(selectedRow.row.carrierId)}>Add</Button>
        </DialogActions>
      </Dialog></div>
			</Card>
			<Dialog open={openAddForm} onClose={handleClose} fullWidth >
        <DialogTitle>Add Carrier </DialogTitle>
        <DialogContent >

          <TextField
            autoFocus
            margin="normal"
            id="carrier-name"
            label="Carrier Name"
            type="text"
            name="carrierName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={carrierData.carrierName}
          />
          <TextField
            autoFocus
            margin="normal"
            id="carrier-contact"
            label="Email"
            type="text"
            name="carrierContact"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={carrierData.carrierContact}
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

export default CarrierTable;
