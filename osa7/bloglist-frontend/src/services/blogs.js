import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const newBlog = async (title, author, url, token) => {
  const blogData = { title: title, author: author, url: url };
  const response = await axios.post(baseUrl, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateBlog = async (blogData) => {
  const response = await axios.put(`/api/blogs/${blogData.id}`, blogData);
  return response;
};

const deleteBlog = async (blogId, token) => {
  const response = await axios.delete(`/api/blogs/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
};

export default { getAll, setToken, newBlog, updateBlog, deleteBlog };
