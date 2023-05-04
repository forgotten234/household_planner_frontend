import { Alert, Form } from 'react-bootstrap'
import MainForm from '../../../components/form/mainForm'
import MainOffCanvas from '../../../components/offcanvas/mainOffCanvas'
import '../statistic_page.css'
import { useContext, useState } from 'react'
import {AuthContext} from '../../../contexts/AuthContext'

const AddPurchaseItemOffCanvas = (props: any) => {
  const [inputs, setInputs] = useState({
    type: "food",
    title: "",
    price: 0,
  })
  const [showError, setShowError] = useState(false)
  const { auth, setAuthData }: any = useContext(AuthContext);

  const addPurchaseItem = async () => {
    if(inputs.title.length > 0 && inputs.price > 0) {
      const mutation = 
      `
        mutation {
          createPurchaseItem(title: "${inputs.title}", type: "${inputs.type}", price: ${inputs.price}) {
            title
            type
            price
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
        heading={"Add purchase"}
        subHeadline={"Describe purchases."}
        buttonText={"Add purchase"}
        submitFunction={() => addPurchaseItem()}
      >
        <Form.Group className="mb-3"style={{marginRight: '5px'}}>
          <Form.Label><div className='fontStyle'>Title</div></Form.Label>
          <Form.Control
            type="textfield" 
            placeholder="Title" 
            style={{fontFamily: 'SF Pro Text'}}
            onChange={updateInput("title")}/>
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
        <Form.Group className="mb-3">
          <Form.Label><div className='fontStyle'>Price</div></Form.Label>
          <Form.Control 
            type="textfield" 
            placeholder="Price" 
            style={{fontFamily: 'SF Pro Text'}}
            onChange={updateInput("price")}/>
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

export default AddPurchaseItemOffCanvas