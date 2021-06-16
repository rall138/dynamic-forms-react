import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import {transactionMode, server_url} from '../files/constantes'
import axios from 'axios'

const InsiderForm = (props) =>{

    const [field, setField] = useState()
    const [attributes, setAttributes] = useState([])
    const [message] = useState({message: '', variant: ''})

    useEffect(() =>{

        if(props.field != undefined)
            setField({...props.field})

        if(props.attributes != undefined)
            setAttributes([...props.attributes])

    }, [])

    const handleChange = (e) =>{
        let tempField = {...field}
        tempField['section_id'] = props.parent_id.section_id
        tempField[e.target.name] = e.target.value
        setField(tempField)
    }

    const handleSubmit = () => {

        const form_control = document.getElementById('form_control');

        let url = server_url+'forms/'+props.parent_id.form_id+'/sections/'+
        props.parent_id.section_id+'/fields/'
    
        let method = ''
        switch(props.mode){
          case transactionMode.NEW:
            method = 'post'
            delete field.id // WA para evitar la duplicidad de clave, sino estamos forzando su valor.
            break;
          case transactionMode.UPDATE:
              url += field.id
              method = 'put'
              break;
        }
        
        let newMessage = {...message}
        if (form_control.checkValidity()){
          axios({
            url: url,
            method: method,
            data: { field }
          })
          .then(res =>{
            if(res.data.response === 'Ok'){
                newMessage = {message: res.data.message, variant: 'success'}
                props.onHide(newMessage)
            }
          })
          .catch(error => {console.log(error)
            newMessage = {message: error.message, variant: 'danger'}
            console.log(JSON.stringify(error))
            props.onHide(newMessage)
          })
        }
    }    

    return(
        <Form key="form_control" id="form_control" className="modal-form">
            {attributes.map(attr =>{
                
                return(

                    <Form.Group key={'grp_'+attr.id} style={{display: attr.visible ? 'default': 'none'}}>

                        { attr.control_type !== "checkbox" && attr.visible ? 
                            <Form.Label>{attr.pretty_name}</Form.Label>: ''}

                        { attr.control_type === "text" && attr.visible ?
                        <Form.Control key={attr.id} onChange={(e)=>handleChange(e)}
                                name={attr.description}
                                id={attr.description}
                                required={attr.field_required} 
                                type="text" 
                                defaultValue={attr.value}>
                        </Form.Control> : ''}
                        
                        { attr.control_type === "option" && attr.visible ?
                        <Form.Control key={attr.id} as="select" onChange={(e)=>handleChange(e)}
                            name={attr.description}
                            id={attr.description}
                            required={attr.field_required} 
                            type="text" 
                            defaultValue={attr.value}>
                            {attr.options.map(opt => {
                                return(<option key={opt}>{opt}</option>)
                            })}
                        </Form.Control> : ''}                

                        { attr.control_type === "checkbox" && attr.visible ?
                        <Form.Check key={attr.id} onChange={(e)=>handleChange(e)}
                            name={attr.description}
                            id={attr.description}
                            required={attr.field_required} 
                            defaultChecked={attr.value} 
                            label={attr.pretty_name} />
                        : ''}

                    </Form.Group>
                )

            })}
            
            <div className="button-group-container">
                <div className='button-group'>
                    <Button id="btn_close" onClick={() => props.onHide(message)}>Close</Button>
                    <Button variant="success" onClick={() => handleSubmit()}>Confirm</Button>
                </div>
            </div>
        </Form>
    )
}

export default InsiderForm