import axios from "axios";

class ApiService {

  createPage(data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/page/create`, { data })
      .then(response => {
        return response.data;
      });
  }

  getPage(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/page/get`, { id })
      .then(response => {
        return response.data;
      });
  }

  updatePage(id, data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/page/update`, { id, data })
      .then(response => {
        return response.data;
      });
  }

  deletePage(ids) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/page/delete`, { ids })
      .then(response => {
        return response.data;
      });
  }

  createModule(data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/module/create`, data)
      .then(response => {
        return response.data;
      });
  }

  getAllModule() {
    return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/module/getAll`,)
    .then(response => {
      return response.data;
    });
  }

  getModule(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/module/get`, id)
      .then(response => {
        return response.data;
      });
  }

  updateModule(id, data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/module/update`, { id, data })
      .then(response => {
        return response.data;
      });
  }

  deleteModule(ids) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/module/delete`, { ids })
      .then(response => {
        return response.data;
      });
  }
  
  fileUpload(formData) {
    let config = {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
    };
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/custom/fileupload`, formData, config)
      .then(response => {
        return response.data;
      });
  }
}

export default new ApiService();