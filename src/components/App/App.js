import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Challenge from '../Challenge/Challenge'
import Challenges from '../Challenges/Challenges'
import CreateChallenge from '../CreateChallenge/CreateChallenge'
import EditChallenge from '../EditChallenge/EditChallenge'
import Header from '../Header/Header'
import Home from '../Home/Home'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/challenges' render={() => (
            <Challenges user={user} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/challenges/:id' render={({ match }) => (
            <Challenge user={user} match={match} msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/challenges/:id/edit' render={({ match }) => (
            <EditChallenge user={user} match={match} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/challenges-create' render={({ match }) => (
            <CreateChallenge user={user} match={match} msgAlert={this.msgAlert}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
