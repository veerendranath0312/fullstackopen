const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, curr) => total + curr.likes, 0)
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((fav, curr) =>
    fav.likes < curr.likes ? curr : fav
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

/**
 * Finds the author with the most blogs in the given array of blogs.
 * @param {Array} blogs - An array of blog objects.
 * @returns {Object} An object containing the author with the most blogs and the number of blogs.
 */

const mostBlogs = (blogs) => {
  // Initialize an empty object to keep track of the number of blogs per author
  const authors = {}

  // Iterate over each blog in the blogs array
  blogs.forEach((blog) => {
    // If the author already exists in the authors object, increment their count
    // Otherwise, set their count to 1
    authors[blog.author]
      ? (authors[blog.author] += 1)
      : (authors[blog.author] = 1)
  })

  // Convert the authors object into an array of [author, count] pairs
  // Use reduce to find the author with the most blogs
  const authorWithMostBlogs = Object.entries(authors).reduce((most, curr) =>
    most[1] > curr[1] ? most : curr
  )

  // Return an object containing the author with the most blogs and the number of blogs
  return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] }
}

const mostLikes = (blogs) => {
  // Use a Map to keep track of the number of likes per author
  const authors = new Map()

  // Iterate over each blog in the blogs array
  blogs.forEach((blog) => {
    // If the author already exists in the authors map, increment their count
    // Otherwise, set their count to the blog's likes
    authors.set(blog.author, (authors.get(blog.author) || 0) + blog.likes)
  })

  // Use reduce to find the author with the most likes
  const [author, likes] = [...authors.entries()].reduce((most, curr) =>
    most[1] > curr[1] ? most : curr
  )

  // Return an object containing the author with the most likes and the number of likes
  return { author, likes }
}

console.log(mostLikes(blogs))

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
