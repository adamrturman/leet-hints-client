import React from 'react'
import Card from 'react-bootstrap/Card'
import Challenge from '../Challenge/Challenge'

const ChallengesCards = ({ card }) => {
  return (
    <div className='row'>
      <div className='col-sm-8'>
        <div>
          <Card style={{ width: '18rem' }} key={Challenge._id}>
            <Card.Img variant="top" src={card.imageUrl} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default ChallengesCards
