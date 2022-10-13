import axiosClient from "./apiClient.js";

export const validateUser = (data) => {
  return axiosClient().post("user/checkcredentials", JSON.stringify(data));
};

export const userSignup = (data) => {
  return axiosClient()
    .post("user/create", data)
    .then((response) => response.data);
};

export const userLogin = (data, headers) => {
  return axiosClient().post("/token/", JSON.stringify(data));
};

export const getUser = (token) => {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosClient(options)
    .get("user/get")
    .then((response) => response.data);
};

export const getFriend = (user, token) => {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosClient(options).post("user/getfriend",JSON.stringify({user:user.profile})).then(response => response.data);
};

export const getMessages= (id,token) => {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosClient(options).post("user/messages/",JSON.stringify({to:id})).then(response => response.data);

}

export const sendMessage = (data,token) => {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axiosClient(options).post("user/messages/send",JSON.stringify(data)).then(response => response.data);
}
