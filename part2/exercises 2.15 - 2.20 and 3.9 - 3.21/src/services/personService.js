import axios from 'axios';

const basePath = "/api/persons";

const getAllPersons = () => {
    return axios.get(basePath).then(res => res.data);
}

const createPerson = (person) => {
    return axios.post(basePath, person).then(res => res.data);
}

const updatePerson = (person) => {
    const path = `${basePath}/${person.id}`;
    delete person.id;
    return axios.put(path, person).then(res => res.data);
}

const deletePerson = (id) => {
    return axios.delete(`${basePath}/${id}`);
}

export default { getAllPersons, createPerson, updatePerson, deletePerson };