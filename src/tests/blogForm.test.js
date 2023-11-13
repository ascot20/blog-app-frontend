import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from '../components/NewBlogForm'

test('form calls event handler with right details when new blog is created', async () => {
  const newBlog = {
    title : 'Lets go',
    author: 'kwesi',
    url: 'http://me.com'
  }

  const user = userEvent.setup()
  const handleCreateNewBlogMock = jest.fn()

  const { getAllByRole, getByText } = render(<NewBlogForm handleCreateNewBlog={handleCreateNewBlogMock}/>)

  //get input elements
  const inputs = getAllByRole('textbox')
  const titleInput = inputs[0]
  const authorInput = inputs[1]
  const urlInput = inputs[2]

  //get submit button
  const saveButton = getByText('create')

  //fill form and send
  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(saveButton)

  expect(handleCreateNewBlogMock).toHaveBeenCalledWith(newBlog)
})