import React, {useState} from "react"
import ToolBar from './form_edition/ToolBar'
import Properties from './form_edition/Properties'
import EditableBody from './form_edition/EditableBody'
import {Container, Row, Col} from 'react-bootstrap'

const ToolsAndProperties = (props) =>  {

  const [field, setField] = useState({id:0, type:''})

  const handleClickOnField = (field_id, field_type) => {
    setField({id: field_id, type: field_type})
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
    </Container>
  )
}

export default ToolsAndProperties
