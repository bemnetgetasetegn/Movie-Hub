import { useQuery } from "@tanstack/react-query";
import APiClients from "../../services/apiClients";
import { WatchMovie } from "../Entities/WatchMovie";

const useWatchMovies = (id: number | undefined) => {
    const apiClients = new APiClients<WatchMovie>(`https://vidsrc-embed.ru/embed/movie?tmbd=${id}`);

    return useQuery<WatchMovie, Error>({
        queryKey: ['watchMovie', id],
        queryFn: () => {
            if (!id) throw new Error('Movie ID is required');
            return apiClients.getMovies(); // call without parameter
        },
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!id // prevents the query from running if id is undefined
    });
};

export default useWatchMovies;
