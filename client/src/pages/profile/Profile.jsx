import "./Profile.scss";
import LeftBar from "../../components/leftBar/LeftBar";
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";
import RightBar from "../../components/rightBar/RightBar";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/fetchData";
import MyPost from "../../components/profilePosts/ProfilePosts";
import Posts from "../../components/posts/Posts";
import NewPost from "../../components/newPost/NewPost";
import Update from "../../components/update/Update";
const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const postUserId = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/users/?id=${postUserId}`
  );
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <div className="profile">
      <Navbar />
      <Update openUpdate={openUpdate} setOpenUpdate={setOpenUpdate}/>
      <div className="mainContent">
        <LeftBar />
        <div className="profileContent">
          {loading
            ? "loading please wait"
            : data && (
                <>
                  <img
                    src={
                      data[0]?.coverPic
                        ? data[0].coverPic
                        : "https://t3.ftcdn.net/jpg/02/96/05/52/360_F_296055218_RXc721N9fSYIz3sEV7QALYquMVP31jdJ.jpg"
                    }
                    alt=""
                  />
                  <ProfileInfo userId={postUserId} user={data} setOpenUpdate={setOpenUpdate}/>
                    {/* {+currentUser.id === +postUserId && <NewPost />} */}
                  <Posts userId={postUserId} />
                  {/* <MyPost user={data}/> */}
                </>
              )}
        </div>
        <RightBar />
      {/* <Update openUpdate={openUpdate} setOpenUpdate={setOpenUpdate}/> */}
      </div>
    </div>
  );
};

export default Profile;
