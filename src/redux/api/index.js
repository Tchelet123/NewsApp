import axios from 'axios';
const API_KEY = 'b02e06c28753af104b32a8795471476f';
const url = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&languages=en&countries=us&keyword=tenis`;
const API = axios.create({baseURL: url});
export const fetchPostsByCategory = (category, offset)=>API.get(`&offset=${offset}&categories=${category}`);


