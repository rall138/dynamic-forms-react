import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { render } from "react-dom"
import axios from 'axios'
import {Button} from 'react-bootstrap'

const Field = (props) => {

  const [minimized, setMinimized] = useState(true)
  const backgroundColor = '#e07a5f'

  const styles = {
    card:{
        backgroundColor:'#457b9d',
        padding:10,
        borderRadius: 5,
        boxShadow:'-10px -10px #e07a5f',
        position:'relative',
      },
      dataType:{
        backgroundColor:'#84a59d',
        padding:10,
      },
      cardTitle:{
        color:'#eae2b7',
        marginBottom:10,
        fontSize:14,
        fontFamily:'monospace',
      },
      title:{
        marginTop:10,
        fontSize:12,
        fontFamily:'monospace',
      },
      titleGroup:{
        padding:5,
        marginTop:10,
        fontSize:14,
        fontFamily:'monospace',
        color:'#eae2b7',
        backgroundColor:backgroundColor,
        borderRadius:'5px 5px 0px 0px',
      },
      conditionsTable:{
        height:80,
        width:'100%',
        backgroundColor:backgroundColor,
      },
      conditionsTableHeader:{
        textAlign:"center",
        fontWeight:'100',
        fontFamily:'monospace',
        color:'#eae2b7',
      },
      conditionsTableField:{
        width:'100%',
        borderTop:'none',
        borderLeft:'none',
        borderRight:'none',
      },
      rightPanel:{
        position: 'absolute',
        right:5,
        top: 5,
      },
      buttonStyle:{
        background:'none',
        borderColor:"#457b9d",
        color:"white",
      },
  }

  return(
    <div onClick={()=> props.handleClick()} style={styles.card}>
      <div style={styles.rightPanel}><Button onClick={()=>props.handleDeleteField(props.field.id)} style={styles.buttonStyle}>[X]</Button></div>
      <span style={styles.cardTitle}>{"Field name: "+props.field.description}</span>
      <div>
        <span style={styles.title}>{"Data type: "+props.field.field_type}</span>
      </div>
    </div>
  )
}

export default Field