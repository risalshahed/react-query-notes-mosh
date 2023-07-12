import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 12.1 pass 'query' parameter
const usePosts = query => {
  const fetchPosts = () =>
  axios
    .get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        // 12.3 pass values in the query object (queryKey er array er 2nd element) to the backend
        // 12.3.1 index of our staring position
        _start: ( query.page - 1 ) * query.pageSize,
        // 12.3.2 _limit
        _limit: query.pageSize
      }
    })
    .then(res => res.data)

  return (
    useQuery({
      // 12.2 query change er sathe sathe react-query will fetch the posts from backend
      queryKey: ['posts', query],
      queryFn: fetchPosts,
      staleTime: 10*1000,
      // 12.4 previous/ next a click korle jump koira page er top a choila jaay, eita prevent krte chaile
      keepPreviousData: true
    })
  );
};

export default usePosts;