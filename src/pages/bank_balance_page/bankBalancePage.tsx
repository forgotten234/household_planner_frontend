import { useContext, useEffect, useState } from 'react'
import MainImage from '../../components/image/mainImage'
import './bank_balance.css'
import { IBankBalance } from '../../interfaces/IBankBalance'
import {AuthContext} from '../../contexts/AuthContext'
import MainButton from '../../components/button/mainButton'
import AddBankAccountOffCanvas from './childs/addBankAccountOffCanvas'

const BankBalancePage = () => {
  const [bankAccount, setBankAccount] = useState<IBankBalance>({
    accountName: "",
    iban: "",
    id: "",
    balance: 0
  })
  const [showChangeBankAccount, setShowChangeBankAccount] = useState(false)
  const { auth, setAuthData }: any = useContext(AuthContext);

  const removeBankAccount = async () => {
    const mutation = 
      `
        mutation Mutation {
          deleteBankBalanceFromUser(id: "${bankAccount.id}") {
            id
          }
        }
      `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
        body: JSON.stringify({ query: mutation }),
      });
      const responseData = await response.json();
      setBankAccount({    
        accountName: "",
        iban: ""
      })
  }

  useEffect(() => {
    const getAccount = async () => {
      const query = 
      `
        query BankBalanceFromUser {
          bankBalanceFromUser(id: "${auth.data.id}") {
            accountName
            balance
            iban
            id
          }
        }
      `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
        body: JSON.stringify({ query: query }),
      });
      const responseData = await response.json();
      if(responseData.data.bankBalanceFromUser.length > 0) setBankAccount(responseData.data.bankBalanceFromUser[0])
    }
    getAccount()
  }, [])

  return(
    <div>
      <MainImage position='right'/>
      <div className='mainArea'>
        <h2 className='fontStyle'>Bank balance</h2>
        <div className='fontStyle' style={{marginBottom: '5px'}}>See how rich you are.</div>
        <div className='fontStyle'>Account: {bankAccount?.accountName}</div>
        <div className='fontStyle'>Balance: {bankAccount?.balance}</div>
        <MainButton buttonText={"Remove bank account"} handleClick={() => removeBankAccount()}/>
        <div style={{marginTop: '5px'}}></div>
        <MainButton buttonText={"Add bank account"} handleClick={() => {setShowChangeBankAccount(true)}}/>
      </div>
      {
        showChangeBankAccount
        ? <AddBankAccountOffCanvas
            show={showChangeBankAccount}
            handleClose={(data: any) => {
                setShowChangeBankAccount(false)
                setBankAccount(data)
              }
            }
            updateOrAdd={bankAccount.accountName!.length === 0 ? "add" : "update"}
          />
        : <></>
      }
    </div>
  )
}

export default BankBalancePage;