import React, {useEffect, useState} from "react"
import EditableBody from './form_edition/EditableBody'
import {Container, Row, Col, Alert} from 'react-bootstrap'
import Properties from "./form_edition/Properties"
import ConfirmAction from "./form_edition/ConfirmAction"
import { useRouteMatch } from 'react-router-dom'
import {server_url, transactionMode} from './files/constantes'
import axios from "axios"

const ToolsAndProperties = () =>  {

  const match = useRouteMatch()
  const [field, setField] = useState()
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState()
  const [parentId, setParentId] = useState({form_id: match.params.form_id, section_id: match.params.id})

  const handleNewItem = (field) => {
    setField(field)
    setMode(transactionMode.NEW)
  }

  const handleUpdateItem = (field) => {
    setField(field)
    setMode(transactionMode.UPDATE)
  }

  const handleDeleteItem = (field) => {
    setField(field)
    setMode(transactionMode.DELETE)
  }

  useEffect(() =>{
    if (field !== undefined){
      switch(mode){
        case transactionMode.NEW:
        case transactionMode.UPDATE:
          setShowModal(true)
          break;
        case transactionMode.DELETE:
          setShowModalDelete(true)
          break;
      }

    }else{
      setShowModal(false)
      setShowModalDelete(false)
    }
  }, [mode])


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

    if(mode === transactionMode.DELETE && message.message === 'confirmed'){
      axios({
        url: server_url+'forms/'+parentId.form_id+'/sections/'+parentId.section_id+'/fields/'+field.id,
        method:'delete',
        data:''
      })
      .then(res=>{
        if(res.data.response === 'Ok'){
          setMessage({message:res.data.message, variant:'success'})
        }else{
          setMessage({message:res.data.message, variant:'danger'})
        }
      })
      .catch(err => {console.log(err)
        setMessage({message:err.message, variant:'danger'})
      })
    }else{
      setMessage(message)
    }
    setField(undefined)
    setMode(undefined)
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
            callbackDeleteItem={(field) =>handleDeleteItem(field)}
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

      <ConfirmAction
          parent_id={parentId}
          field={field}
          show={showModalDelete}
          confirmationMessage={'You are just about deleting this item, are you sure?'}
          onHideConfirm={(message) => handleOnHide(message)} />
      
    </Container>
  )
}

export default ToolsAndProperties
