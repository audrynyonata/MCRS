import React from 'react'

const MethodChunk = ({ onClick, title, content }) => (
  <li
    onClick={onClick}
  >
    Title: {title} <br/>
    Content: {content}
  </li>
)

export default MethodChunk