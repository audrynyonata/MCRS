import React, { Component } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
// import MethodChunkList from "../components/MethodChunkList";
// import AddMethodChunk from "../components/AddMethodChunk";
import { readCharacteristics } from "../actions";

import "./Find.css";

export const ORGANISATIONAL = "organisational";
export const HUMAN = "human";
export const APPLICATION_DOMAIN = "application-domain";
export const DEVELOPMENT_STRATEGY = "development-strategy";

const CharacteristicRow = props => (
  <Form.Row>
    <Form.Group as={Col} controlId="formChar1">
      <Form.Label>Characteristic Name</Form.Label>
      <Form.Control placeholder="Characteristic #1" />
    </Form.Group>

    <Form.Group as={Col} controlId="formOptimal1">
      <Form.Label>Type</Form.Label>
      <Form.Control as="select">
        <option>Choose...</option>
        <option>Ordinal</option>
        <option>Nominal</option>
        <option>Numerical</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formOptimal1">
      <Form.Label>Optimal Sense</Form.Label>
      <Form.Control as="select">
        <option>Choose...</option>
        <option>maximum</option>
        <option>minimum</option>
      </Form.Control>
    </Form.Group>
  </Form.Row>
);
const CharacteristicCard = props => (
  <Col xs={6} sm={12} md={4} className="mb-3 px-2">
    <Card
      className={
        "characteristic-card shadow-sm d-flex justify-content-end text-center " +
        (props.checked && "checked")
      }
      onClick={props.onClick}
    >
      <p>{props.characteristic.name}</p>
    </Card>
  </Col>
);

class Find extends Component {
  state = {};

  componentDidMount() {
    this.props.readCharacteristics();
  }

  render() {
    console.log("props", this.props);
    return (
      <Container fluid className="find">
        <Row>
          <Col xs={12} sm={6} lg={5} className="column-left">
            <h5 className="pt-3">Characteristics</h5>
            <p>Organisational</p>
            <Row className="mb-4">
              {this.props.characteristics
                .filter(e => e.dimension === ORGANISATIONAL)
                .map((c, idx) => (
                  <CharacteristicCard
                    checked
                    key={idx}
                    characteristic={c}
                    onClick={() => this.setState({ c })}
                  />
                ))}
            </Row>
            <p>Human</p>
            <Row className="mb-4">
              {this.props.characteristics
                .filter(e => e.dimension === HUMAN)
                .map((c, idx) => (
                  <CharacteristicCard key={idx} characteristic={c} />
                ))}
            </Row>
            <p>Application Domain</p>
            <Row className="mb-4">
              {this.props.characteristics
                .filter(e => e.dimension === APPLICATION_DOMAIN)
                .map((c, idx) => (
                  <CharacteristicCard key={idx} characteristic={c} />
                ))}
            </Row>
            <p>Development Strategy</p>
            <Row className="mb-4">
              {this.props.characteristics
                .filter(e => e.dimension === DEVELOPMENT_STRATEGY)
                .map((c, idx) => (
                  <CharacteristicCard key={idx} characteristic={c} />
                ))}
            </Row>
            <p>Others</p>
            <Row className="mb-4">
              {this.props.characteristics
                .filter(
                  e =>
                    ![ORGANISATIONAL, HUMAN, APPLICATION_DOMAIN, DEVELOPMENT_STRATEGY].includes(
                      e.dimension
                    )
                )
                .map((c, idx) => (
                  <CharacteristicCard key={idx} characteristic={c} />
                ))}
            </Row>
          </Col>
          <Col xs={12} sm={6} lg={7} className="column-right">
            <h5 className="pt-3">Find Method Chunks</h5>
            <h6 className="pt-3">Define project</h6>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Enter project description..." />
              </Form.Group>

              <CharacteristicRow props={this.props.characteristics[0]} />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ characteristicReducer }) => ({
  ...characteristicReducer
});

const mapDispatchToProps = { readCharacteristics };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Find);
