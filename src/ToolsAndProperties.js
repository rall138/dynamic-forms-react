import React, {useState} from "react"
import EditableBody from './form_edition/EditableBody'
import {Container, Row, Col} from 'react-bootstrap'
import Properties from "./form_edition/Properties"

const ToolsAndProperties = (props) =>  {

  const [field, setField] = useState({id:0, type:''})
  const [showModal, setShowModal] = useState(false)

  const handleClickOnField = (field_id, field_type) => {
    setField({id: field_id, type: field_type})
    setShowModal(true)
  }

  return (
    <Container>
      <Row>
        <Col lg="2"></Col>
        <Col lg="8">
          <EditableBody 
            callbackClick={(field_id, field_type)=>handleClickOnField(field_id, field_type)} 
            parent_id={{form_id: props.form_id, section_id: props.section_id}} />
        </Col>
        <Col lg="2">
        </Col>
      </Row>

      <Properties
        show={showModal}
        onHide={() => setShowModal(false)} />

    </Container>
  )
}

export default ToolsAndProperties
