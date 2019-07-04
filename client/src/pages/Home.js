import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { Container, Card, Jumbotron, Button, CardDeck } from 'react-bootstrap'

class Home extends Component {


  render() {
    return (
      <Container fluid className="pt-3 pb-5">
        <Jumbotron>
          <h1>Welcome to MCRS!</h1>
          <p>Method Chunk Registry System</p>
          <p>
            <a target="_blank" href="https://github.com/audrynyonata/mcrs" rel="noopener noreferrer">
              <Button variant="primary">Learn more</Button>
            </a>
          </p>
        </Jumbotron>
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Providers</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href={`/providers`}>Go somewhere</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Method Chunks</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href={`/method-chunks`}>Go somewhere</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Project Characteristics</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href={`/characteristics`}>Go somewhere</Card.Link>
            </Card.Body>
          </Card>
        </CardDeck>
        <br />
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Publish</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href={`/publish`}>Go somewhere</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Find</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href={`/find`}>Go somewhere</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ border: 'none' }}>
          </Card>
        </CardDeck>

      </Container >
    )
  }
}


export default connect()(Home)