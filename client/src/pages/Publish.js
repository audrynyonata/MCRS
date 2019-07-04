import React from 'react'
import { connect } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { addMethodChunk } from '../actions/'
import axios from 'axios'

const AddMethodChunk = (props) => {
  let methodChunk = {
    name: "Agile Development Essentials",
    description: "Add value to a product by incrementally extending it, ensuring it is usable, releasable and maintainable.",
    provider: "Company A", //
    url: "https://google.com", //
    characteristics: [
      { name: "Management Commitment", value: "high", type: "ordinal" },
      { name: "User involvement", value: "high", type: "ordinal" },
      { name: "Goal number", value: "multi-goals", type: "nominal" },
      { name: "Development strategy", value: "iterative", type: "nominal" },
      { name: "Delivery strategy", value: "incremental", type: "nominal" },
    ]
  }

  return (
    <Container fluid className="pt-3 pb-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h5>Publish Method Chunk</h5>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Enter project description..." />
            </Form.Group>

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

            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
  </Button>
          </Form>
          <form
            onSubmit={e => {
              e.preventDefault()
              axios.post('/method-chunks', { ...methodChunk })
                .then(({ data: { name } }) => {
                  console.log(`Item - ${name} added successfully`)
                })
                .catch(e => console.log("Addition failed , Error ", e))
              props.dispatch(addMethodChunk(methodChunk))
            }}
          >
            <button type="submit">Add methodChunk</button>
          </form>
        </Col>
      </Row>

    </Container>
  )
}


export default connect()(AddMethodChunk)