import { useEffect, useState } from "react";
import apiClients from "../../services/apiClients";
import { AxiosRequestConfig, CanceledError } from "axios";


interface FetchData<T> {
    results?: T[];
    genres?: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
{
    const [data, setData] = useState<T[]>([]);
    const [errors, setErrors] = useState('');
    const [isLoading, setLoading] = useState(false);


    useEffect(()=> {
        const controller = new AbortController();

        setLoading(true);
        apiClients
        .get<FetchData<T>>(endpoint, {signal: controller.signal, ...requestConfig
            })
        .then(res => {
            if (res.data.genres) {
                setData(res.data.genres);
              } else if (res.data.results) {
                setData(res.data.results);
              } else {
                setData([]);
              }
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

    }, deps? [...deps] : [])

    return { data, errors, isLoading}
}
}

export default useData;