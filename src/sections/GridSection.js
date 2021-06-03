import React, { useState, useEffect } from "react"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/sections.css'

const GridSection = (props) => {

    const [section, setSection] = useState(props.section)

    useEffect(()=>{
        let section = {...props.section}
        if (section.id >= 0 && section.name.length >= 15){
            section.name = section.name.substring(0, 14)+"..."
            setSection(section)
        }
    }, [])

    return (
        <div className='bordered-box'>

            {section.id >= 0 ?
                <div className='section-title'>
                    <span>{section.name}</span>
                </div> : ''
            } 

            <div className='center-item'>
                {section.id >= 0 ?
                    <Link className='centered-link' to={`/forms/${props.form_id}/sections/${section.id}/edit`}>Update</Link> 
                    : 
                    <Button onClick={()=>props.handleRemove()} variant="outline-success">Add</Button>
                }
            </div>

            {section.id >= 0 ?
                <div className="anchored-bottom">
                    <button onClick={()=> props.handleRemove()}>
                        [X] Remove section
                    </button>
                </div> : ''
            }
        </div>
)
}

export default GridSection

            /*
            <button className='' onClick={() => {section.id >= 0 ? props.handleUpdate(): props.handleAdd()}}>
                {section.id >= 0 ? 'Update' : 'Add'}
            </button>*/

