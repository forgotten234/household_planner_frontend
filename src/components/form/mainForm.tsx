import './mainForm.css'
import MainButton from '../button/mainButton';
import Form from 'react-bootstrap/Form';

const MainForm = (props: any) => {
  return (
    <div >
      <h2 className='fontStyle'>{props.heading}</h2>
      <div className='fontStyle' style={{marginBottom: '5px'}}>{props.subHeadline}</div>
      <Form>
        {props.children}
        {
          props.checkboxText 
          ? <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" 
                label={props.checkboxText} 
                style={{fontFamily: 'SF Pro Text'}}
                onChange={props.checkBoxFunction}/>
            </Form.Group>
          : <></>
        }
      </Form>
      <MainButton buttonText={props.buttonText} handleClick={props.submitFunction}></MainButton>
    </div>
  )
}

export default MainForm