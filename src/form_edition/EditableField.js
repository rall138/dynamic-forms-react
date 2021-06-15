import React, {useState, useEffect} from "react"
import {Button} from 'react-bootstrap'
import '../css/fields.css'

const EditableField = (props) => {

  return(
    
    props.field.id >= 0 ? 

      <div className="field">
        <button className="rounded-button" onClick={()=>props.handleDeleteField(props.field)}>X</button>
        <div onClick={()=> props.handleClick()}>
          <div className="field-title-container">
            <span className="field-title">{"Name: "+props.field.description}</span>
          </div>
          <div>
            <span className="field-data-type">{"Data type: "+props.field.field_type}</span>
          </div>
        </div> 
      </div>
      :
      <Button className="button-success-block" onClick={()=>props.handleAdd()} variant="success" block>
        Add new element</Button>
    
  )
}

export default EditableField