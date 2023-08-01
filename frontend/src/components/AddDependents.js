import NavBar from '../components/NavBar';
import {Box, TextField, Typography, MenuItem, Card,Button, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { getToken } from '../auth';
const AddDependents = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  
  const handleOpen = () => setOpen(true);
  
  const [ company, setcompany ] = useState([]);
   const [open, setOpen] = useState(false);
   let token = getToken();
  let config ={
     headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }
   
  const [depData, setDepData] = useState({
    name: "",
    relation: "",
    age:"",

  });
  const [depList, setDepList] = useState([]);
  const relation  = [{
    value: "Mother",
   },{
    value: "Father"
   },{
    value: "Spouse"
   },{
    value: "Son"
   },{
    value: "Daughter"
   },]
   
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
	await axios.delete(`http://localhost:8080/api/dependent/${id}`,config)
	handleClose();
    setDepList((prev) => prev.filter((item) => id !== item.dependentId));
	toast.success("deleted sucessfully");

	
  }
   const columns = [{ field: 'dependentId', headerName: 'ID', width: 70 },
			{ field: 'name', headerName: 'Name', width: 130 },
			{ field: 'relation', headerName: 'Relation', width: 180 },
			{
				field: 'age',
				headerName: 'Age',
				type: 'number',
				width: 70
			},{
				field: 'actions',
				headerName: 'Actions',
			
				renderCell: (params) => {
					//console.log(params) ;
					return(
					<>
					

					<IconButton aria-label="delete" size="large" onClick={(e)=>handleClickOpenForm(e,params)}>

						< DeleteIcon  />
					</IconButton>
					 
					
					</>)
				},
			}]
      const fetchDependent = async ()=>{
        const result =await axios.get(`http://localhost:8080/api/dependent/eid/${id}/`);
        setDepList(result.data);
      }

      useEffect(() =>{
        fetchDependent();
      },[]);
  
 
 // Company = company.companyName;
  const handleChange =(e) =>{
    setDepData({...depData, [e.target.name]: e.target.value})
  }
 

  const onSubmit = async (e) =>{
    e.preventDefault();
    if(depData.age < 0){
      toast.error('Please enter valid Age !');
			return;
    }
    if (depData.name.trim() === '' ) {
			toast.error('Please enter name!');
			return;
		}
    const addedDepndent = await axios.post(`http://localhost:8080/api/dependent/${id}/`,depData,config);
    setDepList([...depList, addedDepndent.data])
    // console.log(depList);
    handleClose();
  }

	return (<>
		<NavBar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '20px', flexDirection: 'column'}}>
        <Typography variant='h4'>Add Dependents</Typography>
        {depList.length < 6 &&
          <Button variant='contained' sx={{marginTop: '8px'}} onClick={handleOpen}>Add Dependents</Button>
          }     
      </Box>

      {/* dependents table */}
     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column'}}>
     { depList.length > 0 ?<DataGrid
						rows={depList}
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
                    : <Typography variant='h4' color={"grey"}>No Dependents Added</Typography>
                }
                {depList.length > 0 && <Button style={{ margin: ' 1rem' }}variant='contained' onClick={() => navigate(`/user/plans/${id}`)}>Continue</Button>}
                {depList.length === 0 && <Button style={{ margin: ' 1rem' }}variant='contained' onClick={() => navigate(`/user/plans/${id}`)}>Skip</Button>}
</Box>

{/* form modal */}
      <Dialog open={open} onClose={handleClose} fullWidth >
        <DialogTitle>Add Dependents Details</DialogTitle>
        <DialogContent >

          <TextField
            autoFocus
            margin="normal"
            id="dependent-name"
            label="Dependent Name"
            type="text"
            name="name"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={depData.name}
          />
          <TextField
            autoFocus
            margin="normal"
            id="dependent-age"
            label="Dependent Age"
            type="number"
            name="age"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={depData.age}
          />
          <TextField
          id="dependent-relation"
          margin="normal"
          select
          label="Relation with dependent"
          helperText="Please select your relation with dependent"
          fullWidth
          name="relation"
          value={depData.relation}
          onChange={handleChange}
        >
          {relation.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button  variant='contained' onClick={onSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog
						open={openForm}
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
	</>);
};

export default AddDependents;
