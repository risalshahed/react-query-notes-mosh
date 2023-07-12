import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePosts = query => {
  // 13.4
  const fetchPosts = ({ pageParam = 1 }) =>
  axios
    .get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        // 13.4.1
        _start: ( pageParam - 1 ) * query.pageSize,
        _limit: query.pageSize
      }
    })
    .then(res => res.data)

  return (
    // 13.1 
    useInfiniteQuery({
      queryKey: ['posts', query],
      queryFn: fetchPosts,
      staleTime: 10*1000,
      keepPreviousData: true,
      // 13.2 calculate page number in infinite query, ei function er 1st param lastpage is an array of posts, allPages is two dimensional array of posts i.e. allPages er each element hoilo array of posts
      getNextPageParam: (lastPage, allPages) => {
        // 13.3 amra page 1 a thakle, page 2 return krbe!
        // similarly, 2nd last page a thakle, last page return krbe, but ei j "1" page increment ki ajibon cholbe? obviously NAA; at some point, "lastpage" is gonna be an empty array
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      }
    })
  );
};

export default usePosts;