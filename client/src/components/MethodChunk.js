import React from 'react'

const MethodChunk = ({ onClick, title, content, match }) => (
  <li
    onClick={onClick}
  >
    {/* Id: {match.id} <br/> */}
    Title: {title} <br/>
    Content: {content}
  </li>
)

export default MethodChunk