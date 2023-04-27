import {Alert, Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import MainButton from '../../components/button/mainButton';

const PopUp = (props: any) => {
  return(
    <Modal show={props.showWaitingMessage} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          props.noSpinner
          ? <div>
              {
                props.errorAvailable 
                ? <Alert variant={'danger'} style={{marginTop: "15px"}}>
                    Something went wrong!
                  </Alert>
                : props.mainText
              }
            </div>
          : <></>
        }
        {
          props.spinnerShowReactionBy 
          ? <div>
              {
                props.errorAvailable 
                ? props.errorMessage
                : props.mainText
              }
            </div>
          : <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
      </Modal.Body>
      <Modal.Footer>
        <MainButton buttonText="Alright!" handleClick={props.buttonFunction}>
        </MainButton>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUp;