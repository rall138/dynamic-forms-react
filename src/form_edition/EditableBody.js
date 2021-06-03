import React, { useEffect, useState } from "react"
import { useRouteMatch, Link } from 'react-router-dom'
import PropTypes from "prop-types"
import {Container, Row, Col} from 'react-bootstrap'
import EditableFields from './EditableField'
import axios from 'axios'
import Constantes from '../files/constantes.json'
import Properties from "./Properties"

const styles = {
  tableWrapper:{
    marginTop:50,
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth:1,
    borderStyle:'dashed',
    borderColor:'white',
    position:'relative',
  },
  tableRow:{
    borderWidth:1,
    borderStyle:'dashed',
    borderColor:'white',
    background:'none',
    margin:15,
  },
  tableRowAdd:{
    background:'none',
  },
  tableCell:{
    width: 300,
    padding: 20,
  },
  addTableCell:{
    position:'relative',
    width: 300,
    height:80,
    padding: 20,
    borderWidth:1,
    borderStyle:'dashed',
    borderColor:'#b5e48c',
  },
  addButtonStyle:{
    margin: 0,
    position: "absolute",
    top: "26%",
    left: "40%",
    borderColor:"#b5e48c",
    color:"#b5e48c",
    background:"none",
  },
  anchoredBottom:{
    position: "absolute",
    bottom: -45,
    left:0,
  },
}

const SectionBody = (props) => {

  const [fields, setEditableFields] = useState([])
  const [rows, setRows] = useState([])
  const [deletedEditableFields, setDeletedEditableFields] = useState([])
  const [columns, setColumns] = useState(2)
  const [message, setMessage] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const match = useRouteMatch()

  useEffect(()=>{
    axios({
      url:Constantes.SERVER_URL+`forms/${match.params.form_id}/sections/${match.params.id}/fields`,
      method: 'get',
      data: ''
    })
    .then(res =>{
      redefineRows(res.data)
    })
    .catch(error => {console.log(error)})

  }, [])

  const redefineRows = (fields) => {
    
    fields = fields.filter(field =>(field.action !== 'delete'))

    let index = 0, row_count = 0, field_count = 0;
    let section_array = [] 
    let rows = []

    while(index < fields.length){
      if (field_count === columns){
        rows.push({id: row_count, fields: section_array})
        row_count++
        section_array = []
      }
      section_array.push(fields[index])
      field_count = (field_count === columns)? 1 : field_count + 1
      index++
    }

    if (field_count === columns){
      rows.push({id: row_count, fields: section_array})
      row_count++
      section_array = []
    }

    section_array.push({id: -1, description:''})
    rows.push({id: row_count, fields: section_array})

    console.log(JSON.stringify(rows))
    setRows(rows)
    setEditableFields(fields)
    
  }

  const deleteField = (field_id) => {
    let field = fields.filter(field =>(field.id === field_id))[0]
    field.action = 'delete'

    deletedEditableFields.push({...field})
    setDeletedEditableFields(deletedEditableFields)
    
    fields[fields.indexOf(field)] = field
    redefineRows(fields)
  }

  const addField = () => {
    fields.push({id: fields.length > 0 ? fields[fields.length -1].id + 1
    : 1, description:"New control", field_type:"text", action:'post', section_id: match.params.id})

    redefineRows(fields)
  }

  const save = () => {
    persisteChanges('delete')
    persisteChanges('post')
    persisteChanges('put')
  }

  const persisteChanges = (action) =>{

    let fieldsAddedOrChanged = action === 'delete' ? deletedEditableFields : 
      fields.filter(field => (field.action === action))
    
      let url = Constantes.SERVER_URL+`forms/${match.params.form_id}/sections/${match.params.id}/fields/`

    fieldsAddedOrChanged.forEach(field =>{
      axios({
        url: action === 'post' ? url : url+field.id, //Agregamos el id de field para put y delete
        method: action,
        data: field,
      })
      .then(res => {
        setMessage(res.message)
      })
      .catch(error => {
        console.log(error)
      })
  
    })

  }

  return (
    <div style={styles.tableWrapper}>

      <Properties show={modalShow} onHide={() => setModalShow(false)} />      

      <div className="float-right-top">
          <Link to={`/forms/${match.params.form_id}/edit`}>Go back to sections</Link>
      </div>

      <Container>
          {rows.map(row =>{
            return(
              <Row key={row.id}>
                {row.fields.map(field =>{
                  return (
                    <Col key={field.id}>
                      <EditableFields 
                      key={field.id}
                      field={field} 
                      handleAdd={() => addField()}
                      handleClick={() => props.callbackClick(field.id, field.field_type)} 
                      handleDeleteField={(field_id) => deleteField(field_id)}/>
                    </Col>
                  )
                })}
              </Row>
            )
          })}
      </Container>
    </div>
  )

}

export default SectionBody
