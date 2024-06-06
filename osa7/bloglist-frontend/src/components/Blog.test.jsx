import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";

test("renders title", () => {
  const blog = {
    title: "test blog",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("test blog");
  expect(element).toBeDefined();
});

const blog = {
  title: "test blog",
  url: "test url",
  likes: 987,
  user: {},
};
const mockHandler = vi.fn();

test("blog info is visible after button click", async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  screen.debug();
  const div = container;
  expect(div).toHaveTextContent("test url");
  expect(div).toHaveTextContent("987");
});

test("the corresponding event handler is called twice after 2 button clicks", async () => {
  const likesMockHandler = vi.fn();
  let container;

  container = render(
    <Blog
      blog={blog}
      handleBlogInfoClick={mockHandler}
      handleLikeClick={likesMockHandler}
    />,
  ).container;

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(likesMockHandler.mock.calls).toHaveLength(2);
});

test("Form that creates a new blog calls the callback function with correct details", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<NewBlogForm createBlog={createBlog} test="true" />);

  const author = screen.getByPlaceholderText("write author here");
  const title = screen.getByPlaceholderText("write title here");
  const url = screen.getByPlaceholderText("write url here");
  const sendButton = screen.getByText("create");

  await user.type(author, "Jarmo");
  await user.type(title, "jarmoblogi");
  await user.type(url, "www.blogisivu.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls[0][0].author).toBe("Jarmo");
  expect(createBlog.mock.calls[0][0].title).toBe("jarmoblogi");
  expect(createBlog.mock.calls[0][0].url).toBe("www.blogisivu.com");
});
