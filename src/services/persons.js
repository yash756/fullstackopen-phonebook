import axios from 'axios';

const URL = 'http://localhost:3001/persons';

const getPeople = () => {
	return axios.get(URL).then((response) => response.data);
};

const addPeople = (person) => {
	return axios.post(URL, person).then((response) => response.data);
};

export default {
	getPeople,
	addPeople,
};
