import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import Post from '../post/Post';
import "../post/post.scss"

const Posts = ({userId}) => {
    let { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("posts/getAll").then((res) => {return res.data})
  );
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  if (userId) data = data?.filter((el) => {return el.userId == userId})
  return (
    <div className='my-posts'>
        {isLoading ? "loading" : data.map((post) => (
            <Post post={post} key={post.id}/>
        ))}
    </div>
  )
}

export default Posts