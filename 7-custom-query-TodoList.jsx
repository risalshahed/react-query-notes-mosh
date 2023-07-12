import '../App.css'
import useTodos from '../hooks/useTodos';

const TodoList = () => {
  // 7 amra eikhane sudhu todos niyei concerned thakbo, data fetch is in "useTodos" hook
  const { data: todos, error, isLoading } = useTodos();

  if(error) return <p>{error.message}</p>;
  if(isLoading) return <p>Loading...</p>;

  return (
    <ul className='todo-list'>
      {
        todos?.map(todo =>
          <li key={todo.id}>{todo.title}</li>  
        )
      }
    </ul>
  );
};

export default TodoList;