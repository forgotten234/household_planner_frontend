import './dashboard_page.css'
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
const DashboardPage = () => {
  const navigator = useNavigate();
  return(
    <div>   
      <div className='dashboardPage'>
        <div className='container'>
          <div className='rectangleHeadline'>
            <h1 className='headline'>
              Welcome!
            </h1>
            <h2 className='subheadline'>
              Plan your shit now!
            </h2>
          </div>
          <div className='rectangleNavigation'>
            <div className="grid-nav-container">
              <div className="grid-nav-item" onClick={() => navigator("/shoppinglist")}>
                <div className='grid-nav-item-headline'>Shopping List</div>
                <Icon icon="mdi:format-list-bulleted" className='grid-nav-item-icon'/>
              </div>
              <div className="grid-nav-item" onClick={() => navigator("/bankbalance")}>
                <div className='grid-nav-item-headline'>Bank balance</div>
                <Icon icon="ri:bank-fill" className='grid-nav-item-icon'/>
              </div>
              <div className="grid-nav-item" onClick={() => navigator("/calender")}>
                <div className='grid-nav-item-headline'>Calender</div>
                <Icon icon="uil:calender" className='grid-nav-item-icon'/>
              </div>
              <div className="grid-nav-item" onClick={() => navigator("/statistic")}>
                <div className='grid-nav-item-headline'>Statistic</div>
                <Icon icon="wpf:statistics" className='grid-nav-item-icon-statistic'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;