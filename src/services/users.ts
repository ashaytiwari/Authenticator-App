import messages from "@/constants/messages";
import axios from "axios";
import { toast } from "react-hot-toast";

export async function getMyProfile() {
  try {

    const response = await axios('/api/users/me');
  } catch (error) {
    toast.error(messages.internalServerError);
  }
};