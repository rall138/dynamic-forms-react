import React from "react"
import { ListGroup } from 'react-bootstrap'

const ToolBar = () => {
  return (
    <ListGroup>
      <ListGroup.Item></ListGroup.Item>
      <ListGroup.Item variant="info">Input</ListGroup.Item>
      <ListGroup.Item variant="light">Text</ListGroup.Item>
      <ListGroup.Item variant="dark"></ListGroup.Item>
    </ListGroup>    
  )
}

export default ToolBar
