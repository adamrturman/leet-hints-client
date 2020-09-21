import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

function EditComment () {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleEdit = commentId => {
    console.log(commentId)
    event.preventDefault()
    const text = document.getElementById('editComment').value
    axios({
      url: `${apiUrl}/challenges/${this.props.match.params.id}/comments/${commentId}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      method: 'PATCH',
      data: {
        'comment': {
          text
        }
      }
    })
      .then(() => this.props.msgAlert({
        heading: 'Success',
        message: messages.editCommentSuccess,
        variant: 'success'
      }))
      .then(() => this.setState({ isCommented: true }))
      .catch(error => {
        this.props.msgAlert({
          heading: 'Failure' + error,
          message: messages.editCommentFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Button variant="primary" type="submit">
          Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
          <Button variant="primary" onClick={(event) => handleEdit(comment._id)}>
          Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default EditComment
