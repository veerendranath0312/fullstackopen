import axios from "axios";
const baseUrl = "/api/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAllPersons, createPerson, updatePerson, deletePerson };
