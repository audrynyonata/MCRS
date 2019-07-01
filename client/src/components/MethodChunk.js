import React from 'react'

const MethodChunk = props => (
  <li
    onClick={props.onClick}
  >
    {/* Id: {match.id} <br/> */}
    Name: {props.name} <br/>
    Description: {props.description}
  </li>
)

export default MethodChunk