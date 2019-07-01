import React from 'react'
import { connect } from 'react-redux'
import { addMethodChunk } from '../actions/'
import axios from 'axios';

const AddMethodChunk = (props) => {
  let methodChunk = {
    name: "Agile Development Essentials",
    description: "Add value to a product by incrementally extending it, ensuring it is usable, releasable and maintainable.",
    provider: "Tes", //
    source: "https://google.com", //
    characteristics: [
      {characteristic: "ManagementCommitment", value: "high"},
      {characteristic: "UserInvolvement", value: "high"},
      {characteristic: "GoalNumber", value: "multi-goals"},
      {characteristic: "DevelopmentStrategy", value: "iterative"},
      {characteristic: "DeliveryStrategy", value: "incremental"},
    ]
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          axios.post('/method-chunks', { ...methodChunk })
            .then(({data : {name}}) => {
              console.log(`Item - ${name} added successfully`)
            })
            .catch(e => console.log("Addition failed , Error ", e))
          props.dispatch(addMethodChunk(methodChunk))
        }}
      >
        <button type="submit">Add methodChunk</button>
      </form>
    </div>
  )
}


export default connect()(AddMethodChunk)