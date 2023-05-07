import "../post/post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useFetch } from "../../hooks/fetchData";

const MyPost = ({user}) => {
  const [openComment, setOpenComments] = useState(false);
//   const { el } = useContext(AuthContext);
//   const { data, loading, err, reFetch } = useFetch(
//     "http://localhost:8800/api/posts/getAll"
//   );

  return (
    <div className="my-posts">
      {user
        
        && user
            .sort((a, b) => b.id - a.id)
            .map((el) => (
              <div className="post" key={el.id}>
                <div className="top">
                  <img
                    // src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    src={el.ProfilePic}
                    alt=""
                  />
                  <div className="info">
                    {/* <Link to={`/profile/${el.userId}`}> */}
                      <span className="name">{el.name}</span>
                    {/* </Link> */}
                    <span className="time">
                      {new Date().getTime() - new Date(el.createdAt).getTime()}
                    </span>
                  </div>
                  <MoreHorizIcon />
                </div>
                <div className="text">{el.desc}</div>
                {el.img && (
                  <div className="image">
                    <img src={el.img} alt="" />
                  </div>
                )}
                <div className="bottom">
                  <div className="once">
                    <FavoriteBorderOutlinedIcon />
                    <span>12 Likes</span>
                  </div>
                  <div
                    className="once"
                    onClick={() => setOpenComments(!openComment)}
                  >
                    <TextsmsOutlinedIcon />
                    <span>12 Comments</span>
                  </div>
                  <div className="once">
                    <ShareOutlinedIcon />
                    <span>Share</span>
                  </div>
                </div>
                {openComment && (
                  <>
                    <div className="addComment">
                      <img
                        src={
                          el.ProfilePic
                            ? el.ProfilePic
                            : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
                        }
                        alt=""
                      />
                      <input type="text" placeholder="write a comment" />
                      <button className="my-btn">Send</button>
                    </div>
                    <div className="comment">
                      <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                      />
                      <div className="content">
                        <span className="name">Join Doe</span>
                        <span className="text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Autem
                          nequeaspernatur ullam aperiam
                        </span>
                      </div>
                      <span className="time">1 hour ago</span>
                    </div>
                    <div className="comment">
                      <img
                        src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                      />
                      <div className="content">
                        <span className="name">Jain Doe</span>
                        <span className="text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Autem nequeaspernatur ullam aperiam
                        </span>
                      </div>
                      <span className="time">1 hour ago</span>
                    </div>
                  </>
                )}
              </div>
            ))}
    </div>
  );
};

export default MyPost;
