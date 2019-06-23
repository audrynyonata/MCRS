import React from 'react'
import MethodChunk from './MethodChunk'

const MethodChunkList = ({ methodChunks }) => (
  <ul>
    {methodChunks.map(methodChunk => (
      <MethodChunk key={methodChunk._id} {...methodChunk}/>
    ))}
  </ul>
)

export default MethodChunkList