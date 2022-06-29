const dummy = () => {
  //...
  return 1
}

const totalLikes = blogs => {
  const totalLikesSum = blogs.reduce(
    (sum, currentBlog) => sum + currentBlog.likes,
    0
  )

  console.log(totalLikesSum)
  return totalLikesSum
}

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const max = Math.max(...likes)

  const maxLikesIndex = likes.indexOf(max)
  const favorite = blogs[maxLikesIndex]

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = blogs => {
  // 1. map unique elements
  const uniqueElements = blogs.reduce((initial, blog) => {
    initial[blog.author] = initial[blog.author] ? initial[blog.author] + 1 : 1
    return initial
  }, {})

  // 2. convert object into entries (array of arrays)
  const arrayOfArrays = Object.entries(uniqueElements)

  const frequentAuthor = arrayOfArrays.reduce(
    (initial, element) => {
      return element[1] >= initial[1] ? element : initial
    },
    [null, 0]
  )

  console.log(frequentAuthor)

  return {
    author: frequentAuthor[0],
    blogs: frequentAuthor[1]
  }
}

const mostLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const max = Math.max(...likes)

  const maxLikesIndex = likes.indexOf(max)
  const favorite = blogs[maxLikesIndex]

  return {
    author: favorite.author,
    likes: favorite.likes
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
