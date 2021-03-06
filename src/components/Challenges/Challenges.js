import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout/Layout'
import ChallengesCards from '../ChallengesCards/ChallengesCards'

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
  //  map each challenge from "challenges" and inject each one into a ChallengesCard
  //  wrapped in a link that contains that challenge's id
  render () {
    const challenges = this.state.challenges.map(challenge => (
      <Link key={challenge._id} to={`/challenges/${challenge._id}`}>
        <ChallengesCards card={challenge} />
      </Link>
    ))
    //  layout on the page with the most recent challenge showing first
    return (
      <Layout>
        <div className='container col-sm-12'>
          <h2>Check out these challenges</h2>
          {challenges.reverse()}
        </div>
      </Layout>
    )
  }
}

export default Challenges
