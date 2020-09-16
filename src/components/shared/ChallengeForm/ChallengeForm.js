import React from 'react'
import { Link } from 'react-router-dom'
//  import Form from 'react-bootstrap/Form'

const ChallengeForm = ({ challenge, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Two Sum"
      value={challenge.title}
      name="title"
      onChange={handleChange}
    />

    <label>Description</label>
    <input
      placeholder="what is the problem"
      value={challenge.author}
      name="description"
      onChange={handleChange}
    />

    <label>Difficulty</label>
    <input
      placeholder="Easy-Medium-Hard"
      value={challenge.difficulty}
      name="difficulty"
      onChange={handleChange}
    />

    <label>Link</label>
    <input
      placeholder="www.leetcode.com/two-sum"
      value={challenge.link}
      name="link"
      onChange={handleChange}
    />

    <label>Hint</label>
    <input
      placeholder="Try this..."
      value={challenge.hint}
      name="hint"
      onChange={handleChange}
    />

    <label>Big O Complexity</label>
    <input
      placeholder="O(n)"
      value={challenge.complexity}
      name="complexity"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ChallengeForm
