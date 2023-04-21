import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

export default { getAllPersons, createPerson };
