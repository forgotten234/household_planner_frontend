import { Navbar, Nav, Container } from 'react-bootstrap';
import './navbar_style.css';
import { useNavigate } from 'react-router-dom';

//TODO: logic for navogate to welcome page if not logged in and to dashboard if logged in from the brand
//TODO: add settings link after login
const Navigationbar = () => {
  const navigator = useNavigate();
  return (
    <Navbar bg="light" expand="lg" className="opacity-50" sticky='top'>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link >
            <div className='navbarTextLeft' onClick={() => navigator("/login")}>
                Login
            </div>
          </Nav.Link>
        </Nav>
        <Navbar.Brand>
          <div className='navbarTextRight' onClick={() => navigator("/")}>
            Household planner
          </div>
        </Navbar.Brand>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigationbar;