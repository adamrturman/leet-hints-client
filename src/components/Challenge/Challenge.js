import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout/Layout'

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
      .catch(console.error)
  }

  render () {
    const { challenge, deleted } = this.state

    if (!challenge) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'You deleted that challenge' } }
      } />
    }

    return (
      <Layout>
        <h4>{challenge.title}</h4>
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
