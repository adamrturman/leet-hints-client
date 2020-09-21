import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout/Layout'

import apiUrl from '../../apiConfig'

import axios from 'axios'

class Comments extends Component {
  constructor (props) {
    super(props)
    // setup our initial state
    this.state = {
      // we have zero comments, until our API request has finished
      comments: []
    }
  }
  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    // make a GET request for all of the comments
    axios({
      url: `${apiUrl}/challenges/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ comments: res.data.comments }))
      .catch(console.error)
  }

  // render () {
  //   const comments = this.state.comments.map(challenge => (
  //     <li key={challenge._id}>
  //       <Link to={`/comments/${challenge._id}`}>
  //         {challenge.title}
  //       </Link>
  //     </li>
  //   ))

  render () {
    const comments = this.state.comments.map(comment => (
      <Link key={comment._id} to={`/comments/${comment._id}`}>
      </Link>
    ))

    return (
      <Layout>
        <div className='container col-sm-12'>
          <h2>Check out these comments</h2>
          {comments}
        </div>
      </Layout>
    )
  }
}

export default Comments
