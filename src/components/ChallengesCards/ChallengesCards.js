//  This shows the list of all challenges
import React from 'react'
import Card from 'react-bootstrap/Card'
import Challenge from '../Challenge/Challenge'

//  display the challenges as individual cards with a title that opens the individual
//  challenge view
const ChallengesCards = ({ card }) => {
  return (
    <div className='row'>
      <div className='col-sm-8'>
        <div>
          <Card style={{ width: '18rem' }} key={Challenge._id}>
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
