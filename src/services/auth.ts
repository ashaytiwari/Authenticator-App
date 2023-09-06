import axios from "axios";
import { toast } from "react-hot-toast";

import { IUserLoginModel, IUserSignupModel, IVerifyEmailParamsModel } from "@/interfaces/modelInterfaces/users";
import messages from "@/constants/messages";

export async function userSignup(params: IUserSignupModel) {

  try {
    const response = await axios.post('/api/users/signup', params);

    if (response.data.statusCode === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    return response;

  } catch (error) {
    toast.error(messages.internalServerError);
  }
}

export async function userLogin(params: IUserLoginModel) {

  try {
    const response = await axios.post('/api/users/login', params);

    if (response.data.statusCode === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    return response;

  } catch (error) {
    toast.error(messages.internalServerError);
  }
}

export async function userLogout() {

  try {

    const response = await axios.get('/api/users/logout');
    toast.success(response.data.message);

    return response;

  } catch (error) {
    toast.error(messages.internalServerError);
  }
}

export async function verifyEmail(params: IVerifyEmailParamsModel) {
  try {

    const response = await axios.post('/api/users/verifyEmail', params);

    if (response.data.statusCode === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    return response;

  } catch (error) {
    toast.error(messages.internalServerError);
  }
}