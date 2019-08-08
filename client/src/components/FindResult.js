import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Title from "./Title";
import { find } from "../actions";
import "./pages.css";
import { NavLink } from "react-router-dom";

class FindResult extends Component {
  state = {
    providers: [],
    provider: null
  };

  componentDidMount() {
    let provider = this.props.match.params.provider;
    let project = this.props.match.params.project;
    console.log(provider, project);
    this.props.find(provider + "/" + project);
  }

  render() {
    console.log(this.props);
    if (this.state.loading) return "Loading...";
    if (this.state.errors) return "Error!";
    return (
      <Container fluid className="pt-3">
        <Row>
          {this.props.results
            ? this.props.results.map(e => (
                <Col>
                  {e.model}
                  <div>
                    {e.values.map(i => (
                      <p>
                        {i.rank + ": " + i.methodChunk.name + "."}
                        {<br />}
                        {"Score: " + i.score}
                      </p>
                    ))}
                  </div>
                </Col>
              ))
            : ""}
        </Row>
        {this.props.provider ? (
          <div>
            <Title xs={12} md={{ span: 8, offset: 2 }}>
              {this.props.provider.name}
            </Title>
            <Row>
              <Col md={{ span: 5, offset: 2 }}>
                <h6>Description</h6>
                <p>{this.props.provider.description || "N/A"}</p>
                <h6>Useful links</h6>
                {this.props.provider.urls.length ? (
                  <ol>
                    {this.props.provider.urls.map((e, idx) => (
                      <li key={idx}>
                        {e.name} - <a href={`/${e.url}`}>{e.url}</a>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>N/A</p>
                )}
                <h6>Contacts</h6>
                {this.props.provider.contacts.length ? (
                  <ul>
                    {this.props.provider.contacts.map((e, idx) => (
                      <li key={idx}>
                        {e.name}
                        <br />
                        {e.role}
                        <br />
                        {e.description}
                        <br />
                        {e.email} {e.phone} {e.address}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>N/A</p>
                )}
                <h6>Related providers</h6>
                {this.props.provider.relatedProviders.length ? (
                  <ul>
                    {this.props.provider.relatedProviders.map((e, idx) => (
                      <li key={idx}>
                        <NavLink to={`/providers/${e}`}>{e}</NavLink>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>N/A</p>
                )}
              </Col>
              <Col xs={3}>
                <p>Industry: {this.props.provider.industry}</p>
                <br />
                <h6>Last updated</h6>
                <p>{this.props.provider.updatedAt}</p>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ projects }) => ({
  ...projects.results
});

const mapDispatchToProps = { find };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindResult);
