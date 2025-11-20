
import { useQuery } from "@tanstack/react-query";
import APiClients from "../../services/apiClients";
import genreStaticData from "../../data/genreStaticData";
import { Genre } from "../Entities/Genre";

const apiClients = new APiClients<Genre>('/genre/movie/list')


const useGenre = () => useQuery({
    queryKey: ['genre'],
    queryFn: apiClients.get,
    initialData: genreStaticData,
    staleTime: 24 * 60 * 60 * 1000 //24hr
})


export default useGenre