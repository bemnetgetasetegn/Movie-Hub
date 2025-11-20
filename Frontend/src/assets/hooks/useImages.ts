import { useQuery } from "@tanstack/react-query";
import APiClients from "../../services/apiClients";
import { Images } from "../Entities/Images";


const useImages = (movieId: number | string, lang: string = 'en') =>{ 
    const apiClients = new APiClients<Images>(`/movie/${movieId}/images`)
    return useQuery({
    queryKey: ['images', movieId],
    queryFn: () => apiClients.get({params: {
        language: lang
    }})
})}

export default useImages