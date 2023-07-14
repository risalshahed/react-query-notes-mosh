import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
// 15 TodoForm component
const TodoForm = () => {
  const queryClient = useQueryClient();

  const inputRef = useRef(null);
  // 15.4 ****** declare "useMutation" function, ei function er maddhomei amra data ADD kri
  const addTodo = useMutation({
    // 15.4.1 useMutation has a mutationFn & obviously this sends post request (mutate ba data update/insert, so obviously post request)
    mutationFn: todo =>
      axios
        .post('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),
      
    // 15.7 add "onSuccess" callback
    // onSuccess, onSettled, onError
    // 15.7.1 1st parameter amra backend theke paai
    // 15.7.2 amra jei 'todo' input kore server a request pathabo, shei data ba todo server amdr k "onSuccess" er 2nd parameter a dbe
    onSuccess: (savedTodo, newTodo) => {
      // console.log(savedTodo);  // **************
      // console.log(newTodo);
      // 15.8
      // ----------------------- UPDATE the "todo_list" in UI -----------------------
      // 15.8.1 1st Approach: Invalidate the cache
      // amra react query k jodi boli cache a ja ase ta invalid kro taile react-query backend theke shob data refetch kore dbe, unfortunately it doesn't work with the json placeholder as API is fake, still ekta way te kri just to demonstrate

      // 15.8.1.1
      /* queryClient.invalidateQueries({
        queryKey: ['todos']   // doesn't work with json placeholder
      }) */

      // ******** 15.8.2 2nd Approach: UPDATE the data in the cache directly!
      // queryClient.setQueryData(queryKey, updater_function)
      // 2nd parameter return kre array of todos, eita amra IMMUTABLY UPDATE krbo
      // queryClient.setQueryData( ['todos'], todos => [...todos, savedTodo] )
      // this will append the new todo in the last element of the array! BUT we wanna add to the first element of the array
      queryClient.setQueryData( ['todos'], todos => [ savedTodo, ...todos ] )
    }
  });

  // 15.3 declare "handleSubmit" function
  const handleSubmit = e => {
    e.preventDefault();
    // check the input value in console
    // console.log(inputRef.current.value);
    
    // 15.5 jodi user "input" a kono value dey, tokhn e amra "todo" add krbo
    if(inputRef.current && inputRef.current.value) {
      // 15.6 all mutation object has a 'mutate' method for mutating data, ***** jokhn amra ei 'mutate' method ta call krbo, react-query will send our data to the backend using "mutationFn"
      addTodo.mutate({
        // 15.6.1 mutationFn a pathano "todo" object a eikhane pass krbo
        // 15.6.2 we pass a few properties as well
        id: 0,  // currently we don't have any id
        title: inputRef.current.value,
        completed: false,
        userId: 1
      })
    }
  }
  
  return (
    // 15.2 add "handleSubmit" function
    <form className="row mb-3" onSubmit={handleSubmit}>
      <div className="col">
        {/* 15.1 get access of the value of input field */}
        <input ref={inputRef} type="text" className='form-control' />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;