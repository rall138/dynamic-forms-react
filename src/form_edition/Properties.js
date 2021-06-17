import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from 'react-bootstrap'
import ScheletonProps from '../files/field_properties.json'
import Constantes from '../files/constantes'
import axios from "axios"
import InsiderForm from "./InsiderForm"

const Properties = (props) => {
  
  const [attributes, setAttributes] = useState(ScheletonProps)
  const [field, setField] = useState()

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

  useEffect(()=>{
    if(props.field !== undefined)
      setField({...props.field})
  }, [props.field])


  useEffect(() => {
    let index = -1
    if (field === undefined || field.id === undefined){
      for(let i = 0; i < attributes.length; i++){
        attributes[i].value = null
      }
    }

    for(let property_name in field){
      index = returnPropertyIndex(property_name)
      if (index > -1)
      attributes[index].value = field[property_name] // field[description]
    }
    setAttributes([...attributes])
  }, [field])

  /* 
     * Retornamos el indice de la propiedad que esta dentro de attributes
     * --> attributes.id vs field.id
     * --> attributes.name vs field.name
     * --> attributes.pretty_name vs field.pretty_name
    */

  const returnPropertyIndex = (prop_name) =>{
    let itemFound = false
    let index = 0
    while(!itemFound && index < attributes.length){
      if (attributes[index].description === prop_name){
        itemFound = true
      }else{
        index++
      }
    }
    return index = itemFound ? index : -1;
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
        
        <InsiderForm
          mode={props.mode}
          parent_id={props.parent_id}
          onShow={()=>props.onShow()}
          onHide={(message)=>props.onHide(message)}
          field={field} attributes={attributes}
        />

      </Modal.Body>
    </Modal>
  )
}

export default Properties
