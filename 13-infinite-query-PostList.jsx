// import '../App.css'
import usePosts from '../hooks/usePosts';

const PostList = () => {
  const pageSize = 10;
  // 13.1 infinite query te kono page er track record i.e. state thakbe na
  // const [page, setPage] = useState(1);

  // 13.2.1 infinite query has fetchNextPage object
  const { data: posts, error, isLoading, fetchNextPage, isFetchingNextPage } = usePosts({ pageSize });

  if(error) return <p>{error.message}</p>;
  if(isLoading) return <p>Loading...</p>;

  // console.log(posts.map(post => post.id));

  return (
    <>
      <h2>Posts</h2>
      <ul className="list-group">
        {
          // 13.5 'posts' is no longer array rather its an instance of infinite data
          // 13.5.1 check
          // posts.
          // 13.6
          posts?.pages.map((page, index) =>
            // 13.6.1 'page' is an array so we can't use "page" as key, so we take the 2nd parameter 'index'
            <div key={index}>
              {
                page.map(post =>
                  <li
                    key={post.id}
                    className='list-group-item'
                    style={{backgroundColor: post.id % 2 === 0 && '#eee'}}
                  >
                    {post.title}
                  </li>
                )
              }
            </div>
          )
          /* posts.map(post =>
            <li
              key={post.id}
              className='list-group-item'
              style={{backgroundColor: post.id % 2 === 0 && '#eee'}}
            >
              {post.title}
            </li>
          ) */
        }
      </ul>

      <button
        className="btn btn-primary my-5 ms-2"
        // 13.3 disable button
        disabled={isFetchingNextPage}
        // 13.2.2
        onClick={() => fetchNextPage()}
      >
        {/* 13.2 */}
        {/* Load More */}
        {/* 13.4 */}
        { isFetchingNextPage ? 'Loading...' : 'Load More' }
      </button>
    </>
  );
};

export default PostList;