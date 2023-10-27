import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (userToken) => {
  token = userToken;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};
export default { getAll, postBlog, setToken };
