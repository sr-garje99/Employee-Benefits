import { myaxios } from './help';

export const signUp = async (employee) => {
	try {
		const response = await myaxios.post('/api/auth/register', employee);
		return response.data;
	} catch (err) {
		return err.response.data;
	}
};
export const loginUser = (loginDetail) => {
	return myaxios.post('/auth/login', loginDetail).then((response) => response.data);
};

export const getUser = (userId) => {
	return myaxios.get(`/users/${userId}`).then((resp) => resp.data);
};
