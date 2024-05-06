import axios from "axios";

export const getStakerInfoAPI = async (stakerAddress: string) => {
  try {
    const res = await axios.get(`api/tokenstaking/staker/${stakerAddress}`);
    return res.data.staker;
  } catch (error) {
    console.error("[getStakerInfoAPI]: ", error);
    throw error;
  }
};

export const getStakerPointAPI = async (stakerAddress: string) => {
  try {
    const res = await axios.get(`api/tokenstaking/point/${stakerAddress}`);
    return res.data.point;
  } catch (error) {
    console.error("[getStakerPointAPI]: ", error);
    throw error;
  }
};