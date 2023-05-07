import React from "react";
import "../post/post.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/fetchData";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Comments = ({ postId, CreFetch }) => {
  const { currentUser } = useContext(AuthContext);

  // const { isLoading, error, data } = useQuery(["comments"], () =>
  //   makeRequest.get("/comments?postId=" + postId).then((res) =>{ return res.data})
  // );
  const { data, loading, err, reFetch } = useFetch(
    "http://localhost:8800/api/comments?postId=" + postId
  );
  const [desc, setdesc] = useState("");
  // const queryClient = useQueryClient();

  // const mutation = useMutation(
  //    (info) => {
  //    return makeRequest.post("/comments", info);
  //   },
  //   {
  //     onSuccess: () => {
  // Invalidate and refetch
  //       queryClient.invalidateQueries(["comments"]);
  //     },
  //   }
  // );
  const handleSend = async () => {
    // mutation.mutate({ desc, postId });
    try {
      await makeRequest.post("/comments", { desc, postId });
      setdesc("");
      reFetch();
      CreFetch();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await makeRequest.delete("/comments/?id=" + id);
      reFetch();
      CreFetch();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="addComment">
        <img
          src={
            currentUser.ProfilePic
              ? currentUser.ProfilePic
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
          }
          alt=""
        />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
        <button className="my-btn" onClick={() => handleSend()}>
          Send
        </button>
      </div>
      {loading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.ProfilePic} alt="" />
              <div className="content">
                <Link to={`/profile/${comment.userId}`}>
                <span className="name">{comment.name}</span>
                </Link>
                <span className="text">{comment.desc}</span>
              </div>
              <span className="time">
                {moment(comment.createdAt).fromNow()}
              </span>
              {+comment.userId === +currentUser.id && (
                <DeleteForeverIcon
                  className="deletePost"
                  onClick={() => handleDelete(comment.id)}
                />
              )}
            </div>
          ))}
    </>
  );
};

export default Comments;
