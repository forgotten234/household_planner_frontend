import './login_style.css'
import MainImage from '../../components/image/mainImage';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import MainForm from '../../components/form/mainForm';
import { useContext, useState } from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import PopUp from '../../components/popUp/popUp';

//TODO: update route
const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const { data, setAuthData }: any = useContext(AuthContext)
  const [showWaitingMessage, setShowWaitingMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const navigator = useNavigate()

  const updateInput: any = (inputAttribute: any) => (event: any) =>{
    if(inputAttribute !== "termsAndPolicy") {
      setInputs({...inputs, [inputAttribute]: event.target.value})
    }
    else console.log("Something went wrong!")
  }
  const updateCheckboxInput: any = () => {
    setInputs({...inputs, rememberMe: !inputs.rememberMe})
  }
  const loginUser = async (event: any) => {
    event.preventDefault();
    setShowWaitingMessage(prevState => true)
    const mutation = 
    `
      mutation {
        login(credentials: {
          password: "${inputs.password}",
          username: "${inputs.email}"
        }) {
          token
          user {
            id
            user_name
            email
          }
          message
        }
      }
    `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    });
    const responseData = await response.json();
    console.log(responseData)
    if(responseData.data.login.message === "Login successful") {
      setShowWaitingMessage(prevState => false)
      setAuthData({
        token: responseData.data.login.token,
        user_name: responseData.data.login.user.user_name,
        email: responseData.data.login.user.email,
      })
      navigator("/")
    }
    else setShowErrorMessage(prevState => true)
  }
  return(
    <div>
      <MainImage position='right'/>
      <div className='mainArea'>
        <MainForm heading={"Login"} checkBoxFunction={updateCheckboxInput}
          subHeadline={"And plan your shit."} submitFunction={loginUser}
          checkboxText={"Remember me"} buttonText={"Login"}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{marginTop: '10px'}}><div className='fontStyle'>Email</div></Form.Label>
            <Form.Control 
              type="email" onChange={updateInput("email")}
              placeholder="Enter email" style={{fontFamily: 'SF Pro Text'}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><div className='fontStyle'>Password</div></Form.Label>
            <Form.Control 
              type="password" onChange={updateInput("password")}
              placeholder="Password" style={{fontFamily: 'SF Pro Text'}}/>
          </Form.Group>  
        </MainForm>
        <div style={{marginTop: '10px'}}>
            Don't have an Account?  
            <Link to="/register" style={{marginLeft: '5px'}}>
              Register here.
            </Link>
        </div>
      </div>
      <PopUp 
          showWaitingMessage={showWaitingMessage} 
          heading={"Log in User.."} 
          mainText={"Login successful!"} 
          spinnerShowReactionBy={data}
          noButton={true}
          handleClose={() => setShowWaitingMessage(prevState => false)}
          errorAvailable={showErrorMessage}></PopUp>
    </div>
  )
}

export default LoginPage;