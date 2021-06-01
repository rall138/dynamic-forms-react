import React, { useState } from "react"
import { useRouteMatch } from 'react-router-dom'
import DynamicForm from "./DynamicForm";
import Sections from "./Sections"

const styles = {
  tabStyle:{
    display: "inline",
    color:"#f4f3ee",
    backgroundColor:"#2a9d8f",
    marginRight: 5,
    borderStyle:'none',
    borderRadius: "5px 5px 0px 0px",
  },
  borderedBox:{
    borderWidth:"1px",
    borderColor:"white",
    borderStyle:"dashed",
    padding:10,
  },
  borderedBox60:{
    width: "60%",
    borderWidth:"1px",
    borderColor:"white",
    borderStyle:"dashed",
    padding:10,
  },
}

const DynamicFormTabs = (props) => {

  const match = useRouteMatch()
  const [tabKey, setTabKey] = useState('Form')

  return (
    <div style={{padding:20}} >
      <div className='tabGroup'>
          <button className='tab' title="Form" onClick={()=>setTabKey("Form")}>Form</button>
          <button className='tab' title="Sections" onClick={()=>setTabKey("Sections")}>Sections</button>
      </div>
      <div style={tabKey === "Form"? styles.borderedBox60 : styles.borderedBox}>
        {tabKey === "Form" ? <DynamicForm mode={'update'} form_id={match.params.id} /> : 
        <Sections form_id={match.params.id} />}
      </div>
    </div>
  )

}

export default DynamicFormTabs
