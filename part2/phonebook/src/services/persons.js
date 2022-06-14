import axios from 'axios';

const baseUrl = 'https://phonebookapp-service.herokuapp.com/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newContact => {
  const request = axios.post(baseUrl, newContact);
  return request.then(response => response.data);
};

const update = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact);
  return request.then(response => response.data);
};

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response);
};

const personServer = { getAll, create, update, deleteContact };

export default personServer;
