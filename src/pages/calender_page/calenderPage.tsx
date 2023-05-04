import { useContext, useEffect, useState } from 'react';
import MainImage from '../../components/image/mainImage'
import './calender_page.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay, parseISO } from 'date-fns';
import MainButton from '../../components/button/mainButton';
import AddCalenderItemOffCanvas from './childs/addCalenderItemOffCanvas';
import {AuthContext} from '../../contexts/AuthContext';
const CalenderPage = () => {
  const [date, setDate]: any = useState(new Date());
  const [datesWithPoints, setDatesWithPoints] = useState([]);
  const [showAddCalenderItem, setShowAddCalenderItem] = useState(false)
  const [updatePage, setUpdatePage] = useState(0)
  const { auth }: any = useContext(AuthContext);

  useEffect(() => {
    const getDates = async () => {
      const query = 
      `
        query {
          calenderItemsFromUser(id: "${auth.data.id}") {
            date
          }
        }
      `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
        body: JSON.stringify({ query: query }),
      });
      const responseData = await response.json();
      setDatesWithPoints(responseData.data.calenderItemsFromUser)
    }
    getDates()
  }, [updatePage])

  return(
    <div>
      <MainImage position='right'/>
      <div className='mainArea'>
        <div className='heading'>
          <h2 className='fontStyle'>Calender</h2>
          <div className='fontStyle' style={{marginBottom: '5px'}}>See when you payed something.</div>
        <div>
          <div className='buttonsArea'>
              <div className='buttons-row-one'>
                <MainButton buttonText={"Add Calender Item"} handleClick={() => {setShowAddCalenderItem(prevState => true)}}/>
              </div>
            </div>
            <div className='calendar-container'>
              <Calendar onChange={setDate} value={date} tileContent={({ date }) => {
                  const hasPoint = datesWithPoints.some((d: any) => isSameDay(parseISO(d.date), date));
                  return (
                    <div>
                      {hasPoint && <span style={{ fontSize: "15px", color: '#A49956' }}>&#8226;</span>}
                    </div>
                  );
                }}
              />
            </div>
            <p className='text-center'>
              <span className='fontStyle'>Selected Date:</span>{' '}
              {date.toDateString()}
            </p>
          </div>
        </div>
      </div>
      {
        showAddCalenderItem
        ? <AddCalenderItemOffCanvas 
            show={showAddCalenderItem}
            handleClose={() => {
              setShowAddCalenderItem(false)
              setUpdatePage(prevState => prevState+1)
            }}
          />
        : <></>
      }
    </div>
  )
}

export default CalenderPage;