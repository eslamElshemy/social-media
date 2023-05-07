import { useFetch } from "../../hooks/fetchData";
import "./rightBar.scss";
import {Link} from "react-router-dom"
import { makeRequest } from "../../axios";
import { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const RightBar = () => {
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/users/rl`
  );
  const [myFolloweds, setMyFolloweds] = useState([])
  useEffect(()=> {
    const getFollowed = async() => {
      const res = await makeRequest.get("/users/getfolloweds")
      setMyFolloweds(res.data)
    }
    return () => getFollowed()
  }, [data])
  const queryClient = useQueryClient();
  
  const mutation = useMutation(
    async (id) => {
      await makeRequest.post("/users/follow", {myFollow: id})
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
    );
    const handleFollow = async (id) => {
      mutation.mutate(id)
      reFetch()
      // try {
      //   await makeRequest.post("/users/follow", {myFollow: id})
      // }catch(err) {
      //   console.log(err);
      // }
    }
  return (
    <div className="rightBar">
      <div className="right-container">
        <div className="suggestions r-piece">
          <span className="title">Suggestions For You</span>
          <div className="content">
            {loading
              ? "loading"
              : data?.map((el) => (
                  <div className="once" style={{display: myFolloweds.includes(el.id) &&  "none"}}>
                    <img src={el.ProfilePic} alt="" />
                    <Link to={`/profile/${el.id}`}>
                      <span>{el.name}</span>
                    </Link>
                    <button className="follow" onClick={() => handleFollow(el.id)}>follow</button>
                    {/* <button className={`follow ${myFolloweds.includes(el.id) && "alreadyFollowed"}`}>{myFolloweds.includes(el.id) ? "following":"follow"}</button> */}
                    <button className="dismiss">dismiss</button>
                  </div>
                ))}
          </div>
        </div>
        <div className="activities r-piece">
          <div className="title">Latest Activities</div>
          <div className="content">
            <div className="once">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span className="subject">
                <b>Jane Doe</b>changed their cover picture
              </span>
              <span className="time">1 min ago</span>
            </div>
            <div className="once">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span className="subject">
                <b>Jane Doe</b>changed their cover picture
              </span>
              <span className="time">1 min ago</span>
            </div>
            <div className="once">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span className="subject">
                <b>Jane Doe</b>changed their cover picture
              </span>
              <span className="time">1 min ago</span>
            </div>
            <div className="once">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span className="subject">
                <b>Jane Doe</b>changed their cover picture
              </span>
              <span className="time">1 min ago</span>
            </div>
          </div>
        </div>
        <div className="online r-piece">
          <span className="title">Online Friends</span>
          <div className="content">
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
            <div className="piece">
              <div className="image">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </div>
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
