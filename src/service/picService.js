import { privateAxios } from './axios';

const getUserPic = async (userId) => {
  try {
    const res = await privateAxios(`user/user-pic/${userId}`, {
      responseType: 'blob',
    });
    const url = URL.createObjectURL(res.data);
    return url;
  } catch (err) {
    return null;
  }
};
const getPicFile = async (userId) => {
  try {
    const res = await privateAxios(`user/user-pic/${userId}`, {
      responseType: 'blob',
    });
    const file = new File([res.data], `user${userId}.jpg`, {
      lastModified: new Date().getTime(),
      type: res.data.type,
    });
    return [file];
  } catch (error) {
    return [];
  }
};
const picService = {
  getUserPic,
  getPicFile,
};
export default picService;
