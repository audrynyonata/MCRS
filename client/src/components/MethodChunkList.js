import React from 'react'
import MethodChunk from './MethodChunk'

const MethodChunkList = ({ methodChunks }) => (
  <ul>
    {methodChunks.map((methodChunk, idx) => (
      <MethodChunk key={idx} {...methodChunk} />
    ))}
  </ul>
)

export default MethodChunkList