import { useQuery } from "@tanstack/react-query";
import APiClients from "../../services/apiClients";
import { Credits } from "../Entities/Credits";


const useCredits = (movieId: number | string) =>{ 
    const apiClients = new APiClients<Credits>(`/movie/${movieId}/credits`);
    return useQuery({
    queryKey: ['credits', movieId],
    queryFn: apiClients.getCredits,
    staleTime: 24 * 60 * 60 * 1000
})}

export default useCredits