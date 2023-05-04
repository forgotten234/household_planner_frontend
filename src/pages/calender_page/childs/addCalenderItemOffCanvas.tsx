import { useContext, useState } from 'react'
import MainForm from '../../../components/form/mainForm'
import MainOffCanvas from '../../../components/offcanvas/mainOffCanvas'
import '../calender_page.css'
import {AuthContext} from '../../../contexts/AuthContext'
import { Alert, Form } from 'react-bootstrap'

const AddCalenderItemOffCanvas = (props: any) => {
  const [inputs, setInputs] = useState({
    date: new Date(),
    title: "",
    description: "",
  })
  const [showError, setShowError] = useState(false)
  const { auth, setAuthData }: any = useContext(AuthContext);

  const addCalenderItem = async () => {
    if(inputs.title.length > 0 && inputs.description.length > 0) {
      const mutation = 
      `
        mutation {
          createCalenderItem(title: "${inputs.title}", description: "${inputs.description}", date: "${inputs.date}") {
            date
            description
            title
          }
        }
      `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
        body: JSON.stringify({ query: mutation }),
      });
      const responseData = await response.json();
      console.log(responseData)
      setShowError(false)
      props.handleClose(inputs)
    } else {
      setShowError(true)
    }
  }
  //#region form functions
  const updateInput: any = (inputAttribute: any) => (event: any) =>{
    setInputs({...inputs, [inputAttribute]: event.target.value})
  }
  return(
    <MainOffCanvas
      show={props.show}
      handleClose={() => props.handleClose()}
    >
      <MainForm
        heading={"Add calender item"}
        subHeadline={"Describe calender item."}
        buttonText={"Add item"}
        submitFunction={() => addCalenderItem()}
      >
        <Form.Group className="mb-3"style={{marginRight: '5px'}}>
          <Form.Label><div className='fontStyle'>Title</div></Form.Label>
          <Form.Control
            type="textfield" 
            placeholder="Title" 
            style={{fontFamily: 'SF Pro Text'}}
            onChange={updateInput("title")}/>
        </Form.Group> 
        <Form.Group className="mb-3">
          <Form.Label><div className='fontStyle'>Description</div></Form.Label>
          <Form.Control 
            type="textfield" 
            placeholder="Description" 
            style={{fontFamily: 'SF Pro Text'}}
            onChange={updateInput("description")}/>
        </Form.Group> 
      </MainForm>
      {
        showError
        ? <Alert variant={'danger'} style={{marginTop: "15px"}}>
            Please fill in all necessary fields!
          </Alert>
        : <></>
      }
    </MainOffCanvas>
  )
}

export default AddCalenderItemOffCanvas