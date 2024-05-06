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
  stakedToken: "ETH" | "USDB",
  stakedAmount: number,
  isStake: boolean
) {
  try {
    const response = await axios.post(`/api/users/${address}`, {
      stakedToken,
      stakedAmount,
      isStake,
    });
    return response.data.user;
  } catch (error) {
    console.error;
  }
}
