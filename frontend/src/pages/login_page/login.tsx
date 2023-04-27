import './login_style.css'
import MainImage from '../../components/image/mainImage';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import MainForm from '../../components/form/mainForm';
const LoginPage = () => {
  return(
    <div>
      <MainImage position='right'/>
      <div className='mainArea'>
        <MainForm heading={"Login"} subHeadline={"And plan your shit."} checkboxText={"Remember me"} buttonText={"Login"}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{marginTop: '10px'}}><div className='fontStyle'>Email</div></Form.Label>
            <Form.Control type="email" placeholder="Enter email" style={{fontFamily: 'SF Pro Text'}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><div className='fontStyle'>Password</div></Form.Label>
            <Form.Control type="password" placeholder="Password" style={{fontFamily: 'SF Pro Text'}}/>
          </Form.Group>  
        </MainForm>
        <div style={{marginTop: '10px'}}>
            Don't have an Account?  
            <Link to="/register" style={{marginLeft: '5px'}}>
              Register here.
            </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;