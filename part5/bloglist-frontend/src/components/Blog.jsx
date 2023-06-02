import React from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [isBlogVisible, setIsBlogVisible] = React.useState(false)

  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5,
  }

  const blogDetailsStyles = {
    display: isBlogVisible ? '' : 'none',
    marginTop: 10,
  }

  const toggleBlogVisibility = () => {
    setIsBlogVisible((prevState) => !prevState)
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} - {blog.author}{' '}
        <button onClick={toggleBlogVisibility}>
          {isBlogVisible ? 'hide' : 'view'}
        </button>
      </p>
      <div className="blog-details" style={blogDetailsStyles}>
        <p>
          Site URL:{' '}
          <a href={blog.url} target="blank">
            {blog.url}
          </a>
        </p>

        <p>
          likes: {blog.likes} <button onClick={updateLikes}>hit like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
