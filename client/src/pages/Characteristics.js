import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Title from '../components/Title'
import { readCharacteristics } from '../actions'

class Providers extends Component {
  state = {
    characteristics: []
  }

  componentDidMount() {
    this.props.readCharacteristics()
  }

  // handleChange = (e) => {
  //   if (this.state.loading || this.state.errors) {
  //     return ""
  //   } else {
  //     // Variable to hold the original version of the list
  //     let currentList = []
  //     // Variable to hold the filtered list before putting into state
  //     let newList = [];

  //     // If the search bar isn't empty
  //     if (e.target.value !== "") {
  //       // Assign the original list to currentList
  //       currentList = this.props.providers;

  //       // Use .filter() to determine which items should be displayed
  //       // based on the search terms
  //       newList = currentList.filter(item => {
  //         // change current item to lowercase
  //         const lc = item.name.toLowerCase();
  //         const lcd = item.description.toLowerCase();
  //         // change search term to lowercase
  //         const filter = e.target.value.toLowerCase();
  //         // check to see if the current list item includes the search term
  //         // If it does, it will be added to newList. Using lowercase eliminates
  //         // issues with capitalization in search terms and search content
  //         return lc.includes(filter) || lcd.includes(filter);
  //       });
  //     } else {
  //       // If the search bar is empty, set newList to original task list
  //       newList = this.props.providers;
  //     }
  //     // Set the filtered state based on what our rules added to newList
  //     this.setState({
  //       filtered: newList
  //     });
  //   }
  // }

  render() {
    console.log(this.props)
    return (
      < Container fluid className="pt-3 pb-5" >
        <Title xs={12} md={{ span: 8, offset: 2 }}>Characteristics</Title>
        {/* <Row>
          <Col xs={12} md={{ span: 8, offset: 2 }} className="mb-3">
            <Form inline onSubmit={e => e.preventDefault()}>
              Search: &nbsp; <FormControl onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row> */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <table class="table-hover table">
              <tr>
                <th>
                  Characteristic
                </th>
                <th>
                  Dimension
                </th>
                <th>
                  Values
                </th>
              </tr>
              <tbody>
                {this.state.loading ? "Loading..." : (
                  this.state.errors ? "Error!" :
                    this.props.characteristics ?
                      this.props.characteristics.map((el, idx) =>
                        <tr>
                          <td>{el.name}</td>
                          <td>{el.dimension}</td>
                          <td>{el.characteristic_values[0].values}
                          </td>
                        </tr>) : "Empty"

                )}
              </tbody>


            </table>
          </Col>
        </Row>
      </Container >
    )
  }
}
const mapStateToProps = ({ characteristicReducer }) => ({ ...characteristicReducer })

const mapDispatchToProps = { readCharacteristics }

export default connect(mapStateToProps, mapDispatchToProps)(Providers)