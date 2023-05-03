import { Form, Offcanvas } from 'react-bootstrap';
import MainImage from '../image/mainImage';
import MainForm from '../form/mainForm';
import './main_off_canvas.css'
const MainOffCanvas = (props: any) => {
  const offcanvasStyle = {
    width: '95%', // set the width of the Offcanvas
  };
  return(
    <div>
      <Offcanvas show={props.show} onHide={props.handleClose} style={offcanvasStyle}>
      <MainImage position='left'></MainImage>
        <div className='mainAreaOffCanvas'>
          <Offcanvas.Body>
            {props.children}
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </div>
  )
}

export default MainOffCanvas;