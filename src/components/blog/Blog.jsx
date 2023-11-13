import { useState } from 'react'
import './blog.css'


function Blog({ blog, likeBlog, removeBlog }){
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="container">
      {showAll?
        (
          <div>
            <p>{blog.title} {blog.author}<button onClick={() => setShowAll(false)}>hide</button></p>
            <p>{blog.url}</p>
            <p>likes: {blog.likes } <button onClick={() => likeBlog(blog.id)}>like</button></p>
            <p>{blog.user.name}</p>
            <button className="removeButton" onClick={() => removeBlog(blog.id)}>remove</button>
          </div>
        ): (
          <div>
            <p>{blog.title} {blog.author}<button onClick={() => setShowAll(true)}>view</button></p>
          </div>
        )}


    </div>
  )

}


export default Blog