import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ comment, handleSubmit, handleChange, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Label>Title</Form.Label>
    <Form.Control
      placeholder="title"
      value={comment.title}
      name="title"
      onChange={handleChange}
    />

    <Form.Label>Text</Form.Label>
    <Form.Control
      placeholder="text"
      value={comment.text}
      name="text"
      onChange={handleChange}
    />

    <Form.Label>Difficulty</Form.Label>
    <Form.Control
      placeholder="Easy-Medium-Hard"
      value={comment.difficulty}
      name="difficulty"
      onChange={handleChange}
    />

    <Form.Label>Link</Form.Label>
    <Form.Control
      placeholder="www.leetcode.com/two-sum"
      value={comment.link}
      name="link"
      onChange={handleChange}
    />

    <Form.Label>Hint</Form.Label>
    <Form.Control
      placeholder="Try this..."
      value={comment.hint}
      name="hint"
      onChange={handleChange}
    />
    <Button type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button>Cancel</Button>
    </Link>
  </Form>
)

export default CommentForm
