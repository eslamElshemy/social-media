import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useFetch } from "../../hooks/fetchData";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import moment from "moment";
import Comments from "../comments/Comments";
const Post = ({ post }) => {
  const [openComment, setOpenComments] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { data, loading, err, reFetch } = useFetch(
    "http://localhost:8800/api/likes/?postId=" + post.id
  );

  // const [l, setL] = useState(null)
  const { currentUser } = useContext(AuthContext);

  // const { isLoading, error, data } = useQuery(["likes"], () =>
  //   makeRequest.get("/likes/?postId="+ post.id ).then((res) => {
  //     return res.data;
  //   })
  // );
  const handleLike = async () => {
    if (data.includes(currentUser.id)) {
      await makeRequest.delete("/likes/?postId=" + post.id);
      reFetch();
    } else {
      await makeRequest.post("/likes", { postId: post.id });
      reFetch();
    }
  };
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (info) => {
      await makeRequest.delete("/posts/?id=" + info);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleDelete = async () => {
    // try {
    //   await makeRequest.delete("/posts/?id=" + post.id);
    // } catch (err) {
    //   console.log(err);
    // }
    mutation.mutate(post.id);
  };
  const {
    data: Cdata,
    loading: Cloading,
    err: Cerr,
    reFetch: CreFetch,
  } = useFetch("http://localhost:8800/api/comments?postId=" + post.id);
  return (
    <div className="post">
      <div className="top">
        <img
          // src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
          src={post.ProfilePic}
          alt=""
        />
        <div className="info">
          <Link to={`/profile/${post.userId}`}>
            <span className="name">{post.name}</span>
          </Link>
          <span className="time">{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="menu">
          <MoreHorizIcon onClick={() => setOpenDelete(!openDelete)} />
          {+post.userId === +currentUser.id && openDelete && (
            <DeleteForeverIcon className="deletePost" onClick={handleDelete} />
          )}
        </div>
      </div>
      <div className="text">{post.desc}</div>
      {post.img && (
        <div className="image">
          <img src={post.img} alt="" />
        </div>
      )}
      <div className="bottom">
        <div className="once">
          {data?.includes(currentUser.id) ? (
            <FavoriteIcon className="redHeart" onClick={handleLike} />
          ) : (
            <FavoriteBorderOutlinedIcon onClick={handleLike} />
          )}

          <span>{data?.length} likes</span>
        </div>
        <div className="once" onClick={() => setOpenComments(!openComment)}>
          <TextsmsOutlinedIcon />
          {Cdata && (
            <span>
              {Cdata.length > 0 && Cdata.length}
              {Cdata.length === 0
                ? " No comments yet"
                : Cdata.length === 1
                ? " Comment"
                : " Comments"}
            </span>
          )}
          {/* <span>see Comments</span> */}
        </div>
        <div className="once">
          <ShareOutlinedIcon />
          <span>Share</span>
        </div>
      </div>
      {/* <Comments postId={post.id} /> */}
      {openComment && <Comments postId={post.id} CreFetch={CreFetch} />}
    </div>
  );
};

export default Post;
