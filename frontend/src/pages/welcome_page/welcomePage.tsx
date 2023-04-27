import './welcome_page.css'
import MainButton from '../../components/button/mainButton';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigator = useNavigate();
  return(
    <div>   
      <div className='welcomePage'>
      </div>
      <div className='main-heading'>
        <div className='text'>Household Planner</div>
      </div>
      <div className='button-area'>
          <MainButton buttonText={"Register now"} handleClick={() => navigator("/register")}/>
      </div>
    </div>
  )
}

export default WelcomePage;