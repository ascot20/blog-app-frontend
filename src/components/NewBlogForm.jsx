import { useState } from 'react'

function NewBlogForm({ handleCreateNewBlog,setShowBlogForm }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnChange = (e) => {
    if (e.target.name === 'title'){
      setTitle(e.target.value)
    }
    else if (e.target.name === 'author'){
      setAuthor(e.target.value)
    }
    else{
      setUrl(e.target.value)
    }
  }

  const addNewBlog = (e) => {
    e.preventDefault()
    handleCreateNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input type="text" name="title" value={title} onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input type="text" name="author" value={author} onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input type="url" name="url" value={url} onChange={handleOnChange} />
        </div>
        <button type="submit">create</button>

      </form>
      <button onClick={() => setShowBlogForm(false)}>cancel</button>
    </div>
  )
}
export default NewBlogForm