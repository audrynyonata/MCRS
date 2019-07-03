import React from 'react'
import { connect } from 'react-redux'
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
    <div>
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
    </div>
  )
}


export default connect()(AddMethodChunk)