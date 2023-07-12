import { useState } from 'react';
import '../App.css'
import usePosts from '../hooks/usePosts';

const PostList = () => {
  // 12.1 pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);

  // 12.2 A query object is an object that contains all the values while querying a set of object
  const { data: posts, error, isLoading } = usePosts({ page, pageSize });

  if(error) return <p>{error.message}</p>;
  if(isLoading) return <p>Loading...</p>;

  console.log(posts.map(post => post.id));

  return (
    <>
      <h2>Posts</h2>
      <ul className="list-group">
        {
          posts?.map(post =>
            <li
              key={post.id}
              className='list-group-item'
              style={{backgroundColor: post.id % 2 === 0 && '#eee'}}
            >
              {post.title}
            </li>
          )
          // .slice(0, 10)
        }
      </ul>
      {/* 12.3 Navigation Buttons */}
      <button
        disabled={page===1}   // disabled in 1st page
        className="btn btn-primary my-5 ms-2"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <button
        // unfortunately, json placeholder doesn't provide anything to understand whether we are on the last page, tai last page a btn disable kra gelo na
        className="btn btn-primary my-5 ms-2"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostList;