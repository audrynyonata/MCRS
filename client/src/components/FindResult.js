import React, { Component } from "react";
import { Container, Row, Col, Spinner, Tabs, Tab } from "react-bootstrap";
import Title from "./Title";
import "./pages.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
class FindResult extends Component {
  state = {
    data: {},
    loading: true,
    error: null
  };

  componentDidMount() {
    let provider = this.props.match.params.provider;
    let project = this.props.match.params.project;
    let pid = provider + "/" + project;
    const data = {
      project: pid
    };
    if (this.state.data && !this.state.error) return;
    return axios
      .post("/find", data)
      .then(({ data }) => {
        this.setState({
          data,
          loading: false,
          error: null
        });
        console.log("Find success", data);
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({
          data: {},
          loading: false,
          error: error
        });
      });
  }

  render() {
    return (
      <Container fluid className="pt-3">
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          Result
        </Title>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {this.state.loading ? (
              <Spinner animation="border" />
            ) : this.state.error ? (
              "Failed. Please try again."
            ) : this.state.data && this.state.data.results ? (
              <Tabs>
                {this.state.data.results.map(e => (
                  <Tab eventKey={e.model} title={e.model} key={e.model}>
                    <h5 className="pt-3">{e.model}</h5>
                    {e.values.map((i, idx) => (
                      <Row key={idx}>
                        <Col>
                          <p>
                            {i.rank}:{" "}
                            <NavLink to={"/method-chunks#" + i.methodChunk.id}>
                              {i.methodChunk.name}
                            </NavLink>
                            {<br />}
                            {"Score: " + i.score}
                          </p>
                        </Col>
                        <Col md={7}>
                          Characteristics:
                          <ul>
                            {i.methodChunk.characteristics.map((e, idx) => (
                              <li key={e.id + "" + e.ref}>
                                {e.id}: {e.value} (ref: {e.ref})
                              </li>
                            ))}
                          </ul>
                        </Col>
                      </Row>
                    ))}
                  </Tab>
                ))}
                <Tab eventKey="project" title="Project">
                  <h5 className="pt-3">Project</h5>
                  <p>
                    <b>Name</b>
                    <br />
                    {this.state.data.project.name}
                  </p>
                  <p>
                    <b>Description</b>
                    <br />
                    {this.state.data.project.name}
                  </p>
                  <p>
                    <b>Owner</b>
                    <br />
                    {this.state.data.project.provider}
                  </p>
                  <h6>Characteristics</h6>
                  <ul>
                    {this.state.data.project.characteristics.map((i, idx) => (
                      <li key={i.id + " " + i.ref + " " + i.rule}>
                        {i.id} (W.{i.weight}). {i.rule} {i.value.join(",")} (ref. {i.ref})
                      </li>
                    ))}
                  </ul>
                </Tab>
              </Tabs>
            ) : (
              "No match found"
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FindResult;
