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
//import dependentActions from '../actions/dependentActions';

const DependentTable = () => {
	const [ rowId, setRowId ] = useState(null);
	const [open, setOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [selectedRow,setSelectedRow]= useState(null);
    const [ dependent, setDependent ] = useState([]);

  const handleClickOpen = (e,params) => {
    setOpen(true);
	setSelectedRow(params);
	console.log(params.row.dependentId);
  };
const handleClickOpenForm = (e,params) => {
    setOpenForm(true);
	setSelectedRow(params);
	console.log(params.row.dependentId);
  };
  const handleClose = () => {
    setOpen(false);
	setOpenForm(false);
  };
  const handleDelete = async (id) =>{
	await axios.delete(`http://localhost:8080/api/dependent/${id}`)
	handleClose();
    setDependent((prev) => prev.filter((item) => id !== item.dependentId));
	toast.success("deleted sucessfully");

	
  }
	const columns = useMemo(
		() => [
			{ field: 'dependentId', headerName: 'ID', width: 70 },
			{ field: 'name', headerName: 'Name', width: 130 },
			{ field: 'relation', headerName: 'Relation', width: 180 },
			{
				field: 'age',
				headerName: 'Age',
				type: 'number',
				width: 70
			},
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
	

	const fetchdependents = async () => {
		const result = await axios.get('http://localhost:8080/api/dependent/');

		setDependent(result.data);
	};
	useEffect(() => {
		fetchdependents();
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
				<div style={{ height: 400, width: '100%' }}>
					<DataGrid
						rows={dependent}
						columns={columns}
						getRowId={(row) => row.dependentId}
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
						<Button onClick={()=>handleDelete(selectedRow.row.dependentId)}>Delete</Button>
						<Button onClick={handleClose} autoFocus>
							Cancel
						</Button>
						</DialogActions>
					</Dialog>
					<Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
		  <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
				</div>
			</Card>
		</div>
	);
};

export default DependentTable;
