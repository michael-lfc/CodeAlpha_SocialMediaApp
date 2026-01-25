import CreatePost from "../features/posts/CreatePost";
import PostList from "../features/posts/PostList";

const Home = () => {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
