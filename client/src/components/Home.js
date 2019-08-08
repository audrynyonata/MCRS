import React, { Component } from "react";
import { connect } from "react-redux";
// import { NavLink } from 'react-router-dom'
import { Container, Card, Jumbotron, Button, CardDeck } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <Container fluid className="pt-3 pb-5">
        <Jumbotron>
          <h1>Welcome to MCRS!</h1>
          <p>Method Chunk Registry System</p>
          <p>
            <a
              target="_blank"
              href="https://github.com/audrynyonata/mcrs"
              rel="noopener noreferrer"
            >
              <Button variant="primary">Learn more</Button>
            </a>
          </p>
        </Jumbotron>
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Providers</Card.Title>
              <Card.Text>
                Browse through list of all registered method chunk providers to
                find more information about the company.
              </Card.Text>
              <Card.Link href={`/providers`}>List providers</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Method Chunks</Card.Title>
              <Card.Text>
                Browse through list of all available method chunks that can be
                selected in situational method assembly.
              </Card.Text>
              <Card.Link href={`/method-chunks`}>List method chunks</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Characteristics</Card.Title>
              <Card.Text>
                See list of all available characteristics that can be used to
                define project or method chunk.
              </Card.Text>
              <Card.Link href={`/characteristics`}>
                List characteristics
              </Card.Link>
            </Card.Body>
          </Card>
        </CardDeck>
        <br />
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Publish</Card.Title>
              <Card.Text>
                Publish external method chunk enabling it to be searched and
                reused in other projects.
              </Card.Text>
              <Card.Link href={`/publish`}>Publish method chunk</Card.Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Find</Card.Title>
              <Card.Text>
                Find suitable method chunks according to project characteristics
                using various matching algorithm.
              </Card.Text>
              <Card.Link href={`/find`}>Find method chunk</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ border: "none" }} />
        </CardDeck>
      </Container>
    );
  }
}

export default connect()(Home);
