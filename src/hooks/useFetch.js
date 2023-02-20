import { API_KEY, BASE_URL, country } from "../constants/api";
import axios from 'axios';
import { useQuery } from 'react-query';
import dummy from '../constants/dummy.json'

export const fetchData = async (category, country = "us") => {
    // var requestOptions = {
    //     method: "GET",
    //     redirect: "follow",
    // };

    // let articles = await axios.get(`${BASE_URL}?access_key=${API_KEY}&categories=${category}&countries=${country}`,
    //     requestOptions
    // );
    // let result = await articles;
    // articles = null;
    // return result.data;
    return dummy;
};

export const UseFetchMediaStack = (category, onSuccess, onError) => {
    const { isLoading, data, isError, error, isFetching, refresh } = useQuery(
        ['news', category],
        () => fetchData(category), {
        onSuccess,
        onError,
    })
    console.log('category :>> ', category);
    return {
        isLoading, data, isError, error, isFetching, refresh,
        onSuccess,
        onError,
    }
}