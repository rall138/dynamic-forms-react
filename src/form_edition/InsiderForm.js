import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Constantes from '../files/constantes.json'
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
        tempField[e.target.name] = e.target.value
        setField(tempField)
    }

    const handleSubmit = () => {

        const form_control = document.getElementById('form_control');
    
        let url = Constantes.SERVER_URL+'forms/'+props.parent_id.form_id+'/sections/'+
        props.parent_id.section_id+'/fields/'
    
        let method = ''
        let data = { field }
    
        switch(props.mode){
          case Constantes.TRANSACTION_MODE.NEW:
            method = 'post'
            break;
          case Constantes.TRANSACTION_MODE.UPDATE:
              url += field.id
              method = 'put'
              break;
          case Constantes.TRANSACTION_MODE.DELETE:
              url += field.id
              method = 'delete'
              data = ''
              break;
        }

        console.log(url)
    
        let message = ''
        if (form_control.checkValidity()){
          axios({
            url: url,
            method: method,
            data: data
          })
          .then(res =>{
            if(res.data.response === 'Ok'){
                console.log(res.data.response)
                message = {message: res.data.message, variant: 'success'}
                props.onHide(message)
            }
          })
          .catch(error => {console.log(error)
            message = {message: error, variant: 'danger'}
            props.onHide(message)
          })
        }
    }    

    return(
        <Form key="form_control" id="form_control" className="modal-form">
            {attributes.map(attr =>{
                
                return(

                    <Form.Group style={{display: attr.visible ? 'default': 'none'}}>

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
                                return(<option>{opt}</option>)
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