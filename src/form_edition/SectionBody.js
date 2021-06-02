import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {Table, Button, Row} from 'react-bootstrap'
import Fields from './Fields'
import axios from 'axios'
import Statics from '../HttpRoutes'

const styles = {
  tableWrapper:{
    margin:15,
    padding:10,
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

/**
 * El concepto de TableRow viene dado por la necesidad de crear formulario tabulares
 * con filas y cantidad de columnas a selección del usuario; cada fila engloba un conjunto
 * de Fields o campos y también posicionadores.
 */
class TableRow extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fields:[],
    }
  }

  componentDidMount(){
    let state = {...this.state}
    fields = props.row.fields
    this.setState(state)
  }

  render(){
    return(
      <tr style={styles.tableRow}>
        {props.row.fields.map(field =>{
          return(
            <td style={field != null ? styles.tableCell: styles.addTableCell}>
              {field != null ? 
            </td>
          )
        })}
      </tr>
    )
  }

}

const SectionBody = (props) => {

  const [fields, setFields] = useState([])
  const [rows, setRows] = useState([])
  const [deletedFields, setDeletedFields] = useState([])
  const [columns, setColumns] = useState(2)
  const [message, setMessage] = useState('')

  useEffect(()=>{
    axios({
      url:Statics.server_url+'forms/'+props.parent_id.form_id+'/sections/'+
          props.parent_id.section_id+'/fields',
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

    section_array.push(null)
    rows.push({id: row_count, fields: section_array})

    setRows(rows)
    setFields(fields)
    
  }

  const deleteField = (field_id) => {
    let field = fields.filter(field =>(field.id === field_id))[0]
    field.action = 'delete'

    deletedFields.push({...field})
    setDeletedFields(deletedFields)
    
    fields[fields.indexOf(field)] = field
    redefineRows(fields)
  }

  const addField = () => {
    fields.push({id: fields.length > 0 ? fields[fields.length -1].id + 1
    : 1, description:"New control", field_type:"text", action:'post', section_id:props.parent_id.section_id})

    redefineRows(fields)
  }

  const save = () => {
    persisteChanges('delete')
    persisteChanges('post')
    persisteChanges('put')
  }

  const persisteChanges = (action) =>{

    let fieldsAddedOrChanged = action === 'delete' ? deletedFields : 
      fields.filter(field => (field.action === action))
    
      let url = Statics.server_url+'forms/'+props.parent_id.form_id+
      '/sections/'+props.parent_id.section_id+'/fields/'

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
      <Container>
          {rows.map(row =>{
            <Row>
              {row.fields.map(field =>{
                return (
                  field.id >= 0 ?
                  <Fields field={field} handleClick={() => props.callbackClick(field.id, field.field_type)} 
                  handleDeleteField={(field_id) => props.handleDeleteField(field_id)}/> : 
                  <Button onClick={()=> props.handleAddField()} style={styles.addButtonStyle}>Add</Button>
                )
              })}
            </Row>
          })}
      </Container>
      <div style={styles.anchoredBottom}><Button onClick={()=> save()}>Save</Button></div>
    </div>
  )

}

export default SectionBody
