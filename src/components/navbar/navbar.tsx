import { Navbar, Nav, Container } from 'react-bootstrap';
import './navbar_style.css';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import { useContext } from 'react';

//TODO: logic for navogate to welcome page if not logged in and to dashboard if logged in from the brand
//TODO: add settings link after login
const Navigationbar = () => {
  const { auth, setAuthData }: any = useContext(AuthContext);
  const navigator = useNavigate();

  const logoutUser = () => {
    setAuthData(null)
    navigator("/")
  }

  return (
    <Navbar bg="light" expand="lg" className="opacity-50" sticky='top'>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            {
              auth.data
              ? 
                <div>
                  <div className='navbarTextLeft' onClick={() => logoutUser()}>Logout</div>
                  <div className='navbarTextLeft' onClick={() => navigator("/settings")}>Settings</div>
                </div>
              : <div className='navbarTextLeft' onClick={() => navigator("/login")}>
                  Login
                </div>
            }
        </Nav>
        <Navbar.Brand>
          <div className='navbarTextRight' onClick={() => {
              if(auth.data) navigator("/dashboard")
              else navigator("/")
            }
          }>
            Household planner
          </div>
        </Navbar.Brand>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigationbar;