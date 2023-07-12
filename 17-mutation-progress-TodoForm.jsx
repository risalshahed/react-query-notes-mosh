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
      
    onSuccess: (savedTodo, newTodo) => {
      // console.log(savedTodo);
      
      queryClient.setQueryData( ['todos'], todos => [ savedTodo, ...todos ] )

      // 17.2 clear the input field after adding a todo
      if(inputRef.current) inputRef.current.value = '';
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
      {/* 16 Handle Error */}
      {
        addTodo.error
        &&
        <div className="alert alert-danger">
          {addTodo.error.message}
        </div>
      }

      {/* 15.2 add "handleSubmit" function */}
      <form className="row mb-3" onSubmit={handleSubmit}>
        <div className="col">
          {/* 15.1 get access of the value of inpur field */}
          <input ref={inputRef} type="text" className='form-control' />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            disabled={addTodo.isLoading}
          >
            {/* 17.1 dynamic button for isLoading */}
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