import { useState } from 'react';
import '../App.css'
import usePosts from '../hooks/usePosts';

const PostList = () => {
  // 11.2 filter krte state nissi userId er
  const [userId, setUserId] = useState();

  // 11.3 *****FILTER to filter, usePosts er parameter thakte hbe, jei parameter diye filter kra hbe, so include "userId" as argument, also include the parameter inside the "usePosts" hook file
  const { data: posts, error, isLoading } = usePosts(userId);

  if(error) return <p>{error.message}</p>;
  if(isLoading) return <p>Loading...</p>;

  console.log(posts.map(post => post.id));

  return (
    <>
      <h2>Posts</h2>
      {/* 11.1 select option to portray different users */}
      <select
        // 11.3 option change howar sathe userId er value change kore set krbo
        onChange={e => setUserId( parseInt(e.target.value) )} // convert string to number
        value={userId}
        className="form-select mb-3"
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
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
    </>
  );
};

export default PostList;