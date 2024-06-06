const Header = (props) => {
  if (props.user === null) {
    return <h2>log in to application</h2>
  } else {
    return <h2>blogs</h2>
  }
}

export default Header