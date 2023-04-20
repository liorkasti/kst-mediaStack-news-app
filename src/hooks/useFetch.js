import { API_KEY, BASE_URL, country } from "../constants/api";
import axios from 'axios';
import { useQuery } from 'react-query';
import dummy from '../constants/dummy.json'
import newsKeys from '../constants/queryKeys'

export const fetchData = async (category = '', country = "us") => {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    console.log(`${BASE_URL}?access_key=${API_KEY}&categories=${category}&countries=${country}`);
    let articles = await axios.get(`${BASE_URL}?access_key=${API_KEY}&limit=100&categories=${category}&countries=${country}`,
        requestOptions
    );
    let result = await articles;
    articles = null;
    return result.data;
    // return dummy;
};

export const useFetchMediaStack = (category, onSuccess, onError) => {
    const { isLoading, data, isError, error, isFetching, refresh } = useQuery(
        [newsKeys, category],
        () => fetchData(category), {
        onSuccess,
        onError,
        staleTime: 2000,
        keepPreviousData: true,
    })
    return {
        isLoading, data, isError, error, isFetching,
        refresh, onSuccess, onError,
    }
}