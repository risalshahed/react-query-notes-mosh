import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService from "../services/todoService";

const useTodos = () => {
  
  // return useQuery object
  return useQuery({
    queryKey: CACHE_KEY_TODOS,
    // 20.7 we're just referencing the "getAll" method/ function, NOT CALLING IT
    
    // 20.8 debug with bind, ei "bind" call hoile, **GO TO "apiClient/js"**
    // queryFn: apiClient.getAll.bind(apiClient),

    // 20.9.1 Better approach of solving this problem (no go to 'apiClient')
    queryFn: todoService.getAll,    // 21
    staleTime: 10*1000    // 10 seconds
  })
};

export default useTodos;