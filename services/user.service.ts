import axios from "axios";

export async function getUser(address: string) {
  try {
    const response = await axios.get(`/api/users/${address}`);
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
}
