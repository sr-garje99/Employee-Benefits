import NavBar from '../components/NavBar';
import {Box, TextField, Typography, MenuItem, Card,Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { EmpContext } from '../utility/helper';
import { toast } from 'react-toastify';
import { getToken } from '../auth';




const Enroll = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [ company, setcompany ] = useState([]);
  const [compChoice, setCompChoice] = useState();
  let token = getToken();
  let config ={
     headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }
  const empDetails = useContext(EmpContext);
  const[emp, setEmp ] = empDetails;
  console.log(emp, "hello")
  const fetchcompany = async () => {
    // const emp = await axios.get(`http://localhost:8080/api/employee/${id}/`);
		const result = await axios.get('http://localhost:8080/api/company/');
		setcompany(result.data);
   
	};
   useEffect( () => {
    fetchcompany();
  },[]);
 // Company = company.companyName;
  const handleChange =(e) =>{
    setEmp({...emp, [e.target.name]: e.target.value})
    // console.log(emp)
  }
 
 const handleContinue = async () =>{
   var check = /^\d+$/
		if(!check.test(emp.employeeMobNo))
		{
			toast.error('mobile number is invalid !');
			return;
		}
    if( emp.employeeMobNo.length !== 10)
		{
			toast.error('mobile number is invalid !');
			return;
		}
    if(emp.employeeAge < 18){
      toast.error('Please enter valid Age !');
			return;
    }
    if(emp.basicSalary <1){
      toast.error('Please enter valid Salary!');
			return;
    }
    navigate(`/user/addDependents/${id}`)
    console.log(emp)
    const response = await axios.put(`http://localhost:8080/api/employee/${id}/cid/${emp.company.companyId}/`,emp,config);
    //navigate(`/plans/${id}`)
    setEmp(response.data)
  }

	return (<>
		<NavBar />
        <Box sx={{ 
         display: "flex",
         justifyContent: "center",
         alignItems : "center",
         flexDirection: "column",
         width: "100vw",
         padding: '0 20px',
         }}>
        <Typography variant='h4'>Employee Enrollment</Typography>

    <Card
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
         p: 2,
         width: "50vw"

      }}
      noValidate
      autoComplete="off"
      
    >
      <Box>
        <TextField
          id="emp-name"
          label="Employee Name"
          name= "employeeName"
          fullWidth
          onChange={handleChange}
          value={emp?.employeeName}
        />
       
        </Box>
      <div>
        <TextField
          id="emp-email"
          label="Employee Email"
          name = "employeeEmail"
          fullWidth
          onChange={handleChange}
          value={emp?.employeeEmail}
        />
      </div>
      <div>
        <TextField
          id="emp-company"
          select
          label="Company"
          helperText="Please select your Company"
          fullWidth
          value={emp?.company?.companyId}
          onChange={e => setEmp({...emp, company:{companyId: e.target.value}})}
        >
          {company?.map((option) => (
            <MenuItem key={option.companyName} value={option.companyId}>
              {option.companyName}
            </MenuItem>
          ))}
        </TextField>
        
       
      </div>
      <div>
        <TextField
          id="emp-email"
          label="Basic Salary"
          name = "basicSalary"
          value={emp?.basicSalary}
          fullWidth
          type='number'
                onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          id="emp-mob-no"
          label="Employee Mobile No."
          name = "employeeMobNo"
          fullWidth
          type = "number"
          value={emp?.employeeMobNo}
          onChange={handleChange}
        />
      </div>
      <br/>
      <div>
        <TextField
          id="emp-age"
          label="Age"
          name = "employeeAge"
          fullWidth
          type = "number"
          value={emp?.employeeAge}
          onChange={handleChange}
        />
      </div>
      <br/>
      <Button variant="contained" 
      onClick={handleContinue}
      >Continue</Button> 
    </Card>
  </Box>
	</>);
};

export default Enroll;
