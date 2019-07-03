import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Container, Card, Jumbotron, Button, CardDeck } from 'react-bootstrap'
import MethodChunkList from '../components/MethodChunkList'
import AddMethodChunk from '../components/AddMethodChunk'
import { readMethodChunks } from '../actions'

class Home extends Component {
  state = {
    methodChunks: []
  }

  componentDidMount() {
    this.props.readMethodChunks()
  }

  render() {
    let id = 1;
    return (
      <Container fluid className="pt-3">
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
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Method Chunks</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Project Characteristics</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Publish</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Find</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
          </Card>
        </CardDeck>
        <div>
          <AddMethodChunk />
          <NavLink exact to="/ok">haha</NavLink>
          <NavLink exact to={`/${id}`}>1</NavLink>
          {this.state.loading
            ? "Loading..."
            : (
              this.state.errors
                ? "error"
                : this.props.methodChunks ? <MethodChunkList methodChunks={this.props.methodChunks} /> : "empty"
            )
          }
        </div>
      </Container>
    )
  }
}
const mapStateToProps = ({ methodChunkReducer }) => ({ ...methodChunkReducer })

const mapDispatchToProps = { readMethodChunks }

export default connect(mapStateToProps, mapDispatchToProps)(Home)