import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// 7 useTodos hook
const useTodos = () => {
  // ----------------------- react query way's DATA FETCH -----------------------
  const fetchTodos = () =>
    // puratai actually single line, tai curly braces {} is not mandatory
    axios
    .get('https://jsonplaceholder.typicode.com/todos')
    // we don't wanna store the response rather the actual data from the backend
    .then(res => res.data)

  // return useQuery object
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos
  })
};

export default useTodos;