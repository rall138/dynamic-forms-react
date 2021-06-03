import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { Col, Container, Row } from "react-bootstrap"
import axios from 'axios'
import Statics from '../HttpRoutes'
import GridSection from "./GridSection"

const styles = {
  borderedBox:{
    borderWidth:"1px",
    borderColor:"white",
    borderStyle:"dashed",
    padding:10,
    alignContent:"center",
    backgroundColor:"none",
    width:200,
    height: 200,
    marginLeft:10,
    position: "relative",
  },
  buttonStyle:{
    margin: 0,
    position: "absolute",
    top: "42%",
    left: "34%",
    borderColor:"#349D8F",
    color:"#349D8F",
    background:"none",
  },
  updateButtonStyle:{
    margin: 0,
    position: "absolute",
    top: "42%",
    left: "34%",
    borderColor:"#e76f51",
    color:"#e76f51",
    background:"none",
  },
  anchoredBottom:{
    position: "absolute",
    bottom:5,
    left:5,
    backgroundColor:"#e63946",
    padding:5,
  },
  anchorStyle:{
    color:"#f4f1de",
  },
  labelStyle:{
    color:"#284b63",
  },
  anchoredTop:{
    position: "absolute",
    top:-2,
    right:5,
    backgroundColor:"#ffb703",
    padding:5,
    borderRadius:"0px 0px 5px 5px",
  },
}

const Sections = (props) => {

  const [rows, setRows] = useState([{id : "", sections: []}])
  const [sections, setSections] = useState([])
  const [columns, setColumns] = useState(4)

  useEffect(()=>{

    axios({
      url: Statics.server_url+'/forms/'+props.form_id+'/sections',
      method: 'get',
      data: ''
    })
    .then(res => {
      redefineRows(res.data)
    })
    .catch(err =>{console.log(err)})
    
  }, [])

  // Dividimos en 4 la cantidad de columnas que mostraremos osea las secciones por fila.
  const redefineRows = (sections) => {
    
    sections = sections.filter(sec =>(sec.id >= 0))

    let index = 0, row_count = 0, section_count = 0;
    let section_array = [] 
    let rows = []

    while(index < sections.length){
      if (section_count === columns){
        rows.push({id: row_count, sections: section_array})
        row_count++
        section_array = []
      }
      section_array.push(sections[index])
      section_count = (section_count === columns)? 1 : section_count + 1
      index++
    }

    if (section_count === columns ){
      rows.push({id: row_count, sections: section_array})
      row_count++
      section_array = []
    }

    section_array.push({id:-1})
    rows.push({id: row_count, sections: section_array})

    setSections(sections)
    setRows(rows)
  }

  const addSection = () => {

    let section_name = prompt("Section name:")
    let id = sections.length > 0 ? sections[sections.length-1].id + 1 : 1
    let section = {name: section_name, order: 0, form_id: props.form_id, columns: 1}

    axios({
      url: Statics.server_url+'forms/'+props.form_id+'/sections/',
      method: 'post',
      data: section
    })
    .then(res=>{
      if (res.data.response === 'Ok'){
        sections.push({id: id, name: section_name})
        redefineRows(sections)
      }
    })
    .catch(err => {console.log(err)})

  };

  /*
  updateSection = (section_id) => {
    window.location.replace(Statics.server_url+'forms/'+props.form_id+'/sections/'+section_id+'/edit')
  }*/

  const removeSection = (section_id) => {
    let confirmation = window.confirm("You're just about removing this section\n are you sure? ")
    if (confirmation){
      axios({
        url: Statics.server_url+'forms/'+props.form_id+'/sections/'+section_id,
        method: 'delete',
        data: ''
      })
      .then(res =>{
        if(res.data.response === "Ok"){
          sections = sections.filter(section => (section.id !== section_id))
          redefineRows(sections)
        }
      })
      .catch(err =>{
        console.log(err)
      })
    }

  }

  return (
    <Container>
      {rows.map(row => {
        return(
          <Row style={{padding:10}} key={row.id}>
            {row.sections.map(section =>{
              return(
                  <Col key={section.id}>
                    <GridSection
                      form_id={props.form_id}
                      key={section.id}
                      section={section}
                      handleAdd={() => addSection()}
                      handleRemove={() => removeSection(section.id)} 
                    />
                  </Col>
                  )
                })
            }
          </Row>
          )
      })}
    </Container>
  )

}

export default Sections
