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
        .post('https://jsonplaceholder.typicode.com/todosx', todo)
        .then(res => res.data),
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData( ['todos'], todos => [ savedTodo, ...todos ] )
    }
  });

  // 15.3 declare "handleSubmit" function
  const handleSubmit = e => {
    e.preventDefault();

    // 15.6 jodi user "input" a kono value dey, tokhn e amra "todo" add krbo
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
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;