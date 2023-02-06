import { API_KEY, BASE_URL, country } from "../constants/api";
import axios from 'axios';
import { useQuery } from 'react-query';

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

export const useFetchMediaStack = (category = "general", country = "us", onSuccess, onError) => {    
    const res = useQuery(['result',category], fetchData)
    console.log('object :>> ', res);
    console.log('object :>> ', category);
    return (
        useQuery('article', fetchData, {
            onSuccess,
            onError,
            select: (data) => {
                console.log('data :>> ', data);
                const media = data.map((article) => article)
                return media;
            },
        })
    )
}