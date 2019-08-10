import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Title from "./Title";
import { readProviders, readMethodChunks, readIndustries } from "../actions";
import "./pages.css";
import { NavLink } from "react-router-dom";

class ProviderItem extends Component {
  state = {
    provider: null
  };

  componentDidMount() {
    Promise.resolve(this.props.readIndustries())
      .then(r => {
        this.props.readProviders();
        return r;
      })
      .then(r => this.props.readMethodChunks());
  }

  render() {
    console.log(this.props);
    if (this.state.loading) return "Loading...";
    if (this.state.errors) return "Error!";
    if (this.props.industries)
      return (
        <Container fluid className="pt-3">
          {this.props.provider && this.props.industries.all.length ? (
            <div>
              <Row>
                <Col md={{ span: 5, offset: 2 }}>
                  <NavLink to="/providers">&laquo; Back</NavLink>
                </Col>
                <Col xs={3} className="text-right">
                  <NavLink to={`/providers/${this.props.provider.id}/edit`}>Edit</NavLink>
                </Col>
              </Row>
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
                  <h6>Method chunks</h6>
                  {this.props.methodChunks.length ? (
                    <ul>
                      {this.props.methodChunks.map((e, idx) => (
                        <li key={idx}>
                          <NavLink to={`/method-chunks#${e.id}`}>{e.name}</NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>N/A</p>
                  )}
                </Col>
                <Col xs={3}>
                  <p>Industry: {this.props.industries[this.props.provider.industry].name}</p>
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

const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  console.log("state", state);
  const id = ownProps.match.params.id.toLowerCase();
  return {
    methodChunks: state.methodChunks.all
      .filter(e => state.methodChunks[e].provider === id)
      .map(e => state.methodChunks[e]),
    industries: state.industries,
    provider: state.providers[id]
  };
};

const mapDispatchToProps = { readProviders, readMethodChunks, readIndustries };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderItem);
