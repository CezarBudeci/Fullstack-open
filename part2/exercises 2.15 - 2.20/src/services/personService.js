import axios from 'axios';

const basePath = "https://phonebook-open-fullstack.herokuapp.com/api/persons";

const getAllPersons = () => {
    return axios.get(basePath).then(res => res.data);
}

const createPerson = (person) => {
    return axios.post(basePath, person).then(res => res.data);
}

const updatePerson = (person) => {
    return axios.put(`${basePath}/${person.id}`, person).then(res => res.data);
}

const deletePerson = (id) => {
    return axios.delete(`${basePath}/${id}`);
}

export default { getAllPersons, createPerson, updatePerson, deletePerson };