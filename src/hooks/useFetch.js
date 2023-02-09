import { API_KEY, BASE_URL } from "../constants/api";
import axios from 'axios';

export const fetchData = async (category = "general", country = "us") => {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    let articles = await axios.get(`${BASE_URL}?access_key=${API_KEY}&categories=${category}&countries=${country}`,
        requestOptions
    );
    let result = await articles;
    articles = null;
    return result.data;
};