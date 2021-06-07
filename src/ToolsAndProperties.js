import React, {useState} from "react"
import EditableBody from './form_edition/EditableBody'
import {Container, Row, Col} from 'react-bootstrap'
import Properties from "./form_edition/Properties"
import { useRouteMatch } from 'react-router-dom'

const ToolsAndProperties = (props) =>  {

  const match = useRouteMatch()
  const [field, setField] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [parentId, setParentId] = useState({form_id: match.params.form_id, section_id: match.params.id})

  const handleClickOnField = (field) => {
    setShowModal(true)
    setField(field)
  }

  return (
    <Container>
      <Row>
        <Col lg="2"></Col>
        <Col lg="8">
          <EditableBody 
            callbackClick={(field)=>handleClickOnField(field)} 
            parent_id={parentId} />
        </Col>
        <Col lg="2">
        </Col>
      </Row>

      <Properties
        field_id={field.id}
        parent_id={parentId}
        properties={JSON.stringify(field)}
        show={showModal}
        onHide={() => setShowModal(false)} />

    </Container>
  )
}

export default ToolsAndProperties
