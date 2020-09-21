import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout/Layout'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import messages from '../AutoDismissAlert/messages'

class Challenge extends Component {
  constructor (props) {
    super(props)

    this.state = {
      challenge: null,
      deleted: false,
      isCommented: false
    }
  }

    // Create a handleChange function that will be run anytime an input is changed
    // ex. anytime someone types in the input
    handleChange = event => {
      // ensure that the event's properties (especially event.target) are persisted,
      // i.e. not changed to null, after the handleChange function finishes running
      //
      // we need to do this, because the callback we pass to `this.setState`, will
      // not be called by React until after `handleChange` has finished running.
      event.persist()

      // use the updater callback function syntax, because our new state depends on
      // our previous state
      this.setState(prevState => {
        // create an object that will keep track of our updated field
        // ex. if the input's `name` is 'title' and its `value` was `1984`, then updated
        // field would be the object { 'title': '1984' }
        const updatedField = { [event.target.name]: event.target.value }
        // Copy the challenge properties onto the target object {}, creating a copy of `this.state.challenge`
        // Copy the updatedField onto the target object (our challenge copy)
        // return the target object as editedchallenge
        const editedChallenge = Object.assign({}, prevState.challenge, updatedField)

        // return the state change, that will be shallowly merged into `this.state`
        // in this case, we set the `challenge` state to be the new `editedchallenge`
        return { challenge: editedChallenge }
      })
    }
    //  event handler to create a comment
    handleSubmit = event => {
      event.preventDefault()
      const text = document.getElementById('addComment').value
      axios({
        url: `${apiUrl}/challenges/${this.props.match.params.id}/comments`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        method: 'POST',
        data: {
          'comment': {
            text
          }
        }
      })
        .then(() => this.props.msgAlert({
          heading: 'Success',
          message: messages.createCommentSuccess,
          variant: 'success'
        }))
        .then(() => this.setState({ isCommented: true }))
    }
    //  listener for editing a comment
    handleEdit = commentId => {
      console.log(commentId)
      event.preventDefault()
      const text = document.getElementById('editComment').value
      axios({
        url: `${apiUrl}/challenges/${this.props.match.params.id}/comments/${commentId}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        method: 'PATCH',
        data: {
          'comment': {
            text
          }
        }
      })
        .then(() => this.props.msgAlert({
          heading: 'Success',
          message: messages.editCommentSuccess,
          variant: 'success'
        }))
        .then(() => this.setState({ isCommented: true }))
        .catch(error => {
          this.props.msgAlert({
            heading: 'Failure' + error,
            message: messages.editCommentFailure,
            variant: 'danger'
          })
        })
    }
    //  event handler to delete a comment
    handleDelete = commentId => {
      event.preventDefault()
      axios({
        url: `${apiUrl}/challenges/${this.props.match.params.id}/comments/${commentId}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        method: 'DELETE'
      })
        .then(() => this.setState({ isDeleted: true }))
        .then(() => this.props.msgAlert({
          heading: 'Deleted comment',
          message: messages.deleteCommentSuccess,
          variant: 'success'
        }))
        .catch(error => {
          this.props.msgAlert({
            heading: 'Failure' + error,
            message: messages.deleteCommentFailure,
            variant: 'danger'
          })
        })
    }

    componentDidMount () {
      axios({
        url: `${apiUrl}/challenges/${this.props.match.params.id}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
        .then(res => this.setState({ challenge: res.data.challenge }))
        .catch(console.error)
    }
    //  Delete a challenge
  destroy = () => {
    axios({
      url: `${apiUrl}/challenges/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => this.props.msgAlert({
        heading: 'Deleted challenge',
        message: messages.deleteChallengeSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.props.msgAlert({
          heading: 'Failure' + error,
          message: messages.deleteChallengeFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  render () {
    const { challenge, deleted } = this.state

    if (!challenge) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/challenges' }
      } />
    }
    if (this.state.isCommented) {
      return <Redirect to={
        { pathname: '/challenges/' }
      } />
    }
    if (this.state.isDeleted) {
      return <Redirect to={
        { pathname: '/challenges' }
      } />
    }

    return (
      <Layout>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Title: {challenge.title}</Card.Title>
            <p>Description: {challenge.description}</p>
            <p>Difficulty: {challenge.difficulty}</p>
            <a href={challenge.link}><p>Link to the problem</p></a>
            <p>Hint: {challenge.hint}</p>
            <p>Big O Complexity: {challenge.complexity}</p>
            <div> Comments:
              {challenge.comments.map(comment =>
                <Card key={comment._id}>
                  <p>{comment.text}</p>
                  <Button onClick={(event) => this.handleDelete(comment._id)} variant="danger">Delete this comment</Button>
                  <Form onSubmit={this.handleEdit}>
                    <Form.Group>
                      <Form.Label>Edit this comment</Form.Label>
                      <Form.Control id="editComment" onChange={this.handleChange} as="textarea" rows="1" />
                    </Form.Group>
                    <Button onClick={(event) => this.handleEdit(comment._id)}>Submit</Button>
                  </Form>
                </Card>)}
            </div>
            <p>Added by: {challenge.ownerName}</p>
            <Button variant="danger" onClick={this.destroy}>Delete Challenge</Button>
            <Link to={`/challenges/${this.props.match.params.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Add a comment</Form.Label>
                <Form.Control id="addComment" onChange={this.handleChange} as="textarea" rows="3" />
              </Form.Group>
              <Button type="submit">Add a comment</Button>
            </Form>
            <Link to="/challenges">
              <Button>Back to all challenges</Button>
            </Link>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

export default Challenge
