import React from "react"
import PropTypes from "prop-types"
import {Table, Button} from 'react-bootstrap'
import fs from 'fs'
import fieldJsonProperties from '../files/field_properties.json'

const styles={
  title:{
    fontSize:16,
    fontFamily:'monospace',
    color:'none',
  },
  bodyStyle:{
    backgroundColor:'#ede0d4',
    verticalAlign:'top',
  },
}

class Properties extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      properties:'',
      propertiesIterable: [],
    }
  }

  componentDidMount(){
    this.getProperties(fieldJsonProperties)
  }

  getProperties = (propertiesFile) =>{
    let state = {...this.state}
    state.properties = propertiesFile
    
    // Normalizamos el uso para que sea mas facil a la hora de renderizar el componente.
    for (const [key, value] of Object.entries(state.properties)){
      state.propertiesIterable.push({name:key, value:value})
    }
    this.setState(state)
  }

  render () {
    
    return (
      <React.Fragment>
        <div style={styles.bodyStyle}>
          <div style={styles.title}>Properties</div>
          <Table>
            <body>
              {this.state.propertiesIterable.map(prop =>{
                return (<tr><td>{prop.name}</td><td>{prop.value}</td></tr>)
              })}
            </body>
          </Table>
          <Button>Save</Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Properties
