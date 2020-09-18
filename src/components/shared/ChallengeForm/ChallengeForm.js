import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChallengeForm = ({ challenge, handleSubmit, handleChange, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Label>Title</Form.Label>
    <Form.Control
      placeholder="Two Sum"
      value={challenge.title}
      name="title"
      onChange={handleChange}
    />

    <Form.Label>Description</Form.Label>
    <Form.Control
      placeholder="what is the problem"
      value={challenge.author}
      name="description"
      onChange={handleChange}
    />

    <Form.Label>Difficulty</Form.Label>
    <Form.Control
      placeholder="Easy-Medium-Hard"
      value={challenge.difficulty}
      name="difficulty"
      onChange={handleChange}
    />

    <Form.Label>Link</Form.Label>
    <Form.Control
      placeholder="www.leetcode.com/two-sum"
      value={challenge.link}
      name="link"
      onChange={handleChange}
    />

    <Form.Label>Hint</Form.Label>
    <Form.Control
      placeholder="Try this..."
      value={challenge.hint}
      name="hint"
      onChange={handleChange}
    />
    <Form.Group controlId="complexity" onChange={handleChange} value={challenge.complexity}>
      <Form.Label>Select Big O Complexity: </Form.Label>
      <Form.Control as="select" custom name="complexity" value={challenge.complexity}>
        <option value="Constant">O(1)</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Form.Control>
    </Form.Group>

    <Form.Label>Big O Complexity</Form.Label>
    <Form.Control
      placeholder="O(n)"
      value={challenge.complexity}
      name="complexity"
      onChange={handleChange}
    />
    <Button type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button>Cancel</Button>
    </Link>
  </Form>
)

export default ChallengeForm
