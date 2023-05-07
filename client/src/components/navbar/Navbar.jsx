import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import { DarkContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  const {dispatch, dark} = useContext(DarkContext)
  const {currentUser} = useContext(AuthContext)

  const navigate = useNavigate()
  const handleLogout = async() => {
    localStorage.clear("user")
      await makeRequest.post("/auth/loggout");
      navigate("/login")
  }
  const handleDark = () => {
    dispatch({type: "TOGGLE"})
  }
  return (
    <div className="navBar">
      <Link to="/">
      <h1>eslamsocial</h1>
      </Link>
      <HomeOutlinedIcon />
      {!dark && <DarkModeOutlinedIcon onClick={handleDark}/>}
      {dark && <WbSunnyOutlinedIcon onClick={handleDark}/>}
      <GridViewOutlinedIcon />
      <div className="input">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="right">
        <LogoutIcon onClick={handleLogout} style={{cursor: "pointer"}}/>
        {/* <PersonOutlinedIcon onClick={handleLogout}/> */}
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={currentUser.ProfilePic ? currentUser.ProfilePic : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
