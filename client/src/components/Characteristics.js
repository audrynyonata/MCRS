import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import Title from "./Title";
import { readCharacteristics } from "../actions";
import {
  ORGANISATIONAL,
  HUMAN,
  APPLICATION_DOMAIN,
  DEVELOPMENT_STRATEGY
} from "./Find";

const DimensionTable = props => {
  console.log("props", props);
  return (
    <table className="table-hover table">
      <thead>
        <tr>
          <th>id</th>
          <th>values</th>
          <th>ref</th>
          <th>isQuantifiable</th>
        </tr>
      </thead>
      <tbody>
        {props.filtered ? (
          props.filtered.map(e => (
            <OverlayTrigger
              key={"search " + e.id + " " + e.ref}
              placement="right"
              overlay={
                <Tooltip id={`tooltip-search-${e.id}`}>
                  {e.description ||
                    "dimension: " + e.dimension ||
                    "id: " + e.id}
                </Tooltip>
              }
            >
              <tr>
                <td>{e.id}</td>
                <td>{e.values.toString()}</td>
                <td>{e.ref}</td>
                <td>{e.isQuantifiable.toString()}</td>
              </tr>
            </OverlayTrigger>
          ))
        ) : props.array ? (
          props.array.map(i =>
            props.characteristics[i].characteristicValues.map(e => (
              <OverlayTrigger
                key={i + " " + e.ref}
                placement="right"
                overlay={
                  <Tooltip id={`tooltip-${i}`}>
                    {props.characteristics[i].description ||
                      "dimension: " + props.characteristics[i].dimension ||
                      "id: " + props.characteristics[i].id}
                  </Tooltip>
                }
              >
                <tr>
                  <td>{props.characteristics[i].id}</td>
                  <td>{e.values.toString()}</td>
                  <td>{e.ref}</td>
                  <td>{e.isQuantifiable.toString()}</td>
                </tr>
              </OverlayTrigger>
            ))
          )
        ) : (
          <tr>
            <td>Empty</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

class Characteristics extends Component {
  state = {};

  componentDidMount() {
    this.props.readCharacteristics();
  }

  handleChange = e => {
    if (this.state.loading || this.state.errors) {
      return "";
    } else {
      let cvList = [];
      let newList = [];

      if (e.target.value !== "") {
        this.props.characteristics.all.forEach(i => {
          let item = this.props.characteristics[i];
          item.characteristicValues.forEach(cv => {
            cvList[cvList.length] = {
              ...item,
              ...cv
            };
          });
        });
        newList = cvList.filter(item => {
          const lc = item.name.toLowerCase();
          const lcd = item.description ? item.description.toLowerCase() : "";
          const lcdim = item.dimension ? item.dimension.toLowerCase() : "";
          const lcq = item.isQuantifiable.toString().toLowerCase();
          const lcv = item.values.toString().toLowerCase();
          const lcr = item.ref.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return (
            lc.includes(filter) ||
            lcd.includes(filter) ||
            lcdim.includes(filter) ||
            lcq.includes(filter) ||
            lcv.includes(filter) ||
            lcr.includes(filter)
          );
        });
      } else {
        newList = [];
      }
      // console.log("cvList", newList);
      this.setState({
        filtered: newList
      });
    }
  };

  render() {
    console.log(this.props);
    return (
      <Container fluid className="pt-3 pb-5 char">
        <Title xs={12} md={{ span: 8, offset: 2 }}>
          Characteristics
        </Title>
        <Row className="mb-3">
          <Col xs={12} md={{ span: 8, offset: 2 }}>
            <Form inline onSubmit={e => e.preventDefault()}>
              Search:
              <FormControl
                onChange={this.handleChange}
                type="text"
                placeholder="Search"
                className="ml-md-2"
              />
            </Form>
          </Col>
        </Row>
        {this.state.filtered && (
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h5>Search result</h5>
            </Col>
            <Col md={{ span: 8, offset: 2 }}>
              <DimensionTable
                filtered={this.state.filtered}
                characteristics={this.props.characteristics}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h5>ORGANISATIONAL DIMENSION</h5>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <DimensionTable
              array={this.props.organisational}
              characteristics={this.props.characteristics}
            />
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <h5>HUMAN DIMENSION</h5>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <DimensionTable
              array={this.props.human}
              characteristics={this.props.characteristics}
            />
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <h5>APPLICATION DOMAIN DIMENSION</h5>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <DimensionTable
              array={this.props.applicationDomain}
              characteristics={this.props.characteristics}
            />
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <h5>DEVELOPMENT STRATEGY DIMENSION</h5>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <DimensionTable
              array={this.props.developmentStrategy}
              characteristics={this.props.characteristics}
            />
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <h5>OTHERS</h5>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <DimensionTable
              array={this.props.others}
              characteristics={this.props.characteristics}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ characteristics }) => ({
  characteristics: characteristics,
  organisational: characteristics.all.filter(
    i =>
      characteristics[i].dimension &&
      characteristics[i].dimension.toLowerCase() === ORGANISATIONAL
  ),
  human: characteristics.all.filter(
    i =>
      characteristics[i].dimension &&
      characteristics[i].dimension.toLowerCase() === HUMAN
  ),
  applicationDomain: characteristics.all.filter(
    i =>
      characteristics[i].dimension &&
      characteristics[i].dimension.toLowerCase() === APPLICATION_DOMAIN
  ),
  developmentStrategy: characteristics.all.filter(
    i =>
      characteristics[i].dimension &&
      characteristics[i].dimension.toLowerCase() === DEVELOPMENT_STRATEGY
  ),
  others: characteristics.all.filter(i => !characteristics[i].dimension)
});

const mapDispatchToProps = { readCharacteristics };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Characteristics);
