import axios from "axios";

class AuthService {

  login(data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
        email: data.email,
        password: data.password
      })
      .then(response => {
        return response.data;
      });
  }
  
}

export default new AuthService();