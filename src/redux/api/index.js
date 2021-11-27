import axios from 'axios';
import {API_KEY,API_URL} from "@env"
const url = `${API_URL}news?access_key=${API_KEY}&languages=en&countries=us`;
const API = axios.create({baseURL: url});
export const fetchPostsByCategory = (category, offset)=>
 fetchApi(`${url}&offset=${offset}&categories=${category}`, 'GET');
//     console.log(url);
//    return API.get(`&offset=${offset}&categories=${category}`);}

const fetchApi = async (url) => {
    console.log("url fetch", url);
    let params = {
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
      },
      method:"GET"
    };
    return await fetch(url, params);
  };
//   export const getArticlesByCategory = async (category) => {
//     return fetchApi(urls.getArticlesByCategory(category), 'GET');
//   };
