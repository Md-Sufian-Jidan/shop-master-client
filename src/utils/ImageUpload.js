import axios from "axios";

export const imageUpload = async image => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axios.post(`${import.meta.env.VITE_IMGBB_URL}?key=${import.meta.env.VITE_IMGBB_APIKEY}`, formData);

    return data.data.display_url;
};