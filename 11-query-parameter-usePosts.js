import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 11.1 add "userId" as parameter
const usePosts = userId => {
  const fetchPosts = () =>
  axios
    // 11.4 url er seshe filter er jnno userId pathai
    // .get('https://jsonplaceholder.typicode.com/posts?userId=1')
    // aah this is the ugly way of sending, let's have a smarter approach
    .get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        // all the query string parameters
        userId
      }
    })
    .then(res => res.data)

  return (
    useQuery({
      // 11.2 ***** jehetu amra FILTER er maddhome hierarchical data passi, tai amra amdr queryKey hierachically nibo, ekhn URL ta kmn hoy 1ta specific user er post er khetre???? it's like: users/3/posts i.e. the generic form: users/userId/posts, now, set out queryKey following this hierarchy
      // queryKey: ['users', userId, 'posts'],

      // 11.5 kono user select na krle empty hoye jaay! but we should display all posts
      queryKey: userId ? ['users', userId, 'posts'] : ['posts'],

      // 11.3 ****** here, userId is the "parameter" of this query, every time the value of userId changes, react query will fetch the post for that user from the backend, i.e. 'userId' is like the "dependecy_array" of useEffect hook
      queryFn: fetchPosts,
      staleTime: 10*1000
    })
  );
};

export default usePosts;