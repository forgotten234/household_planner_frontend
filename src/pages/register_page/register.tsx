import './register_style.css'
import MainImage from '../../components/image/mainImage';
import { Link } from 'react-router-dom';
import MainForm from '../../components/form/mainForm';
import { useEffect, useState } from 'react';
import { Alert, Form, Modal } from 'react-bootstrap';
import PopUp from '../../components/popUp/popUp';
const Register = () => {
  //#region states
  const [inputs, setInputs] = useState({
    firstName: "",
    secondName: "",
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    termsAndPolicy: false
  })
  const [showErrorMessageForm, setShowErrorMessageForm] = useState(false)
  const [showErrorMessagePopUp, setShowErrorMessagePopUp] = useState(false)
  const [userCreatedResponse, setUserCreatedResponse] = useState(null)
  const [showWaitingMessage, setShowWaitingMessage] = useState(false)
  const [showAcceptingMessage, setShowAcceptingMessage] = useState(false)
  //#endregion

  //#region life cycle methods
  useEffect(() => {
    if(userCreatedResponse) {
      setShowAcceptingMessage(prevState => true)
      console.log(userCreatedResponse, showAcceptingMessage, showWaitingMessage)
    }
  }, [userCreatedResponse])
  //#endregion

  //#region form functions
  const updateInput: any = (inputAttribute: any) => (event: any) =>{
    if(inputAttribute !== "termsAndPolicy") {
      setInputs({...inputs, [inputAttribute]: event.target.value})
    }
    else console.log("Something went wrong!")
  }

  const updateCheckboxInput = () => {
    setInputs({...inputs, termsAndPolicy: !inputs.termsAndPolicy})
  }

  const createAccount = async (event: any) => {
    event.preventDefault();
    console.log(inputs.password === inputs.confirmedPassword && inputs.termsAndPolicy && inputs.userName != "")
    if(inputs.password === inputs.confirmedPassword && inputs.termsAndPolicy){
      const mutation = 
      `
        mutation {
          register(user: {
            email: "${inputs.email}",
            password: "${inputs.password}"
            user_name: "${inputs.userName}",
            first_name: "${inputs.firstName}"
            second_name: "${inputs.secondName}"
          }) {
            message
            token
            user {
              email
              user_name
              id
              second_name
              first_name
            }
          }
        }
      `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });
      setShowWaitingMessage(true)
      const responseData = await response.json();
      if(responseData.errors !== undefined) setShowErrorMessagePopUp(prevState => false)
      else setUserCreatedResponse(responseData)
    } else {
      setShowErrorMessageForm(true)
    }
  }
  //#endregion
  return(
    <div className='registerPage'>
      <MainImage position='right'/>
        <div className='mainArea'>
          <MainForm 
            heading={"Create Account"} 
            subHeadline={"For yourself."} 
            checkboxText={"I agree to all Terms and Privacy policy.*"} 
            buttonText={"Create Account"} 
            submitFunction={createAccount}
            checkBoxFunction={updateCheckboxInput}>
            <div id="nameArea" className='twoItemsArea'>
              <Form.Group className="mb-3"style={{marginRight: '5px'}}>
                <Form.Label><div className='fontStyle'>First name</div></Form.Label>
                <Form.Control
                  type="textfield" 
                  placeholder="First name" 
                  style={{fontFamily: 'SF Pro Text'}}
                  onChange={updateInput("firstName")}/>
              </Form.Group> 
              <Form.Group className="mb-3">
                <Form.Label><div className='fontStyle'>Second name</div></Form.Label>
                <Form.Control 
                  type="textfield" 
                  placeholder="Second name" 
                  style={{fontFamily: 'SF Pro Text'}}
                  onChange={updateInput("secondName")}/>
              </Form.Group> 
            </div>
            <div id="nameArea" className='twoItemsArea'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label ><div className='fontStyle'>Email*</div></Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  style={{fontFamily: 'SF Pro Text'}}
                  onChange={updateInput("email")}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label ><div className='fontStyle'>Username*</div></Form.Label>
                <Form.Control 
                  type="textfield" 
                  placeholder="Enter user name" 
                  style={{fontFamily: 'SF Pro Text'}}
                  onChange={updateInput("userName")}/>
              </Form.Group>
            </div>
            <div id="passwordArea" className="twoItemsArea">
              <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginRight: '5px'}}>
                <Form.Label><div className='fontStyle'>Password*</div></Form.Label>
                <Form.Control type="password" placeholder="Password" style={{fontFamily: 'SF Pro Text'}}
                onChange={updateInput("password")}/>
              </Form.Group> 
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><div className='fontStyle'>Confirm password*</div></Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Confirm password" 
                  style={{fontFamily: 'SF Pro Text'}}
                  onChange={updateInput("confirmedPassword")}/>
              </Form.Group> 
            </div> 
          </MainForm>
        <div style={{marginTop: '10px'}}>
            Have an Account?  
            <Link to="/login" style={{marginLeft: '5px'}}>
              Login here.
            </Link>
        </div>
        {
          showErrorMessageForm 
          ? <Alert variant={'danger'} style={{marginTop: "15px"}}>
              Please fill in all necessary fields!
            </Alert>
          : <></>
        }
        <PopUp 
          showWaitingMessage={showWaitingMessage} 
          heading={"User creation.."} 
          mainText={"User created!"} 
          spinnerShowReactionBy={userCreatedResponse}
          buttonFunction={() => setShowWaitingMessage(prevState => false)}
          handleClose={() => setShowWaitingMessage(prevState => false)}
          errorAvailable={showErrorMessagePopUp}></PopUp>
      </div>

    </div>
  )
}

export default Register;