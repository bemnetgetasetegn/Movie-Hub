
import { useQuery } from "@tanstack/react-query";
import APiClients from "../../services/apiClients";
import genreStaticData from "../../data/genreStaticData";

const apiClients = new APiClients<Genre>('/genre/movie/list')


export interface Genre {
    id: number
    name: string
}

const useGenre = () => useQuery({
    queryKey: ['genre'],
    queryFn: apiClients.get,
    initialData: genreStaticData,
    staleTime: 24 * 60 * 60 * 1000 //24hr
})


export default useGenre