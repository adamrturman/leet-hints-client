import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout/Layout'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import messages from '../AutoDismissAlert/messages'
//  import Comments from '../Comments/Comments'

class Challenge extends Component {
  constructor (props) {
    super(props)

    this.state = {
      challenge: null,
      deleted: false
      //  isCommented: false
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
    }

    componentDidMount () {
      axios({
        url: `${apiUrl}/challenges/${this.props.match.params.id}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
        .then(res => this.setState({ challenge: res.data.challenge }))
        .then(res => this.setState({ isCommented: true }))
        .catch(console.error)
    }

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
      .then(() => this.props.history.push('/'))
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
    // if (isCommented) {
    //   return <Redirect to={
    //     { pathname: '/challenges' }
    //   } />
    // }

    return (
      <Layout>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Title: {challenge.title}</Card.Title>
            <Card.Text>
              <p>Description: {challenge.description}</p>
              <p>Difficulty: {challenge.difficulty}</p>
              <a href={challenge.link}><p>Link to the problem</p></a>
              <p>Hint: {challenge.hint}</p>
              <p>Big O Complexity: {challenge.complexity}</p>
              <div> Comments:
                {challenge.comments.map(comment =>
                  <Card key={comment.id}>
                    <p>{comment.text}</p>
                    <Button>Edit this comment</Button>
                    <Button variant="danger">Delete this comment</Button>
                  </Card>)}
              </div>
              <p>Added by: {challenge.owner}</p>
              <Button variant="danger" onClick={this.destroy}>Delete Challenge</Button>
              <Link to={`/challenges/${this.props.match.params.id}/edit`}>
                <Button>Edit</Button>
              </Link>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Add a comment</Form.Label>
                  <Form.Control id="addComment" onChange={this.handleChange} as="textarea" rows="3" />
                </Form.Group>
                <Button type="submit">Add a comment</Button>
              </Form>
              <Link to="/challenges">
                <Button>Back to all challenges</Button>
              </Link>
            </Card.Text>
            <Button variant="primary">Reveal hints</Button>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

export default Challenge
