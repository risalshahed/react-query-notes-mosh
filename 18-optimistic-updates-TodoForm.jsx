import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
// 15 TodoForm component
const TodoForm = () => {
  const queryClient = useQueryClient();

  const inputRef = useRef(null);

  const addTodo = useMutation({
    mutationFn: todo =>
      axios
        .post('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),

    // 18.1 onMutate is called before our mutation is executed
    // 18.1.1 remember, "variables" in react query refers to the input data we send to the server
    onMutate: newTodo => {
      // 18.3.2 create a context (which returns the previousTodos before we update the cache)
      const previousTodos = queryClient.getQueryData(['todos']);

      // 18.2 In this function, we should update the query cache right away! In stead of waiting for a response to update the cache & clear the input (in the "onSuccess" function), we do everything in "onMutate"
      queryClient.setQueryData( ['todos'], todos => [ newTodo, ...(todos) ] )
      // 18.2.1 BUT ei "newTodo" er kono ID nai, tai amra jodi newTodo add kri, taile eita backend theke pawa data er sathe milaya dekhbo "onSuccess" method a

      // clear the input field after adding a todo
      if(inputRef.current) inputRef.current.value = '';

      // 18.3.3 return the context object
      return { previousTodos }
    },
      
    onSuccess: (savedTodo, newTodo) => {
      // console.log(savedTodo);
      // 18.2.2 update todos with "setQueryData", "onMutate" theke j amra "newTodo" paai, seta eikhane "savedTodo" hishebe add krbo, ei method a kmne pabo? 2nd parameter 'newTodo' diye
      queryClient.setQueryData(['todos'], todos => todos?.map(todo => todo === newTodo ? savedTodo : todo))
    },
    // 18.3 if the request fails

    // ******* 18.3.1 context is an object we create to pass data in between our callbacks, here we need a context object that includes the previous todos before we updated the cache
    // 18.4 access the context object here
    onError: ( error, newTodo, context ) => {
      if(!context) return;
      // else set the query data to prevTodos
      queryClient.setQueryData( ['todos'], context.previousTodos )
    }
  });

  const handleSubmit = e => {
    e.preventDefault();

    if(inputRef.current && inputRef.current.value) {
      addTodo.mutate({

        id: 0,  // currently we don't have any id
        title: inputRef.current.value,
        completed: false,
        userId: 1
      })
    }
  }
  
  return (
    <div>
      {
        addTodo.error
        &&
        <div className="alert alert-danger">
          {addTodo.error.message}
        </div>
      }

      <form className="row mb-3" onSubmit={handleSubmit}>
        <div className="col">
          <input ref={inputRef} type="text" className='form-control' />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            disabled={addTodo.isLoading}
          >
            {
              addTodo.isLoading ? 'Adding...' : 'Add'
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;