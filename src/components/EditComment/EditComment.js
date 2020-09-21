import React, { useState } from 'react'
//  import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
//  import apiUrl from '../../apiConfig'

function EditComment () {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit your comment
      </Button>

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
              <Button variant="primary" onClick={handleClose}>
              Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
    </>
  )
}

render (<EditComment />)
