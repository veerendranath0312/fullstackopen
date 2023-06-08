import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blogDetails, setBlogDetails] = React.useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogDetails = (event) => {
    setBlogDetails((prevBlogDetails) => {
      return {
        ...prevBlogDetails,
        [event.target.name]: event.target.value,
      }
    })
  }

  const saveBlog = (event) => {
    event.preventDefault()
    createBlog(blogDetails)

    setBlogDetails({ title: '', author: '', url: '' })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={saveBlog}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={blogDetails.title}
            onChange={handleBlogDetails}
          />
        </div>
        <br />
        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            name="author"
            id="author"
            value={blogDetails.author}
            onChange={handleBlogDetails}
          />
        </div>
        <br />
        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            name="url"
            id="url"
            value={blogDetails.url}
            onChange={handleBlogDetails}
          />
        </div>
        <br />
        <button className="btn">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
