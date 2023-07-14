import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// npm i axios

const TodoList = () => {
  // useState & useEffect way's DATA FETCH
  /* const [todos, setTodos] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => setTodos(res.data))
      .catch(err => setError(err))
  }, []) */

  // ----------------------- react query way's DATA FETCH -----------------------
  // 4.2.2
  const fetchTodos = () =>
    // puratai (axios.get.then) actually single line, tai curly braces {} is not mandatory
    axios
    .get('https://jsonplaceholder.typicode.com/todos')
    // we don't wanna store the response rather the actual data from the backend
    .then(res => res.data)

    
    // 4.3 this query object will have several properties
    // const query = useQuery({
      
      // 4.3.2 ekhn amra sudhu "data" property niye kaj krbo
      const { data: todos } = useQuery({
        
      // 4.1 *** queryKey amdr ei SPECIFIC query k UNIQUELY identify kre, amra "todos" fetch/ query krbo, taile "todos" er array nilm
      // this unique identifier "useQuery" is used internally for caching i.e. every time we get data from backend which is saved in the cache will be accessible to us via this key

      // queryKey: [ "todos", 1, 2, {a: 1, b: 2} ],
      // ***** queryKey can take multiple things in array as following but it MUST be UNIQUE
      queryKey: ["todos"],
      // 4.2 ********* ei queryFn er body tei amra DATA FETCH kori
      /* queryFn: () =>
        axios
        .get('https://jsonplaceholder.typicode.com/todos')
        // we don't wanna store the response rather the actual data from the backend
        .then(res => res.data) */
      // 4.2.1 ei kaj amra useQuery er baireo krte pari
      queryFn: fetchTodos
    })

    // 4.3.1 check different properties of data with the help of code snippet
    // query.

  return (
    <ul>
      {
        todos.map(todo =>
          <li key={todo.id}>{todo.title}</li>  
        )
      }
      {/* 4.4. ********* react query diye data fetch korlm, luv ki hoilo????? */}
      {/*
        the benefits are:
        1. auto retires even if the server fails,
        2. auto refetch after some time
        3. V.V.I. caching, after first fetch data will be stored in the cache, so next we need the data, we can have it directly from the cache without going to the server
      */}
    </ul>
  );
};

export default TodoList;