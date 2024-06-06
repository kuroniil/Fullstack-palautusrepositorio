import { useState } from "react";

const NewBlogForm = (props) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  if (props.test === "true") {
    const addBlog = (event) => {
      event.preventDefault();
      props.createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      });
    };
    return (
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            type="text"
            value={props.blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={props.blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={props.blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    );
  } else {
    return (
      <form onSubmit={props.handleNewBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            type="text"
            value={props.blogTitle}
            name="Title"
            onChange={({ target }) => props.setBlogTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={props.blogAuthor}
            name="Author"
            onChange={({ target }) => props.setBlogAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={props.blogUrl}
            name="Url"
            onChange={({ target }) => props.setBlogUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    );
  }
};

export default NewBlogForm;
