import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card, Form, FormControl } from 'react-bootstrap'
import Title from '../components/Title'
import { readProviders } from '../actions'
import './Provider.css'

const ProviderCard = props =>
  <Col xs={12} md={{ span: 8, offset: 2 }}>
    <Card className="provider-card mb-3" onClick={() => props.history.push(`/providers/${props.provider.id}`)}>
      <Card.Body>
        <Row>
          <Col md={8}>
            <Card.Title>{props.provider.name}</Card.Title>
          </Col>
          <Col md={4} className="text-right">{props.provider.industry && "Industry: " + props.provider.industry}</Col>
        </Row>
        <Card.Text className="description">
          {props.provider.description}
        </Card.Text>
        <Card.Link href={`/providers/${props.provider.id}`}>Learn more</Card.Link>
      </Card.Body>
    </Card>
  </Col >

class Providers extends Component {
  state = {
    providers: []
  }

  componentDidMount() {
    this.props.readProviders()
  }

  handleChange = (e) => {
    if (this.state.loading || this.state.errors) {
      return ""
    } else {
      // Variable to hold the original version of the list
      let currentList = []
      // Variable to hold the filtered list before putting into state
      let newList = [];

      // If the search bar isn't empty
      if (e.target.value !== "") {
        // Assign the original list to currentList
        currentList = this.props.providers;

        // Use .filter() to determine which items should be displayed
        // based on the search terms
        newList = currentList.filter(item => {
          // change current item to lowercase
          const lc = item.name.toLowerCase();
          const lcd = item.description.toLowerCase();
          // change search term to lowercase
          const filter = e.target.value.toLowerCase();
          // check to see if the current list item includes the search term
          // If it does, it will be added to newList. Using lowercase eliminates
          // issues with capitalization in search terms and search content
          return lc.includes(filter) || lcd.includes(filter);
        });
      } else {
        // If the search bar is empty, set newList to original task list
        newList = this.props.providers;
      }
      // Set the filtered state based on what our rules added to newList
      this.setState({
        filtered: newList
      });
    }
  }

  render() {
    return (
      <Container fluid className="pt-3 pb-5">
        <Title xs={12} md={{ span: 8, offset: 2 }}>Providers</Title>
        <Row>
          <Col xs={12} md={{ span: 8, offset: 2 }} className="mb-3">
            <Form inline onSubmit={e => e.preventDefault()}>
              Search: &nbsp; <FormControl onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-2" />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Col>
        </Row>
        <Row>
          {this.state.loading ? "Loading..." : (
            this.state.errors ? "Error!" :
              this.state.filtered ? this.state.filtered.map((el, idx) => <ProviderCard history={this.props.history} provider={el} key={idx} />) :
                this.props.providers ? this.props.providers.map((el, idx) => <ProviderCard history={this.props.history} provider={el} key={idx} />) : "Empty"
          )}
        </Row>
      </Container >
    )
  }
}
const mapStateToProps = ({ providerReducer }) => ({ ...providerReducer })

const mapDispatchToProps = { readProviders }

export default connect(mapStateToProps, mapDispatchToProps)(Providers)