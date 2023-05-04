import { useContext, useEffect, useState } from 'react'
import MainButton from '../../components/button/mainButton'
import MainImage from '../../components/image/mainImage'
import './statistic_page.css'
import AddPurchaseItemOffCanvas from './childs/addPurchaseItemOffCanvas'
import Chart from './childs/chart'
import {AuthContext} from '../../contexts/AuthContext'
import { IPurchase } from '../../interfaces/IPurchase'

const StatisticPage = () => {
  const [showAddPurchase, setShowAddPurchase] = useState(false)
  const [labels, setLabels] = useState([""])
  const [data, setData] = useState([0]) 
  const { auth, setAuthData }: any = useContext(AuthContext);
  const [allData, setAllData] = useState({data: {purchaseItemsFromUser: []}})
  const [updatePage, setUpdatePage] = useState(0)
  useEffect(()=>{
    const getPurchases = async () => {
      const query = 
      `
        query {
          purchaseItemsFromUser(id: "${auth.data.id}") {
            title
            type
            price
          }
        }
      `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
        body: JSON.stringify({ query: query }),
      });
      const responseData = await response.json();
      const titles = responseData.data.purchaseItemsFromUser.map((item: IPurchase) => item.title);
      const prices = responseData.data.purchaseItemsFromUser.map((item: IPurchase) => item.price);
      setLabels(titles);
      setData(prices);
    }
    getPurchases()
  },[updatePage])

  return (
    <div>
      <MainImage position='right'/>
      <div className='mainArea'>
        <div className='heading'>
          <h2 className='fontStyle'>Statistics</h2>
          <div className='fontStyle' style={{marginBottom: '5px'}}>Analyze your stuff.</div>
        </div>
        <div>
          <div className='buttonsArea'>
            <div className='buttons-row-one'>
              <MainButton buttonText={"Add purchase item"} handleClick={() => {setShowAddPurchase(prevState => true)}}/>
            </div>
          </div>
        </div>
        <div style={{marginLeft: '-5px'}}>
          <div className='fontStyle' style={{marginBottom: '10px'}}>Total amount of payments:</div>
          <Chart labels={labels} data={data}/>
        </div>
      </div>
      {
        showAddPurchase
        ? <AddPurchaseItemOffCanvas
            show={showAddPurchase}
            handleClose={() => 
              {
                setShowAddPurchase(prevState => false)
                setUpdatePage(prevState => prevState+1)
              }
            }
          />
        : <></>
      }
    </div>  
  )
}

export default StatisticPage;