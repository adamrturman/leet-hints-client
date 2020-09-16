import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout/Layout'

import apiUrl from '../../apiConfig'

import axios from 'axios'

class Challenges extends Component {
  constructor (props) {
    super(props)
    // setup our initial state
    this.state = {
      // we have zero entries, until our API request has finished
      challenges: []
    }
  }
  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    console.log(this.props)
    // make a GET request for all of the challenges
    axios({
      url: `${apiUrl}/challenges`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ challenges: res.data.challenges }))
      .catch(console.error)
  }

  render () {
    const challenges = this.state.challenges.map(challenge => (
      <Link key={challenge._id} to={`/challenges/${challenge._id}`}>
        <challengesCards card={challenge} />
      </Link>
    ))

    return (
      <Layout>
        <div>
          <h4>Checkout out these challenges: </h4>
          <div className='container col-sm-12'>
            {challenges}
          </div>
        </div>
      </Layout>
    )
  }
}

export default Challenges
