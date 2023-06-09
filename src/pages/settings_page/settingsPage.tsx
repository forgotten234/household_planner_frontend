import './settings_style.css'
import {AuthContext} from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import MainForm from '../../components/form/mainForm';
import MainImage from '../../components/image/mainImage';
import { Form, Alert } from 'react-bootstrap';
import AccountDeletionArea from './childs/accountDeletionArea';

const SettingsPage = () => {
  const [inputs, setInputs]: any = useState({
    first_name: "",
    second_name: "",
    password: "",
    confirmedPassword: "",
  })
  const { auth, setAuthData }: any = useContext(AuthContext);
  const [showMessageForm, setShowMessageForm] = useState({showForm: false, message: ""})

  const updateUser = async (event: any) => {
    if(inputs.password === inputs.confirmedPassword){
      let inputString = ""
      for (let attribute in inputs) {
        if (inputs[attribute] !== "" && attribute !== "confirmedPassword") {
          // if the attribute is a non-empty string, add it to the concatenated string
          inputString = inputString + attribute + ': "' + inputs[attribute] + '",'
        }
      }
      console.log(inputString, auth.data.email)
      const mutation = 
        `
          mutation {
            updateUser(user: {
              email: "${auth.data.email}",
              ${inputString}
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
        console.log(mutation)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
          body: JSON.stringify({ query: mutation }),
        });
        const responseData = await response.json();
        console.log(response)
        console.log(responseData)
        setShowMessageForm({showForm: true, message: "User updated!"})
    } else {
      setShowMessageForm({showForm: true, message: "Please fill in all necessary Fields!"})
    }
  }

  const updateInput: any = (inputAttribute: any) => (event: any) =>{
    if(inputAttribute !== "termsAndPolicy") {
      setInputs({...inputs, [inputAttribute]: event.target.value})
    }
    else console.log("Something went wrong!")
  }
  console.log(auth.data.role)
  return(
    <div className="settingsPage">
      <MainImage position='right'/>
      <div className={auth.data.role === "admin" ? 'mainAreaAdmin' : 'mainAreaUser'}>
        <MainForm heading={"Settings"} 
          subHeadline={"Change yourself."} 
          buttonText={"Confirm Changes"} 
          submitFunction={updateUser}
        >
        <div id="nameArea" className='twoItemsArea'>
            <Form.Group className="mb-3"style={{marginRight: '5px'}}>
              <Form.Label><div className='fontStyle'>First name</div></Form.Label>
              <Form.Control
                type="textfield" 
                placeholder="First name" 
                style={{fontFamily: 'SF Pro Text'}}
                onChange={updateInput("first_name")}/>
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label><div className='fontStyle'>Second name</div></Form.Label>
              <Form.Control 
                type="textfield" 
                placeholder="Second name" 
                style={{fontFamily: 'SF Pro Text'}}
                onChange={updateInput("second_name")}/>
            </Form.Group> 
          </div>
          <div id="passwordArea" className="twoItemsArea" style={{marginTop: '-10px'}}>
            <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginRight: '5px'}}>
              <Form.Label><div className='fontStyle'>Password</div></Form.Label>
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
        {
          showMessageForm.showForm 
          ? <Alert variant={showMessageForm.message === "User updated!" ? 'success' : 'danger'} style={{marginTop: "15px"}}>
              {showMessageForm.message}
            </Alert>
          : <></>
        }
        <br/>
        {
          auth.data.role === "admin"
          ? <AccountDeletionArea />
          : <></>
        }
      </div>
    </div>
  )
}

export default SettingsPage;