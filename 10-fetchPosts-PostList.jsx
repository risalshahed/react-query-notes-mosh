import '../App.css'
import usePosts from '../hooks/usePosts';

const PostList = () => {
  const { data: posts, error, isLoading } = usePosts();

  if(error) return <p>{error.message}</p>;
  if(isLoading) return <p>Loading...</p>;


  return (
    <>
      <h2>Posts</h2>
      <ul className="list">
        {
          posts?.map(post =>
            <li key={post.id}>{post.title}</li>  
          ).slice(0, 10)
        }
      </ul>
    </>
  );
};

export default PostList;