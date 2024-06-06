import { useState } from "react";

const Blog = ({ blog, handleLikeClick, sessionUser, handleRemoveClick }) => {
  const [showBlogInfo, setShowBlogInfo] = useState(false);
  const BlogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 200,
    border: "solid",
    borderWidth: 1,
    marginBottom: 0,
  };

  const ButtonStyle = {
    backgroundColor: "blue",
    borderRadius: "5px",
    color: "white",
  };

  if (!sessionUser) {
    sessionUser = { username: "jari" };
  }

  if (!blog.user) {
    blog.user = { username: "jari" };
  }

  const handleBlogInfoClick = () => {
    setShowBlogInfo(!showBlogInfo);
  };

  if (showBlogInfo !== true) {
    return (
      <div style={BlogStyle} className="togglableContent">
        {blog.title} {blog.author}
        <button
          onClick={() => {
            handleBlogInfoClick(blog.id);
          }}
        >
          view
        </button>
      </div>
    );
  } else if (blog.user.username === sessionUser.username) {
    return (
      <div style={BlogStyle}>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button
            onClick={() => {
              handleLikeClick(blog);
            }}
          >
            like
          </button>
        </p>
        <p>{blog.author}</p>
        <button
          onClick={() => {
            handleRemoveClick(blog.id);
          }}
          style={ButtonStyle}
        >
          remove
        </button>
        <button
          onClick={() => {
            handleBlogInfoClick(blog.id);
          }}
        >
          hide
        </button>
      </div>
    );
  } else {
    return (
      <div style={BlogStyle}>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button
            onClick={() => {
              handleLikeClick(blog);
            }}
          >
            like
          </button>
        </p>
        <p>{blog.author}</p>
        <button
          onClick={() => {
            handleBlogInfoClick(blog.id);
          }}
        >
          hide
        </button>
      </div>
    );
  }
};

export default Blog;
