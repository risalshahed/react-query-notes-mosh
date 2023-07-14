import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePosts = () => {
  const fetchPosts = () =>
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)


  return (
    useQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts,
      staleTime: 10*1000
    })
  );
};

export default usePosts;