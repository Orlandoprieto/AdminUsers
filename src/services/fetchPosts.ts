import axios from "axios";
import { URL_POSTS } from "../config/const"; 

export default async function fetchPost() {
    try {
        const response = await axios.get(URL_POSTS);
        const data = response.data
        console.log(data)

        return data
    } catch (error) {
        console.error(error)
    }
}