import axios from "axios";
// 20.1
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

// 20.2 we use this class to send various types of HTTP requests of a particular endpint
class APIClient {
  // endpoint
  // 20.3
  constructor(endpoint) {
    this.endpoint = endpoint
  }

  // ******** 20.4 A method for getting data
  // 20.9.2 use arrow function
  getAll = () => {
    return axiosInstance
    // 20.8 "after useTodos" ei "this" will refer out 'apiClient' instance
    .get(this.endpoint)
    .then(res => res.data)
  }
  
  // ******** 20.5 A method for posting data
  // 20.9.2 use arrow function
  post = data => {
    return axiosInstance
      .post(this.endpoint, data)
      .then(res => res.data)
  }
}

export default APIClient;