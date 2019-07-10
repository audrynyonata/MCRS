import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../components/Title";
import { readProviders } from "../actions";
import "./Provider.css";

class ProviderItem extends Component {
  state = {
    providers: [],
    provider: null
  };

  componentDidMount() {
    console.log(this.props);
    this.props.readProviders();
  }

  render() {
    if (this.state.loading) return "Loading...";
    if (this.state.errors) return "Error!";
    return (
      <Container fluid className="pt-3">
        {this.props.provider ? (
          <div>
            <Title xs={12} md={{ span: 8, offset: 2 }}>
              {this.props.provider.name}
            </Title>
            <Row>
              <Col md={{ span: 5, offset: 2 }}>
                <h6>Description</h6>
                <p>{this.props.provider.description}</p>
                <h6>Useful links</h6>
                <ol>
                  {this.props.provider.urls.map((e, idx) => (
                    <li key={idx}>
                      {e.name} - <a href={`/${e.url}`}>{e.url}</a>
                    </li>
                  ))}
                </ol>
                <h6>Contacts</h6>
                <ul>
                  {this.props.provider.contacts.map((e, idx) => (
                    <li key={idx}>
                      {e.name} {e.role} {e.description} {e.email} {e.phone}{" "}
                      {e.address}
                    </li>
                  ))}
                </ul>
                <h6>Related providers</h6>
                <ul>
                  {this.props.provider.related_providers.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
                <h6>Method chunks</h6>
                <ol>
                  {this.props.provider.related_providers.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ol>
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

const mapStateToProps = (state, ownProps) => {
  console.log("ownProps", ownProps);
  return {
    ...state.providerReducer,
    provider: state.providerReducer.providers.find(
      e => e.id.toLowerCase() === ownProps.match.params.id.toLowerCase()
    )
  };
};

const mapDispatchToProps = { readProviders };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderItem);
