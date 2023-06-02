import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAllBlogs = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, data, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAllBlogs, createBlog, updateBlog, deleteBlog, setToken }
