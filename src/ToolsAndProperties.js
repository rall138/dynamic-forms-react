import React from "react"
import PropTypes from "prop-types"
import ToolBar from './form_edition/ToolBar'
import Properties from './form_edition/Properties'
import SectionBody from './form_edition/SectionBody'

class ToolsAndProperties extends React.Component {

  constructor(props){
    super(props)
    this.state={
      field:{id:0, type:''},
    }
  }

  handleClickOnField = (field_id, field_type) => {
    let state = {...this.state}
    state.field = {id: field_id, type: field_type}
    this.setState(state)
  }

  render () {
    return (
      <React.Fragment>

        <table>
          <tbody>
            <tr>
              <td><ToolBar /></td>
              <td><SectionBody 
              callbackClick={(field_id, field_type)=>this.handleClickOnField(field_id, field_type)} 
              parent_id={{form_id:this.props.form_id, section_id:this.props.section_id}} /></td>
              <td><Properties field_id={this.state.field.id} field_type={this.state.field.type} /></td>
            </tr>
          </tbody>
        </table>

      </React.Fragment>
    );
  }
}

export default ToolsAndProperties
