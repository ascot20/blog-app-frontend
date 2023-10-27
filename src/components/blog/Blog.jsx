import { useState } from "react"
import './blog.css'

const Blog = ({ blog}) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="blog">
      {showAll? 
      (
        <div>
          <p>{blog.title} {blog.author}<button onClick={()=>setShowAll(false)}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes: {blog.likes}</p>
          <p>{blog.user.name}</p>
        </div>
      ): (
        <div>
          <p>{blog.title} {blog.author}<button onClick={()=>setShowAll(true)}>view</button></p>
        </div>
      )}
      
      
    </div>
  )

}


export default Blog