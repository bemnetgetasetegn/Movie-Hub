import { useEffect, useState } from "react";
import apiClients from "../../services/apiClients";
import { CanceledError } from "axios";
import { Genre } from "./useGenre";


interface FetchData<T> {
    page: number
    results: T[];
}

interface FetchGenreData {
    genres: Genre[]
}

const useData = <T>(endpoint: string) => {
{
    const [data, setData] = useState<Genre[]>([]);
    const [errors, setErrors] = useState('');
    const [isLoading, setLoading] = useState(false);


    useEffect(()=> {
        const controller = new AbortController();

        setLoading(true);
        apiClients
        .get<FetchGenreData>(endpoint, {signal: controller.signal})
        .then(res => {
            setData(res.data.genres)
            setLoading(false);
        })
        .catch(err => {
            if(err instanceof CanceledError) return
            setErrors(err.message)
            setLoading(false);
        })
        return () => {
            controller.abort();
          };

    }, [])

    return { data, errors, isLoading}
}
}

export default useData;