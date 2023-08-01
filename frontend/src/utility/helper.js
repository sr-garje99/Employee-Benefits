import { createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const EmpContext = createContext(null);

// export let emp = {};

export const SetEmp = async (data) => {
	try {
		console.log("inside");
		const result = await axios.post('http://localhost:8080/api/auth/login', data);

		return result.data;
	} catch (err) {
		return err.response.data;
	}
};
