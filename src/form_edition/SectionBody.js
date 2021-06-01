import React from "react"
import PropTypes from "prop-types"
import {Table, Button} from 'react-bootstrap'
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
    state.fields = this.props.row.fields
    this.setState(state)
  }

  render(){
    return(
      <tr style={styles.tableRow}>
        {this.props.row.fields.map(field =>{
          return(
            <td style={field != null ? styles.tableCell: styles.addTableCell}>
              {field != null ? 
                <Fields field={field} handleClick={() => this.props.callbackClick(field.id, field.field_type)} 
                handleDeleteField={(field_id) => this.props.handleDeleteField(field_id)}/> : 
                <Button onClick={()=> this.props.handleAddField()} style={styles.addButtonStyle}>Add</Button>}
            </td>
          )
        })}
      </tr>
    )
  }

}

class SectionBody extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      column_number: 2,
      fields: [],
      rows: [],
      deletedFields:[],
    }
  }

  componentDidMount(){
    axios.get(Statics.server_url+'forms/'+this.props.parent_id.form_id+
    '/sections/'+this.props.parent_id.section_id+'/fields')
    .then(res =>{
      let state = {...this.state}
      state.fields = res.data
      this.redifineRows(state.fields)
    })
    .catch(error => {console.log(error)})
  }

  redifineRows = (fields) => {
    
    fields = fields.filter(field =>(field.action !== 'delete'))

    let index = 0, row_count = 0, field_count = 0;
    let section_array = [] 
    let rows = []
    const columns = this.state.column_number

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

    let state = {...this.state}
    state.fields = fields
    state.rows = rows
    this.setState(state)
    
  }

  deleteField = (field_id) => {
    let state = {...this.state}
    let field = state.fields.filter(field =>(field.id === field_id))[0]
    state.deletedFields.push({...field})
    field.action = 'delete'
    state.fields[state.fields.indexOf(field)] = field
    this.redifineRows(state.fields)
  }

  addField = () => {
    let state = {...this.state}
    state.fields.push({id: this.state.fields.length > 0 ? this.state.fields[this.state.fields.length -1].id + 1
    : 1, description:"New control", field_type:"text", action:'post', section_id:this.props.parent_id.section_id})
    this.redifineRows(state.fields)
  }

  save = () => {
    this.persisteChanges('delete')
    this.persisteChanges('post')
    this.persisteChanges('put')
  }

  persisteChanges(action){

    let fieldsAddedOrChanged = action === 'delete' ? this.state.deletedFields : 
      this.state.fields.filter(field => (field.action === action))
    
      let url = Statics.server_url+'forms/'+this.props.parent_id.form_id+
      '/sections/'+this.props.parent_id.section_id+'/fields/'

    fieldsAddedOrChanged.forEach(field =>{

      axios({
        url: action === 'post' ? url : url+field.id, //Agregamos el id de field para put y delete
        method: action,
        data: {field},
      })
      .then(res => {
        let state = {...this.state}
        state.message = res.message
        this.setState(state)
      })
      .catch(error => {
        console.log(error)
      })
  
    })

  }

  render () {
    return (
      <React.Fragment>
        <div style={styles.tableWrapper}>
          <table>
            <tbody>
              {this.state.rows.map(row =>{
                return (
                  <TableRow key={row.id} parent_id={this.props.parent_id}
                    callbackClick={(field_id, field_type) => this.props.callbackClick(field_id, field_type)} 
                    handleDeleteField={(field_id) => this.deleteField(field_id)}
                    handleAddField={() => this.addField()} row={row} 
                  />
                )
              })}
            </tbody>
          </table>
          <div style={styles.anchoredBottom}><Button onClick={()=> this.save()}>Save</Button></div>
        </div>
      </React.Fragment>
    );
  }
}

export default SectionBody
