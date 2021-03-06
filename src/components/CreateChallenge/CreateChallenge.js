//  this file creates new challenges
//  this is the view when user clicks "add a new challenge"
//  it uses the ChallengeForm component
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ChallengeForm from '../shared/ChallengeForm/ChallengeForm'
import Layout from '../shared/Layout/Layout'

class CreateChallenge extends Component {
  constructor (props) {
    super(props)
    //  the initial state of the challenge will be blank and won't have an id assigned yet
    this.state = {
      challenge: {
        title: '',
        description: '',
        difficulty: '',
        link: '',
        hint: ''
      },
      createdChallengeId: null
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
      const updatedField = { [event.target.name]: event.target.value, ownerName: this.props.user.email }
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
    axios({
      url: `${apiUrl}/challenges`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      method: 'POST',
      data: { challenge: this.state.challenge }
    })
      .then(res => this.setState({ createdChallengeId: res.data.challenge._id }))
      .catch(console.error)
  }
  render () {
    const { handleChange, handleSubmit } = this
    const { createdChallengeId, challenge } = this.state
    //  redirect to the all challenges view once the challenge is created (has an id)
    if (createdChallengeId) {
      return <Redirect to={'/challenges/'} />
    }
    //  Layout on the page with the form to create a challenge
    return (
      <Layout>
        <ChallengeForm
          challenge={challenge}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </Layout>
    )
  }
}

export default CreateChallenge
