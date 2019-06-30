import React from 'react'
import { connect } from 'react-redux'
import { addMethodChunk } from '../actions/methodChunk'
import axios from 'axios';

const AddMethodChunk = (props) => {
  let methodChunk = {
    title: "MethodChunk Test",
    content: "This is a test method chunk"
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          axios.post('/method-chunks', { ...methodChunk })
            .then(({data : {content}}) => {
              console.log(`Item - ${content} added successfully`)
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