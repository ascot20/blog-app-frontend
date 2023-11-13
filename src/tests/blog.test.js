import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/blog/Blog'
import userEvent from '@testing-library/user-event'

test('component renders title and author by default', () => {
  const blog = {
    title: 'Kofi is a boy',
    author: 'Daniel Otchere',
    url: 'https://example.com/test-blog',
    likes: 10,
  }
  const { getByText, queryByText } = render(<Blog blog={blog}/>)

  //check that the title and author are rendered
  expect(getByText('Kofi is a boy', { exact: false })).toBeInTheDocument()

  // Check that URL and likes are not rendered
  expect(queryByText('https://example.com/test-blog')).toBeNull()
  expect(queryByText('likes: 10')).toBeNull()

})

test('when view button is clicked', async () => {
  const blog = {
    title: 'Kofi is a boy',
    author: 'Daniel Otchere',
    url: 'https://example.com/test-blog',
    likes: 10,
    user: {
      name: 'daniel',
    }
  }

  const user = userEvent.setup()

  const { getByText, queryByText } = render(<Blog blog={blog}/>)

  // Check that URL and likes are not initially shown
  expect(queryByText('https://example.com/test-blog')).toBeNull()
  expect(queryByText('likes: 10')).toBeNull()

  //get view button and click
  const viewButton = getByText('view')
  await user.click(viewButton)

  // Check that URL and likes are now displayed
  expect(getByText('https://example.com/test-blog', { exact: false })).toBeInTheDocument()
  expect(getByText('likes: 10', { exact: false })).toBeInTheDocument()
})

test('calls the likeBlog function twice when the like button is clicked twice', async () => {
  const blog = {
    title: 'Kofi is a boy',
    author: 'Daniel Otchere',
    url: 'https://example.com/test-blog',
    likes: 10,
    user: {
      name: 'daniel',
    }
  }
  const user = userEvent.setup()
  //mock the likeBlog function
  const likeBlogMock = jest.fn()

  const { getByRole, getByText } = render(<Blog blog={blog} likeBlog={likeBlogMock}/>)

  //get view button and click to show like button
  const viewButton = getByText('view')
  await user.click(viewButton)

  //get like button and simulate clicking twice
  const likeButton = getByRole('button', { name: 'like' })
  await user.click(likeButton)
  await user.click(likeButton)

  //check if likeBlog was called twice
  expect(likeBlogMock).toHaveBeenCalledTimes(2)
})