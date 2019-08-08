import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import Title from "./Title";
import "./pages.css";
import { readProjects } from "../actions";
import { NavLink } from "react-router-dom";

const Project = props => {
  return (
    <Col xs={props.xs || 12} md={props.md}>
      <Card className="mc-card mb-3">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card.Title>{props.project.name}</Card.Title>
            </Col>
            <Col md={4} className="text-right">
              Owner:{" "}
              <NavLink to={`/providers/${props.project.provider}`}>
                {props.project.provider}
              </NavLink>
            </Col>
          </Row>
          <div className="description mb-1">{props.project.description}</div>
          <h6>Characteristics</h6>
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>weight</th>
                <th>rule</th>
              </tr>
            </thead>
            <tbody>
              {props.project.characteristics.map((el, idx) => (
                <tr key={idx}>
                  <td>{el.id}</td>
                  <td>{el.weight || "N/A"}</td>
                  <td>
                    {el.rule}{" "}
                    {el.rule === "maximum" || el.rule === "minimum"
                      ? ""
                      : " (" + el.value.join(">") + ") "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <NavLink
              to={`/find/${props.project.id}/`}
              className="btn btn-primary my-2"
            >
              Get recommendation
            </NavLink>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

class Projects extends Component {
  state = {
    containerSize: { span: 8, offset: 2 },
    cardSize: { span: 8, offset: 2 },
    viewMode: "list"
  };

  componentDidMount() {
    this.props.readProjects();
  }

  handleChange = e => {
    if (this.state.loading || this.state.errors) {
      return "";
    } else {
      let currentList = [];
      let newList = [];

      if (e.target.value !== "") {
        currentList = this.props.projects.all;

        newList = currentList.filter(i => {
          let item = this.props.projects[i];
          const lc = item.name.toLowerCase();
          const lp = item.provider.toLowerCase();
          const lcd = item.description ? item.description.toLowerCase() : "";
          const lcc = item.characteristics
            .map(e => e.id)
            .toString()
            .toLowerCase();
          const lcv = item.characteristics
            .map(e => e.value)
            .toString()
            .toLowerCase();
          const lcr = item.characteristics
            .map(e => e.rule)
            .toString()
            .toLowerCase();
          const filter = e.target.value.toLowerCase();
          return (
            lc.includes(filter) ||
            lcd.includes(filter) ||
            lcc.includes(filter) ||
            lcv.includes(filter) ||
            lcr.includes(filter) ||
            lp.includes(filter)
          );
        });
      } else {
        newList = this.props.projects.all;
      }
      this.setState({
        filtered: newList
      });
    }
  };

  toggleViewMode = () => {
    this.setState(prevState => {
      if (prevState.viewMode === "grid") {
        return {
          viewMode: "list",
          containerSize: { span: 8, offset: 2 },
          cardSize: { span: 8, offset: 2 }
        };
      } else if (prevState.viewMode === "list") {
        return {
          viewMode: "grid",
          containerSize: 12,
          cardSize: 4
        };
      }
    });
  };
  render() {
    console.log("props", this.props);
    console.log("s", this.state);
    return (
      <Container fluid className="pt-3 pb-5">
        <Title xs={12} md={this.state.containerSize}>
          Projects
        </Title>
        <Row className="mb-3">
          <Col xs={12} md={this.state.containerSize}>
            <Form inline onSubmit={e => e.preventDefault()}>
              Search:
              <FormControl
                onChange={this.handleChange}
                type="text"
                placeholder="Search"
                className="ml-md-2"
              />
              <div className="d-none d-md-block ml-auto">
                <Button
                  variant="outline-secondary"
                  onClick={this.toggleViewMode}
                  className="button-view-mode"
                >
                  {this.state.viewMode === "list" ? (
                    <i className="fas fa-th" />
                  ) : (
                    <i className="fas fa-bars" />
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="mc">
          {this.state.loading ? (
            "Loading..."
          ) : this.state.errors ? (
            "Error!"
          ) : this.state.filtered ? (
            this.state.filtered.map((el, idx) => (
              <Project
                history={this.props.history}
                md={this.state.cardSize}
                project={this.props.projects[el]}
                key={idx}
                grid
              />
            ))
          ) : this.props.projects.all.length ? (
            this.props.projects.all
              .sort()
              .map((el, idx) => (
                <Project
                  history={this.props.history}
                  md={this.state.cardSize}
                  project={this.props.projects[el]}
                  key={idx}
                  grid
                />
              ))
          ) : (
            <Col xs={12} md={this.state.containerSize}>
              Empty
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ projects }) => ({ projects });

const mapDispatchToProps = { readProjects };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
