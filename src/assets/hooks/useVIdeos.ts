import { useQuery } from "@tanstack/react-query";
import APiClients from "../../services/apiClients";
import { Videos } from "../Entities/Videos";


const useVideos = (movieId: string | number) => {
    const apiClients = new APiClients<Videos>(`movie/${movieId}/videos`)
    return useQuery({
    queryKey: ['videos', movieId],
    queryFn: apiClients.get,
    staleTime: 24 * 60 * 60 * 1000
})}

export default useVideos