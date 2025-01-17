import { default as axios } from "axios"

// const apikey = process.env.NEXT_PUBLIC_REST_API_KEY
const apiUrl = "https://deserving-dog-b6247d614b.strapiapp.com/api"
// const apiUrl = "http://localhost:1337/api"
const axiosClient = axios.create({
    baseURL: apiUrl,
    // headers: {
    //     Authorization: `Bearer ${apikey}`,
    // },
})

export default axiosClient
