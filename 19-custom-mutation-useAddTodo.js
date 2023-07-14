import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";

// 19.1 "onAdd" parameter is a function
const useAddTodo = onAdd => {
  const queryClient = useQueryClient();

  // const addTodo = useMutation({
  // 19.5 (After 19.4 from "TodoForm" component)
  return useMutation({
    mutationFn: todo =>
      axios
        .post('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),

    
    onMutate: newTodo => {
      const previousTodos = queryClient.getQueryData(CACHE_KEY_TODOS);    // 19.7 import constant
      
      // 19.6 initial value empty array
      queryClient.setQueryData( CACHE_KEY_TODOS, (todos = []) => [ newTodo, ...(todos) ] )

      // 19.2
      onAdd();    // we let the consumer of this hook to decide what should happen in this momment

      return { previousTodos }
    },
      
    onSuccess: (savedTodo, newTodo) => {
      // console.log(savedTodo);
      queryClient.setQueryData(CACHE_KEY_TODOS, todos => todos?.map(todo => todo === newTodo ? savedTodo : todo))
    },


    onError: ( error, newTodo, context ) => {
      if(!context) return;
      // else set the query data to prevTodos
      queryClient.setQueryData( CACHE_KEY_TODOS, context.previousTodos )
    }
  });
};

export default useAddTodo;