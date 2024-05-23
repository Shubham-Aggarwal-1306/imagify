import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPost } from "../Actions/Post";
import Loader from "../components/Loader";
export default function Slug() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-75px)] text-center">
        {post.loading ? (
          <Loader />
        ) : post.error ? (
          <h1>{post.error}</h1>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center text-white">
            <img src={post.post?.images[0]?.url} alt="post" className="w-96 h-96 object-cover rounded-lg" />
            <h1 className="text-2xl font-bold">{post.post?.title}</h1>
            <p>{post.post?.description}</p>
            {/* Show date and Visitor Count*/}
            <div className="flex items-center justify-between w-full py-2">
              <p className="text-gray-400">{new Date(post.post?.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-400">{post.post?.visitor_count} Visitors</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
