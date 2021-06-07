import React, { useState, useEffect } from "react"
import {Modal, Button, Form} from 'react-bootstrap'
import fieldJsonProperties from '../files/field_properties.json'
import Constantes from '../files/constantes.json'
import axios from "axios"

const Properties = (props) => {
  
  const [properties, setProperties] = useState(fieldJsonProperties)
  const [field, setField] = useState('')

  useEffect(() => {
    for (let db_prop in props.field){
      properties[properties.indexOf(properties.filter(prop => prop.name === db_prop.name))] = db_prop.value
    }
    setProperties(properties)
  }, [props])

  const handleChange = (propName) =>{

    console.log(propName)
    const input = document.getElementById(propName);
    const propValue = input.value

    field = {
      id : props.field_id,
      description: propName === "description" ? propValue : field.description,
      pretty_name: propName === "pretty_name" ? propValue : field.pretty_name,
      field_type: propName === "field_type" ? propValue : field.field_type,
      control_type: propName === "control_type" ? propValue : field.control_type,
      options: propName === "options" ? propValue : field.options,
      field_required: propName === "field_required" ? propValue : field.field_required,
    }

    console.log(JSON.stringify(field))
    setField(field)
    
  }

  const handleSubmit = () => {

    console.log('Entrando en submit')

    const form_control = document.getElementById('form_control');

    if (form_control.checkValidity()){
      console.log('Entrando en validacion')
      let url = Constantes.SERVER_URL+'forms/'+props.parent_id.form_id+'/sections/'+props.parent_id.section_id+'/fields/'+field.id
      console.log('URL de commit'+url)

      axios({
        url: Constantes.SERVER_URL+'forms/'+props.parent_id.form_id+'/sections/'+props.parent_id.section_id+'/fields/'+field.id,
        method: "put",
        data: field 
      })
      .then(res =>{
        if(res.response === 'Ok'){
          /*document.getElementById("btn_close").click()*/
        }
      })
      .catch(error => console.log(error))

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
        
        <Form id="form_control" className="modal-form">
          {properties.map(prop =>{
            return(
              <Form.Group>

                {prop.control_type !== "checkbox" && prop.visible ? 
                    <Form.Label>{prop.pretty_name}</Form.Label>: ''
                }

                { prop.control_type === "text" && prop.visible ?
                    <Form.Control onChange={()=>handleChange(prop.name)}
                          name = {prop.name}
                          id = {prop.name}
                          required = {prop.field_required} 
                          type = "text" 
                          value = {prop.value}>
                    </Form.Control> : ''}
                  
                  { prop.control_type === "option" && prop.visible ?
                    <Form.Control as="select" onChange={()=>handleChange(prop.name)}
                      name = {prop.name}
                      id = {prop.name}
                      required = {prop.field_required} 
                      type = "text" 
                      value = {prop.value}>
                        {prop.options.map(opt => {
                            return(<option>{opt}</option>)
                        })}
                    </Form.Control> : ''}                

                  { prop.control_type === "checkbox" && prop.visible ?
                    <Form.Check onChange={()=>handleChange(prop.name)}
                      name = {prop.name}
                      id = {prop.name}
                      required = {prop.field_required} 
                      checked = {prop.value} 
                      label = {prop.pretty_name} />
                    : ''}

              </Form.Group>
            )
          })}
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button id="btn_close" onClick={props.onHide}>Close</Button>
        <Button variant="success" onClick={()=>handleSubmit()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Properties
