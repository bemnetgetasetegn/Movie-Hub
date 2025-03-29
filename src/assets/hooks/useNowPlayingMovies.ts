import { useQuery } from "@tanstack/react-query";
import APiClients from "../../services/apiClients";
import { Movies } from "../Entities/Movies";

const apiClients = new APiClients<Movies>('/movie/now_playing')

const useNowPlayingMovies = () => useQuery({
    queryKey: ['NowPlayingMovies'],
    queryFn: apiClients.get
})

export default useNowPlayingMovies