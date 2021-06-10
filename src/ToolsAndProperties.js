import React, {useEffect, useState} from "react"
import EditableBody from './form_edition/EditableBody'
import {Container, Row, Col, Alert} from 'react-bootstrap'
import Properties from "./form_edition/Properties"
import { useRouteMatch } from 'react-router-dom'
import Constantes from './files/constantes.json'

const ToolsAndProperties = () =>  {

  const match = useRouteMatch()
  const [field, setField] = useState()
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState('')
  const [parentId, setParentId] = useState({form_id: match.params.form_id, section_id: match.params.id})

  const handleClickOnField = (field) => {
    setField(field)
  }

  useEffect(() =>{
    if (field !== undefined){
      setMode(Constantes.TRANSACTION_MODE.UPDATE)
      setShowModal(true)
    }
  }, [field])


  const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(()=>{
    if(message !== undefined && message.message === 'operation succeded'){
      setParentId({...parentId})
      sleep(2500).then(res => {
        setMessage()
      })
      
    }
  }, [message])

  const handleOnHide = (message, show) =>{
    setShowModal(show)
    setMessage(message)
  }

  return (
    <Container>
      <Row>
        <Col lg="2"></Col>
        <Col lg="8">

          {message !== undefined && message.message !== undefined && message.message !== '' ? 
          <Alert key={'msg_1'} variant={message.variant}>{message.message}</Alert>:''}

          <EditableBody 
            callbackClick={(field)=>handleClickOnField(field)} 
            parent_id={parentId} />

        </Col>
        <Col lg="2">
        </Col>
      </Row>

      <Properties
        mode={mode}
        parent_id={parentId}
        field={field}
        show={showModal}
        onShow={() => setShowModal(true)}
        onHide={(message) => handleOnHide(message, false)} />
    </Container>
  )
}

export default ToolsAndProperties
