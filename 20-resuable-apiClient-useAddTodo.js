import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import APIClient from "../services/apiClient";


// 20.10
const apiClient = new APIClient('/todos');

const useAddTodo = onAdd => {
  const queryClient = useQueryClient();

  // const addTodo = useMutation({
  return useMutation({
    // 20.11
    mutationFn: apiClient.post,
    
    onMutate: newTodo => {
      const previousTodos = queryClient.getQueryData(CACHE_KEY_TODOS);
      
      queryClient.setQueryData( CACHE_KEY_TODOS, (todos = []) => [ newTodo, ...(todos) ] )

      // we let the consumer of this hook to decide what should happen in this momment
      onAdd();

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