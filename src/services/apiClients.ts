import axios from "axios";

const READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQwNTAxZWExMzgyMmRiMjUyNzhkZGRlMDE0NmEzOSIsIm5iZiI6MTczOTc0MzMyOS4xNTY5OTk4LCJzdWIiOiI2N2IyNjA2MTQxZWE2MTA0NjI2ZGJhODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xe2nfp8aIbeLvNOj6mkummAvOVWOUmDboJeFsDh6LXw'

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
})