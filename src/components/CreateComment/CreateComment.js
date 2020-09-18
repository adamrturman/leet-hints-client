import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout/Layout'
import CommentForm from '../shared/CommentForm/CommentForm'

import apiUrl from '../../apiConfig'

import axios from 'axios'

class CreateComment extends Component {
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
    console.log('this is this', this)
    console.log('this is this.state', this.state)
    console.log('this is this.state.comments', this.state.comments)
    console.log('this is this.props', this.props)
    // make a GET request for all of the comments
    axios({
      url: `${apiUrl}/comments/${this.props.match.params.id}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ comments: res.data.comments }))
      .catch(console.error)
  }

  // render () {
  //   const comments = this.state.comments.map(comment => (
  //     <li key={comment._id}>
  //       <Link to={`/comments/${comment._id}`}>
  //         {comment.title}
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
        <CommentForm
          comment={this.state.comment}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath="/"
        />
      </Layout>
    )
  }
}

export default CreateComment
