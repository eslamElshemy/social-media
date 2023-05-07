import { useContext } from "react";
import "./leftbar.scss";
import { photos } from "./leftBarPhotos";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <ul className="ops1">
        <li>
          <img
            src={
              currentUser.ProfilePic
                ? currentUser.ProfilePic
                : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
            }
            alt=""
            className="userImg"
          />
          <Link to={`/profile/${currentUser.id}`}>
            <span>{currentUser.name}</span>
          </Link>
        </li>
        <li>
          <img src={photos.p1} alt="" />
          <span>Friends</span>
        </li>
        <li>
          <img src={photos.p2} alt="" />
          <span>Groups</span>
        </li>
        <li>
          <img src={photos.p3} alt="" />
          <span>Marketplace</span>
        </li>
        <li>
          <img src={photos.p4} alt="" />
          <span>Watch</span>
        </li>
        <li>
          <img src={photos.p5} alt="" />
          <span>Memories</span>
        </li>
      </ul>
      <ul>
        <span className="ulHeading">Your shortcuts</span>
        <li>
          <img src={photos.p6} alt="" />
          <span>Events</span>
        </li>
        <li>
          <img src={photos.p7} alt="" />
          <span>Gaming</span>
        </li>
        <li>
          <img src={photos.p8} alt="" />
          <span>Gallery</span>
        </li>
        <li>
          <img src={photos.p9} alt="" />
          <span>Videos</span>
        </li>
        <li>
          <img src={photos.p10} alt="" />
          <span>Messages</span>
        </li>
      </ul>

      <ul>
        <span className="ulHeading">Others</span>
        <li>
          <img src={photos.p11} alt="" />
          <span>Fundraiser</span>
        </li>
        <li>
          <img src={photos.p12} alt="" />
          <span>Tutorials</span>
        </li>
        <li>
          <img src={photos.p13} alt="" />
          <span>Courses</span>
        </li>
      </ul>
    </div>
  );
};

export default LeftBar;
