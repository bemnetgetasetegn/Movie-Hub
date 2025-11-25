import axios, { AxiosRequestConfig } from "axios";

const READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQwNTAxZWExMzgyMmRiMjUyNzhkZGRlMDE0NmEzOSIsIm5iZiI6MTczOTc0MzMyOS4xNTY5OTk4LCJzdWIiOiI2N2IyNjA2MTQxZWE2MTA0NjI2ZGJhODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xe2nfp8aIbeLvNOj6mkummAvOVWOUmDboJeFsDh6LXw'
const apiInstance =  axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
})

const externalApiInstance = axios.create();

export interface FetchData<T> {
    results?: T[]
    genres?: T[];
    backdrops?: T[]
    total_pages?:number,
}


class APiClients<T> {
    endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    get = (config: AxiosRequestConfig) =>  {
        return apiInstance
            .get<FetchData<T>>(this.endpoint, config)
            .then(res => res.data)
    }

    getMovies = () => {
        return externalApiInstance
        .get<T>(this.endpoint)
        .then(res => res.data)

    }

    getDetails = (movieId: number | string) => {
        return apiInstance
            .get<T>(this.endpoint + '/' + movieId)
            .then(res => res.data)
    }
    
    getCredits = () => {
        return apiInstance  
                .get<T>(this.endpoint)
                .then(res => res.data)
    }
}

// I should set the url when calling the
//  APIClient class rather than creating a method for each request

export default APiClients