import '../shopping_list_page.css'
import MainOffCanvas from '../../../components/offcanvas/mainOffCanvas';
import MainForm from '../../../components/form/mainForm';
import { Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import PopUp from '../../../components/popUp/popUp';
const AddItemOffCanvas = (props: any) => {
  const { auth, setAuthData }: any = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    title: "no title",
    type: "food",
    description: "no description"
  })
  const [itemAddedMessage, setItemAddedMessage] = useState(false)
  const [responseDataFromApi, setResponseDataFromApi] = useState("")
  const updateInput: any = (inputAttribute: any) => (event: any) =>{
    setInputs({...inputs, [inputAttribute]: event.target.value})
  }

  const addItem = async (event: any) => {
    event.preventDefault()
    setItemAddedMessage(true)
    setResponseDataFromApi("123")
  } 

  return(
    <MainOffCanvas show={props.show} handleClose={props.handleClose}>
      <MainForm 
        heading={"Add item"}
        subHeadline={"Describe items."}
        buttonText={"Add item"}
        submitFunction={addItem}
      >
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label style={{marginTop: '10px'}}><div className='fontStyle'>Title</div></Form.Label>
          <Form.Control 
            type="text" onChange={updateInput("title")}
            placeholder="Enter title" style={{fontFamily: 'SF Pro Text'}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label><div className='fontStyle'>Type</div></Form.Label>
          <Form.Select 
            onChange={
              updateInput("type")

            }
            style={{fontFamily: 'SF Pro Text'}}
          >
            <option>Food</option>
            <option>Beverage</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label><div className='fontStyle'>Description</div></Form.Label>
          <Form.Control 
            type="text" onChange={updateInput("description")}
            placeholder="Enter description" style={{fontFamily: 'SF Pro Text', height: '100px'}}/>
        </Form.Group>
      </MainForm>
      <PopUp 
          showWaitingMessage={itemAddedMessage} 
          heading={"Add item.."} 
          mainText={"Item added!"} 
          spinnerShowReactionBy={responseDataFromApi}
          noButton={false}
          handleClose={() => 
            {
              setItemAddedMessage(prevState => false)
              props.handleClose(inputs)
            }
          }
          buttonFunction={() => {
            setItemAddedMessage(prevState => false)
            props.handleClose(inputs)
          }}
          ></PopUp>
    </MainOffCanvas>
  )
}

export default AddItemOffCanvas;