import axios from "axios";
import { toast } from "react-hot-toast";

import { IUserModel } from "@/interfaces/dataModels/users";
import messages from "@/constants/messages";

export async function userSignup(params: IUserModel) {

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