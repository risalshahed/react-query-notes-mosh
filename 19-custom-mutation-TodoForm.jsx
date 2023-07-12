import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
import useAddTodo from '../hooks/useAddTodo';

const TodoForm = () => {
  const inputRef = useRef(null);

  // 19.3 (After 19.2 from "useAddTodo" hook)
  const addTodo = useAddTodo(() => {
    // 19.4 this hook should return a "mutation" object
    // clear input field
    if(inputRef.current) inputRef.current.value = '';
  })

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