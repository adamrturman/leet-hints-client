import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout/Layout'
import messages from '../AutoDismissAlert/messages'

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
        <h4>Title: {challenge.title}</h4>
        <p>Description: {challenge.description}</p>
        <p>Difficulty: {challenge.difficulty}</p>
        <a href={challenge.link}><p>Link to the problem</p></a>
        <p>Hint: {challenge.hint}</p>
        <p>Big O Complexity: {challenge.complexity}</p>
        <p>Comments: {challenge.comments}</p>
        <button onClick={this.destroy}>Delete Challenge</button>
        <Link to={`/challenges/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/challenges">Back to all challenges</Link>
      </Layout>
    )
  }
}

export default Challenge
