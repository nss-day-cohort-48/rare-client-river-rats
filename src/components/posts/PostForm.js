import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import "./Posts.css";
import { ProfileContext } from "../auth/ProfileProvider";
import { CategoryContext } from "../categories/CategoryProvider";
import { useHistory } from "react-router-dom";

export const PostForm = () => {
  //  CONTEXT -----------------------------------------------------------------------------------------------------
  const { addPost } = useContext(PostContext);
  const { categories, getCategories } = useContext(CategoryContext);
  // STATE --------------------------------------------------------------------------------------------------------
  const [post, setPost] = useState({
    category_id: 0,
    title: "",
    publication_date: "",
    image_url: "",
    content: "",
  });

  // const { getProfile } = useContext(ProfileContext);
  // const [profile, setProfile] = useState({});
  //   const [categories, setCategories] = useState([]);
  //   const { getRareUserById } = useContext(RareUserContext);
  // VARIABLES ----------------------------------------------------------------------------------------------------
  const history = useHistory();
  const date = new Date();
  const today =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  //   const categories = [];
  // USE EFFECT ---------------------------------------------------------------------------------------------------
  useEffect(() => {
    getCategories();
  }, []);
  console.log("useEffect done");

  // --------------------------------------------------------------------------------------------------------------

  // function handling publication date
  // --------------------------------------------------------------------------------------------------------------
  //   const getToday = (post) => {
  //     const today = new Date();
  //     return post.publication_date.getDate() === today.getDate && post.publication_date.getMonth() && post.publication_date.getFullYear()
  //   }
  // --------------------------------------------------------------------------------------------------------------

  // HANDLE CONTROLLED INPUT CHANGE - used in Form to save the user's input into the newPost's fields
  // --------------------------------------------------------------------------------------------------------------
  const handleControlledInputChange = (event) => {
    const newPost = { ...post };
    newPost[event.target.id] = event.target.value;
    setPost(newPost);
  };
  // --------------------------------------------------------------------------------------------------------------
  // HANDLE CLICK SAVE POST - used in Form to add the newPost to the posts list and redirect user to PostList
  // --------------------------------------------------------------------------------------------------------------
  const handleClickSavePost = (event) => {
    event.preventDefault();
    if (post.title === "") {
      window.alert("Please title your work");
    } else if (post.content === "") {
      window.alert("Please provide some content for your post");
    } else {
      const newPost = {
        title: post.title,
        category_id: parseInt(post.category_id),
        image_url: post.image_url,
        content: post.content,
        publication_date: today,
        approved: true,
      };
      addPost(newPost).then(() => history.push("/"));
    }
  };
  // -------------------------------------------------------------------------------------------------------------

  // FORM --------------------------------------------------------------------------------------------------------
  return (
    <form className="postForm" id="postForm">
      <h2 className="postForm__header">New Post</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="category_id">
            Pick a Category for Your New Post:
          </label>
          <select
            id="category_id"
            value={post.category_id}
            htmlFor=""
            onChange={(e) => {
              handleControlledInputChange(e);
            }}
          >
            {categories.map((category) => {
              return (
                <option
                  className="postForm__categories"
                  id={category.id}
                  key={category.label}
                  value={category.id}
                >
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            id="title"
            required
            autoFocus
            className="form-control"
            placeholder="Post Title"
            value={post.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="image_url">Image:</label>
          <input
            type="url"
            id="image_url"
            required
            autoFocus
            className="form-control"
            placeholder="Image url"
            value={post.image_url}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            type="text"
            id="content"
            required
            autoFocus
            className="form-control"
            placeholder="Content"
            value={post.content}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSavePost}>
        Save Post
      </button>
    </form>
  );
};
// ----------------------------------------------------------------------------------------------------------------
