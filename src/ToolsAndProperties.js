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
  const [mode, setMode] = useState()
  const [parentId, setParentId] = useState({form_id: match.params.form_id, section_id: match.params.id})

  const handleNewItem = (field) => {
    setField(field)
    setMode(Constantes.TRANSACTION_MODE.NEW)
    console.log('new')
    console.log(field.id)
    console.log(field.description)
  }

  const handleUpdateItem = (field) => {
    setField(field)
    setMode(Constantes.TRANSACTION_MODE.UPDATE)
    console.log('update')
    console.log(field.id)
    console.log(field.description)
  }

  useEffect(() =>{
    if (field != undefined){
      setShowModal(true)
    }else{
      setShowModal(false)
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

  const handleOnHide = (message) =>{
    setField(undefined)
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
            callbackUpdateItem={(field)=>handleUpdateItem(field)}
            callbackNewItem={(field) =>handleNewItem(field)}
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
        onHide={(message) => handleOnHide(message)} />
    </Container>
  )
}

export default ToolsAndProperties
