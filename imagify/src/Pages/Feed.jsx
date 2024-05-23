import React, { useState, useEffect, useRef } from "react";
import { createPost, getPosts, updatePost } from "../Actions/Post";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function Feed() {
  const dispatch = useDispatch();
  const { loading, error, allPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: formRef.current.title.value,
      description: formRef.current.description.value,
      image: document.getElementById("image-upload").files[0],
    }
    dispatch(createPost(data));
  };

  useEffect(() => {
    const imageUpload = document.getElementById("image-upload");
    imageUpload.addEventListener("change", () => {
      const image = imageUpload.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("image-box").classList.add("hidden");
        document.getElementById("image-display").classList.remove("hidden");
        document.getElementById("image-display").querySelector("img").src = reader.result;
      };
      reader.readAsDataURL(image);
    });
  }, []);

  const handleViewPost = (item) => {
    dispatch(updatePost({
      visitor_count: item.visitor_count + 1,
      id: item._id
    }));
    
  };
  return (
    <div className="flex flex-col items-center h-[calc(100vh-75px)] text-center space-y-4 p-4">
      {/* Form for Image Upload */}
      <form ref={formRef} className="flex items-center justify-center border border-gray-800 space-y-4 rounded-lg mb-4" onSubmit={handleSubmit}>
        {/* Image Box */}
        <div className="flex items-center justify-center border-r border-gray-800 rounded-lg p-4">
          <div className="flex flex-col items-center justify-center space-y-4 border border-gray-600 rounded-lg" id="image-box" style={{ width: "400px", height: "400px" }}>
            {/* Circle With Upload SVG */}
            <div className="flex items-center justify-center w-20 h-20 border border-gray-600 rounded-full" onClick={() => document.getElementById("image-upload").click()}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-600">Upload Image</p>
            <input
              type="file"
              name="image-upload"
              id="image-upload"
              className="hidden"
            />
          </div>
          <div className="relative flex flex-col items-center justify-center space-y-4 border border-gray-600 rounded-lg hidden" id="image-display" style={{ width: "400px", height: "400px" }}>
            <img src="" alt="" className="w-full h-full object-cover rounded-lg" />
            <button className="absolute top-2 right-2 text-white bg-red-500 rounded-full w-8 h-8 text-center cursor-pointer vertical-center" onClick={(e) => {
              e.preventDefault();
              document.getElementById("image-upload").value = "";
              document.getElementById("image-box").classList.remove("hidden");
              document.getElementById("image-display").classList.add("hidden");
            }}>
              X
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 p-4" style={{ width: "500px" }}>
          {/* Title */}
          <h1 className="text-2xl font-bold text-white">Create Post</h1>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-full p-4 border border-gray-800 rounded-lg"
          />
          {/* Description */}
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            className="w-full p-2 border border-gray-800 rounded-lg h-48"
          ></textarea>
          {/* Submit Button */}
          <button
            type="submit"
            className="p-2 border border-white rounded-lg w-full hover:bg-white hover:text-black"
          >
            Post
          </button>
        </div>
      </form>
      <hr className="border border-gray-800" style={{ width: "80%" }} />
      {/* Posts Cards */}
      <h1 className="text-2xl font-bold text-white">All Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1 className="text-white">{error}</h1>
      ) : (
        <>
          <div className="flex items-center justify-center p-2 flex-wrap">
            {allPosts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col items-center justify-center space-y-4 p-4 border border-gray-800 rounded-lg m-2 hover:border-white"
                onClick={() => handleViewPost(post)}
              >
                <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                <div style={{ width: "350px", height: "350px" }} className="flex items-center justify-center border border-gray-600 rounded-lg">
                  <img src={post.images[0]?.url} alt="" className="w-full h-full object-cover rounded-lg" />
                </div>
                <p className="text-gray-300 border border-gray-600 p-2 text-left vertical-top w-full rounded-lg" style={{ height: "50px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {post.description}
                </p>

                {/* Show date and Visitor Count*/}
                <div className="flex items-center justify-between w-full py-2">
                  <p className="text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-400">{post.visitor_count} Visitors</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
