import { useContext, useState } from "react";
import "./update.scss";
import axios from "axios";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from "react-router-dom";

const Update = ({openUpdate, setOpenUpdate}) => {
  const { currentUser } = useContext(AuthContext);

  const [info, setInfo] = useState({});
  const [imgs, setImgs] = useState({});
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleChangeImg = (e) => {
    setImgs((prev) => ({ ...prev, [e.target.id]: e.target.files[0] }));
  };
  const navigate = useNavigate()
  const handleSend = async () => {
    try {
      let sendingImgs = {};
      const data = new FormData();
      if (imgs.ProfilePic) {
        data.append("file", imgs.ProfilePic);
        data.append("upload_preset", "upload");
        let dataImg = await axios.post(
          "https://api.cloudinary.com/v1_1/dceun4tqw/image/upload",
          data
        );
        const { url } = dataImg.data;
        sendingImgs = { ...sendingImgs, ProfilePic: url };
      }
      if (imgs.coverPic) {
        data.append("file", imgs.coverPic);
        data.append("upload_preset", "upload");
        let dataImg = await axios.post(
          "https://api.cloudinary.com/v1_1/dceun4tqw/image/upload",
          data
        );
        const { url } = dataImg.data;
        sendingImgs = { ...sendingImgs, coverPic: url };
      }
      console.log(sendingImgs);
      const dataSending = {
        ...info,
        ProfilePic: sendingImgs.ProfilePic,
        coverPic: sendingImgs.coverPic,
      };
      console.log(dataSending);
      await makeRequest.put("/users", dataSending);
      console.log("====================================");
      console.log("updated");
      console.log("====================================");
      setOpenUpdate(false)
      localStorage.clear("user")
      await makeRequest.post("/auth/loggout");
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {openUpdate && (
        <div className="update">
          <div className="container">
            <CancelRoundedIcon className="cancel" onClick={() => setOpenUpdate(false)}/>
            <h1>Update Your Profile</h1>
            <div className="once">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Type Your New Username"
                defaultValue={currentUser.username}
                onChange={handleChange}
              />
            </div>
            <div className="once">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Type Your New Password"
                onChange={handleChange}
              />
            </div>
            <div className="once">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Type Your New Email"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="once">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Type Your New Name"
                defaultValue={currentUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="once">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                defaultValue={currentUser.city}
                placeholder="Type Your New City"
                onChange={handleChange}
              />
            </div>
            <div className="once">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                defaultValue={currentUser.website}
                placeholder="Type Your New Website"
                onChange={handleChange}
              />
            </div>
            <div className="once">
              <label className="file" htmlFor="ProfilePic">
                Profile Photo: <DriveFolderUploadRoundedIcon />
              </label>
              <input
                type="file"
                id="ProfilePic"
                placeholder="Type Your New Profile Photo"
                onChange={handleChangeImg}
                style={{ display: "none" }}
              />
            </div>
            <div className="once">
              <label className="file" htmlFor="coverPic">
                Cover Photo: <DriveFolderUploadRoundedIcon />
              </label>
              <input
                type="file"
                id="coverPic"
                placeholder="Type Your New Cover Photo"
                onChange={handleChangeImg}
                style={{ display: "none" }}
              />
            </div>
            <div className="send">
              <button className="my-btn" onClick={handleSend}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
