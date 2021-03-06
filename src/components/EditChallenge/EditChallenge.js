//  this file lets us edit the fields for an existing challenge
//  it uses the same form that was used to create a challenge
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ChallengeForm from '../shared/ChallengeForm/ChallengeForm'
import Layout from '../shared/Layout/Layout'
import messages from '../AutoDismissAlert/messages'

class EditChallenge extends Component {
  constructor (props) {
    super(props)
    //  the intial state will have "updated" set to false
    //  we will later "toggle" this to be true
    this.state = {
      challenge: {
        title: '',
        description: '',
        difficulty: '',
        link: '',
        hint: ''
      },
      updated: false
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
  //  function to handle the submission of the form
  //  it will change the state of "updated" to true and render the appropriate messaging
  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/challenges/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      method: 'PATCH',
      data: { challenge: this.state.challenge }
    })
      .then(res => this.setState({ updated: true }))
      .then(() => this.props.msgAlert({
        heading: 'Edit Success',
        message: messages.editChallengeSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.props.msgAlert({
          heading: 'Failure' + error,
          message: messages.editChallengeFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }
  render () {
    const { handleChange, handleSubmit } = this
    const { updated, challenge } = this.state
    //  redirect to all challenges view when the challenge is successfully updated
    if (updated) {
      return <Redirect to={'/challenges/'} />
    }
    //  Layout on the page
    return (
      <Layout>
        <ChallengeForm
          challenge={challenge}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/challenges"
        />
      </Layout>
    )
  }
}

export default EditChallenge
