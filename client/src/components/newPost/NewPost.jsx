import "./newPost.scss";
import { photos } from "../leftBar/leftBarPhotos";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const NewPost = () => {
  const { currentUser } = useContext(AuthContext);

  const [img, setImg] = useState(null);

  const [desc, setdesc] = useState("");

  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", img);
  //     const res = await makeRequest.post("upload", formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const { data, loading, err, reFetch } = useFetch(
  //   "http://localhost:8800/api/posts/add"
  // );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (desc) => {
      await makeRequest.post("/posts/add", desc);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleSend = async (e) => {
    e.preventDefault();
    if (img) {
      // const url = ""
      try {
        const data = new FormData()

        data.append("file", img);

        data.append("upload_preset", "upload");

        let dataImg = await axios.post(
          "https://api.cloudinary.com/v1_1/dceun4tqw/image/upload",
          data
        );

        const {url} = dataImg.data;
        mutation.mutate({ desc: desc, img: url });
      } catch (err) {
        console.log(err);
      }
    } else {
      mutation.mutate({ desc: desc});

    }
    // let imgUrl = "";
    // if (img) imgUrl = await upload();
    // try {
    //   data.append("file", img)

    //   data.append("upload_preset", "upload")

    //     let dataImg = await axios.post("https://api.cloudinary.com/v1_1/dceun4tqw/image/upload", data)

    //     const {url} = dataImg.data

    //   await axios.post("http://localhost:8800/api/posts/add", {desc, img: url}, {
    //     withCredentials: true
    //   })
    setdesc("");
    setImg(null);
    // }catch(err) {
    //   console.log(err);
    // }
  };
  return (
    <div className="newPost">
      <div className="top">
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
          placeholder={`What's your mind ${currentUser.name}?`}
          id="desc"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
        {img && (
          <img className="my-img" src={URL.createObjectURL(img)} alt="" />
        )}
      </div>
      <div className="bottom">
        <input
          type="file"
          name=""
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <div className="once">
            <img src={photos.img} alt="" />
            <span>Add Image</span>
          </div>
        </label>
        <div className="once">
          <img src={photos.map} alt="" />
          <span>Add Place</span>
        </div>
        <div className="once">
          <img src={photos.friends} alt="" />
          <span>Tag Friends</span>
        </div>
        <button onClick={handleSend}>Share</button>
      </div>
    </div>
  );
};

export default NewPost;
