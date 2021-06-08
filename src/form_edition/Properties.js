import React, { useState, useEffect } from "react"
import {Modal, Button, Form} from 'react-bootstrap'
import fieldJsonProperties from '../files/field_properties.json'
import Constantes from '../files/constantes.json'
import axios from "axios"

const Properties = (props) => {
  
  const [properties, setProperties] = useState(fieldJsonProperties)
  const [field, setField] = useState('')

  /* 
    * for(let property_name in props.field) #solo retorna los nombres
    * --> id
    * --> name
    * --> pretty_name
    *
    * Field 
    *   id: 2, 
    *   description: "New control", 
    *   field_type: "text", 
    *   created_at: "2021-05-26 16:30:52.266609000 +0000", 
    *   updated_at: "2021-05-26 16:30:52.266609000 +0000", 
    *   section_id: 1, control_type: nil, 
    *   pretty_name: nil, 
    *   field_required: true, 
    *   options: "[]", 
    *   value: nil
  */

  useEffect(() => {

    let index = -1
    for(let property_name in props.field){
      index = returnPropertyIndex(property_name)
      if (index > -1){
        properties[index].value = props.field[property_name]
      }
    }
    setProperties(properties)
  }, [props])


    /* 
     * Retornamos el indice de la propiedad que esta dentro de properties
     * --> properties.id vs field.id
     * --> properties.name vs field.name
     * --> properties.pretty_name vs field.pretty_name
    */

  const returnPropertyIndex = (prop_name) =>{

    let itemFound = false
    let index = 0
    while(!itemFound && index < properties.length){
      if (properties[index].description === prop_name){
        itemFound = true
      }else{
        index++
      }
    }
    return index = itemFound ? index : -1;
  }

  const handleChange = (e) =>{
    let tempField = {...field}
    tempField[e.target.name] = e.target.value
    setField(tempField)
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
          { properties.map(prop =>{
            return(
              <Form.Group>

                {prop.control_type !== "checkbox" && prop.visible ? 
                    <Form.Label>{prop.pretty_name}</Form.Label>: ''
                }

                { prop.control_type === "text" && prop.visible ?
                    <Form.Control onChange={(e)=>handleChange(e)}
                          name={prop.description}
                          id={prop.description}
                          required={prop.field_required} 
                          type="text" 
                          value={prop.value}>
                    </Form.Control> : ''}
                  
                  { prop.control_type === "option" && prop.visible ?
                    <Form.Control as="select" onChange={(e)=>handleChange(e)}
                      name={prop.description}
                      id={prop.description}
                      required={prop.field_required} 
                      type="text" 
                      value={prop.value}>
                        {prop.options.map(opt => {
                            return(<option>{opt}</option>)
                        })}
                    </Form.Control> : ''}                

                  { prop.control_type === "checkbox" && prop.visible ?
                    <Form.Check onChange={(e)=>handleChange(e)}
                      name={prop.description}
                      id={prop.description}
                      required={prop.field_required} 
                      checked={prop.value} 
                      label={prop.pretty_name} />
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
