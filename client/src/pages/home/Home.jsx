import LeftBar from "../../components/leftBar/LeftBar";
import Navbar from "../../components/navbar/Navbar";
import NewPost from "../../components/newPost/NewPost";
// import Post from "../../components/post/Post";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightBar/RightBar";
import Stories from "../../components/stories/Stories";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="mainContent">
        <LeftBar />
        <div className="posts">
          <Stories />
          <NewPost />
          <Posts />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
