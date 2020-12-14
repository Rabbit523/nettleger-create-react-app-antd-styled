import axios from "axios";

class ApiService {
  // MODULE API
  createModule(data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/module/create`, data)
      .then(response => {
        return response.data;
      });
  }

  getAllModule() {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/module/getAll`)
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

  deleteModule(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/module/delete`, id)
      .then(response => {
        return response.data;
      });
  }
  // MODULE API - CUSTOM API => Upload file
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
  // SECTION API
  createSection(data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/section/create`, data)
      .then(response => {
        return response.data;
      });
  }

  getSection(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/section/get`, id)
      .then(response => {
        return response.data;
      });
  }

  getAllSection() {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/section/getAll`)
      .then(response => {
        return response.data;
      });
  }

  updateSection(id, data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/section/update`, { id, data })
      .then(response => {
        return response.data;
      });
  }

  deleteSection(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/section/delete`, id)
      .then(response => {
        return response.data;
      });
  }
  // PAGE API
  createPage(data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/page/create`, data)
      .then(response => {
        return response.data;
      });
  }

  getPage(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/page/get`, id)
      .then(response => {
        return response.data;
      });
  }

  getAllPage() {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/page/getAll`)
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

  deletePage(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/page/delete`, id)
      .then(response => {
        return response.data;
      });
  }
  // TREATMENT API
  createTreatment(data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/treatment/create`, data)
      .then(response => {
        return response.data;
      });
  }

  getTreatment(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/treatment/get`, id)
      .then(response => {
        return response.data;
      });
  }

  getAllTreatments() {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/treatment/getAll`)
      .then(response => {
        return response.data;
      });
  }

  updateTreatment(id, data) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/treatment/update`, { id, data })
      .then(response => {
        return response.data;
      });
  }

  deleteTreatment(id) {
    return axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/treatment/delete`, id)
      .then(response => {
        return response.data;
      });
  }
}

export default new ApiService();