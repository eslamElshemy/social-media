import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useFetch } from "../../hooks/fetchData";
import "./stories.scss";
import Swal from "sweetalert2";
import { makeRequest } from "../../axios";
import axios from "axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const { data, loading, err, reFetch } = useFetch(
    "http://localhost:8800/api/stories"
  );
  const handleSend = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        let dataImg = await axios.post(
          "https://api.cloudinary.com/v1_1/dceun4tqw/image/upload",
          data
        );
        const { url } = dataImg.data;
        await makeRequest.post("/stories", {
          img: url,
        });
        reFetch()
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(data);
  let myLastStory = data?.filter((el) => {return +el.id === +currentUser.id})
console.log(myLastStory[myLastStory.length - 1]);
  return (
    <div className="wrapper">
    <div className="stories">
      <div className="story">
        <img
          src={myLastStory[0]?.img}
          alt=""
        />
        <span className="disc">{currentUser.name}</span>
        <button onClick={handleSend}>+</button>
      </div>
      {loading
        ? "loading"
        : data?.map((s) => (
            <div className="story" key={s.createdAt}>
              <img src={s.img} alt="" />
              <span className="disc">{s.name}</span>
            </div>
          ))}
    </div>
    </div>
      
  );
};

export default Stories;
