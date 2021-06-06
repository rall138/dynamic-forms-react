import React, { useState, useEffect } from "react"
import {Modal, Button, Form} from 'react-bootstrap'
import fieldJsonProperties from '../files/field_properties.json'
import Constantes from '../files/constantes.json'

const Properties = (props) => {
  
  const [properties, setProperties] = useState(fieldJsonProperties)
  const [form, setForm] = useState('')

  const handleChange = event =>{
    
    // En el caso del insert tenemos que eliminar el id, sino generamos conflicto al insertar objeto con id 0
    if (props.mode === Constantes.TRANSACTION_MODE.NEW){
      setForm({
        title: event.target.name === "form_title" ? event.target.value : form.title,
        subtitle: event.target.name === "form_subtitle" ? event.target.value : form.subtitle,
        description: event.target.name === "form_description" ? event.target.value : form.description,
      })
    }else{
      setForm({
        id: form.id,
        title: event.target.name === "form_title" ? event.target.value : form.title,
        subtitle: event.target.name === "form_subtitle" ? event.target.value : form.subtitle,
        description: event.target.name === "form_description" ? event.target.value : form.description,
      })
    }
    
  }

  const handleSubmit = event => {

    event.preventDefault();

    const form_control = event.currentTarget;
    if (form_control.checkValidity() === false){
      event.stopPropagation();
    }else{

    }

  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Field properties
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form className="modal-form" onSubmit={()=>handleSubmit}>
          {properties.map(prop =>{
            return(
              <Form.Group>

                {prop.control_type !== "checkbox" ? 
                    <Form.Label>{prop.pretty_name}</Form.Label>: ''
                }

                { prop.control_type === "text" ?
                    <Form.Control onChange={()=>handleChange}
                          name = {prop.name}
                          id = {prop.name}
                          required = {prop.field_required} 
                          type = "text" 
                          placeholder = "Insert a title"
                          value = {form.title}>
                    </Form.Control> : ''}
                  
                  { prop.control_type === "option" ?
                    <Form.Control as="select" onChange={()=>handleChange}
                      name = {prop.name}
                      id = {prop.name}
                      required = {prop.field_required} 
                      type = "text" 
                      placeholder = "Insert a title"
                      value = {form.title}>
                        {prop.options.map(opt => {
                            return(<option>{opt}</option>)
                        })}
                    </Form.Control> : ''}                

                  { prop.control_type === "checkbox" ?
                    <Form.Check onChange={()=>handleChange}
                      name = {prop.name}
                      id = {prop.name}
                      required = {prop.field_required} 
                      label = {prop.pretty_name} />
                    : ''}

              </Form.Group>
            )
          })}
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" type="submit">Confirm</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Properties
