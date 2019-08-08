import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Card, Jumbotron, Button, CardDeck } from "react-bootstrap";
import "./pages.css";

class Home extends Component {
  render() {
    return (
      <Container fluid className="pt-3 pb-5 home">
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
          <Card onClick={() => this.props.history.push("providers")}>
            <Card.Body>
              <Card.Title>Providers</Card.Title>
              <Card.Text>
                Browse through list of all registered method chunk providers to
                find more information about the company.
              </Card.Text>
              <NavLink to="#">List providers</NavLink>
            </Card.Body>
          </Card>
          <Card onClick={() => this.props.history.push("method-chunks")}>
            <Card.Body>
              <Card.Title>Method Chunks</Card.Title>
              <Card.Text>
                Browse through list of all available method chunks that can be
                selected in situational method assembly.
              </Card.Text>
              <NavLink to="#">List method chunks</NavLink>
            </Card.Body>
          </Card>
          <Card onClick={() => this.props.history.push("characteristics")}>
            <Card.Body>
              <Card.Title>Characteristics</Card.Title>
              <Card.Text>
                See list of all available characteristics that can be used to
                define project or method chunk.
              </Card.Text>
              <NavLink to="#">List characteristics</NavLink>
            </Card.Body>
          </Card>
        </CardDeck>
        <br />
        <CardDeck>
          <Card onClick={() => this.props.history.push("projects")}>
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <Card.Text>
                See list of registered projects as reference or to start getting
                method chunk recommendations.
              </Card.Text>
              <NavLink to="#">List projects</NavLink>
            </Card.Body>
          </Card>
          <Card onClick={() => this.props.history.push("publish")}>
            <Card.Body>
              <Card.Title>Publish</Card.Title>
              <Card.Text>
                Publish external method chunk enabling it to be searched and
                reused in other projects.
              </Card.Text>
              <NavLink to="#">Publish method chunk</NavLink>
            </Card.Body>
          </Card>
          <Card onClick={() => this.props.history.push("find")}>
            <Card.Body>
              <Card.Title>Find</Card.Title>
              <Card.Text>
                Find suitable method chunks according to project characteristics
                using various matching algorithm.
              </Card.Text>
              <NavLink to="#">Find method chunk</NavLink>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

export default connect()(Home);
