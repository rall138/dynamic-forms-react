import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ConfirmAction = (props) => {

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered >
            <Modal.Header>
                <Modal.Title>Confirm action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.confirmationMessage}
            </Modal.Body>
            <div className="button-group-container">
                <div className="button-group margin-right-bottom-5">
                    <Button className="" onClick={()=>props.onHideConfirm({message:'Operation Cancelled'})} variant='danger'>Cancel</Button>
                    <Button className="" onClick={()=>props.onHideConfirm({message:'Operation Confirmed'})} variant='success'>Confirm</Button>
                </div>
            </div>
        </Modal>
    )

}

export default ConfirmAction