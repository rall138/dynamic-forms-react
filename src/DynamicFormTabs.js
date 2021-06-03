import React, { useState } from "react"
import { useRouteMatch, Link } from 'react-router-dom'
import DynamicForm from "./DynamicForm";
import Sections from "./sections/Sections"

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
    position:"relative",
  },
  borderedBox60:{
    width: "60%",
    borderWidth:"1px",
    borderColor:"white",
    borderStyle:"dashed",
    padding:10,
    position:"relative",
  },
}

const DynamicFormTabs = (props) => {

  const match = useRouteMatch()
  const [tabKey, setTabKey] = useState('Form')

  return (
    <div style={{padding:20, position:"relative"}} >

      <div className='tabGroup'>
          <button className='tab' title="Form" onClick={()=>setTabKey("Form")}>Form</button>
          <button className='tab' title="Sections" onClick={()=>setTabKey("Sections")}>Sections</button>
      </div>

      
      <div style={tabKey === "Form"? styles.borderedBox60 : styles.borderedBox}>

        <div className="float-right-top">
            <Link to={'/forms/'}>Go back to forms</Link>
        </div>

        {tabKey === "Form" ? <DynamicForm mode={'update'} form_id={match.params.id} /> : 
        <Sections form_id={match.params.id} />}
      </div>

    </div>
  )

}

export default DynamicFormTabs
