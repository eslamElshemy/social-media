import "./profileInfo.scss";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useFetch } from "../../hooks/fetchData";
import Update from "../update/Update";
import { Link } from "react-router-dom";
import Modal from "../profileModal/Modal";

const ProfileInfo = ({ userId, user, setOpenUpdate }) => {
  // const { user } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);

  // const [myFolloweds, setMyFolloweds] = useState([]);
  // useEffect(() => {
  //   const getFollowed = async () => {
  //     const res = await makeRequest.get("/users/getfolloweds");
  //     setMyFolloweds(res.data);
  //   };
  //   return () => getFollowed();
  // }, []);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/users/getfolloweds`
  );
  const {
    data: mdata,
    loading: mloading,
    error: merror,
    reFetch: mreFetch,
  } = useFetch(
    `http://localhost:8800/api/users/mutualfriends/?strangerId=${userId}`
  );
  const {
    data: rdata,
    loading: rloading,
    error: rerror,
    reFetch: rreFetch,
  } = useFetch(`http://localhost:8800/api/users/getfollowers`);
  const {
    data: fdata,
    loading: floading,
    error: ferror,
    reFetch: freFetch,
  } = useFetch(`http://localhost:8800/api/users/getmyfollowers`);
  const handleFollow = async () => {
    if (!data.includes(+userId)) {
      try {
        await makeRequest.post("/users/follow", { myFollow: userId });
        reFetch();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await makeRequest.delete("/users/follow/?myFollow=" + +userId);
        reFetch();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="profileInfo">
      {/* <Update /> */}
      {user && (
        <>
          <img
            src={
              user[0]?.ProfilePic
                ? user[0]?.ProfilePic
                : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
            }
            alt=""
          />
          <h1>{user[0]?.name}</h1>
          <div className="icons">
            <FacebookRoundedIcon />
            <InstagramIcon />
            <TwitterIcon />
            <LinkedInIcon />
            <PinterestIcon />
            <div className="sm-icon">
              <LocationOnIcon />

              <div className="country inner">
                <span style={{ marginRight: "5px" }}>{user[0]?.city}</span>
                <LanguageIcon />
              </div>
              <div className="website inner">
                <span style={{ marginRight: "5px" }}>{user[0]?.website}</span>
                <EmailOutlinedIcon />
              </div>
            </div>
          </div>
          {+currentUser.id == +userId ? (
            <button className="my-btn" onClick={() => setOpenUpdate(true)}>
              update
            </button>
          ) : (
            <button
              className={`my-btn ${
                data.includes(+userId) && "alreadyFollowed"
              }`}
              onClick={handleFollow}
            >
              {data.includes(+userId) ? "following" : "follow"}
            </button>
          )}
          {/* {+currentUser.id !== +userId && <button className="my-btn">follow</button>} */}

          {/*model*/}
          <div className="mine">
            {+currentUser.id === +userId && (
              <>
                <span
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{ cursor: "pointer" }}
                >
                  <b>{fdata && fdata.length}</b> Following
                </span>
                <Modal fdata={fdata} floading={floading} />
              </>
            )}

            {+currentUser.id === +userId && (
              <>
                <span
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropp"
                  style={{ cursor: "pointer" }}
                >
                  <b>{rdata && rdata.length}</b> Follower
                </span>
                <Modal
                  c={"staticBackdropp"}
                  fdata={rdata}
                  floading={rloading}
                  type={"follower"}
                />
              </>
            )}
          </div>
          {+currentUser.id !== +userId && (
            <>
              <span
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }}
              >
                {mdata?.length > 0 ? mdata.length : "No"}{" "}
                {mdata?.length > 1 ? "Mutual Friends" : "Mutual Friend"}
              </span>
              <Modal fdata={mdata} floading={mloading} type={"mutual"} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
