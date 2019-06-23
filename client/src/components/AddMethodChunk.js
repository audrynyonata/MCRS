import React from 'react'
import { connect } from 'react-redux'
import { addMethodChunk } from '../actions/methodChunk'

const AddMethodChunk = ({ dispatch }) => {
  let methodChunk = {
    title: "MethodChunk Test",
    content: "This is a test method chunk"
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch(addMethodChunk(methodChunk))
        }}
      >
        <button type="submit">Add methodChunk</button>
      </form>
    </div>
  )
}

export default connect()(AddMethodChunk)