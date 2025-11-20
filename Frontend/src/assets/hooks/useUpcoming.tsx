import { useInfiniteQuery } from "@tanstack/react-query";
import APiClients, { FetchData } from "../../services/apiClients";
import { Movies } from "../Entities/Movies";

const apiClients = new APiClients<Movies>("/movie/upcoming");

const useUpcoming = () => {
  return useInfiniteQuery<FetchData<Movies>>({
    queryKey: ["upcoming"],
    queryFn: ({ pageParam = 1 }) =>
      apiClients.get({
        params: {
          page: pageParam,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.total_pages ? allPage.length + 1 : undefined;
    },
  });
};

export default useUpcoming;
