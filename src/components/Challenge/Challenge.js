import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout/Layout'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import messages from '../AutoDismissAlert/messages'
//  import Comments from '../Comments/Comments'

class Challenge extends Component {
  constructor (props) {
    super(props)

    this.state = {
      challenge: null,
      deleted: false
    }
  }

  componentDidMount () {
    console.log('this is this.props', this.props)
    axios({
      url: `${apiUrl}/challenges/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ challenge: res.data.challenge }))
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
              <p>Comments: {challenge.comments.map(comment => comment.title)}</p>
              <p>{challenge.comments.map(comment => comment.text)}</p>
              <p>Added by: {challenge.owner}</p>
              <Button variant="danger" onClick={this.destroy}>Delete Challenge</Button>
              <Link to={`/challenges/${this.props.match.params.id}/edit`}>
                <Button>Edit</Button>
              </Link>
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
