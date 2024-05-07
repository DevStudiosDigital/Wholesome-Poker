import axios from "axios";

export async function getUser(address: string) {
  try {
    const response = await axios.get(`/api/users/${address}`);
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUsersAPI() {
  try {
    const response = await axios.get(`/api/users`);
    return response.data.users;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserAPI(
  address: string,
  ethAmount: number,
  usdbAmount: number
) {
  try {
    const response = await axios.post(`/api/users/${address}`, {
      ethAmount,
      usdbAmount,
    });
    return response.data.user;
  } catch (error) {
    console.error;
  }
}
