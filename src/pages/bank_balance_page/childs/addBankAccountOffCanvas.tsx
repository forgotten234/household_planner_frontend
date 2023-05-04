import { Alert, Form } from 'react-bootstrap'
import MainForm from '../../../components/form/mainForm'
import MainOffCanvas from '../../../components/offcanvas/mainOffCanvas'
import './../bank_balance.css'
import { useContext, useState } from 'react'
import {AuthContext} from '../../../contexts/AuthContext'

const AddBankAccountOffCanvas = (props: any) => {
  const [inputs, setInputs] = useState({
    accountName: "",
    iban: "",
    id: "",
    balance: 0
  })
  const [showError, setShowError] = useState(false)
  const { auth, setAuthData }: any = useContext(AuthContext);

  const updateBankAccount = async () => {
    const mutation = 
      `
        mutation {
          updateBankBalanceFromUser(
              id: "${auth.data.id}", 
              accountName: "${props.accountName}", 
              balance: ${0}, 
              iban: "${props.iban}") 
          {
            accountName
            iban
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
      setShowError(false)
      props.handleClose(inputs)
  }

  const createBankAccount = async () => {
    const mutation = 
      `
        mutation {
            createBankBalance(accountName: "${inputs.accountName}", 
            balance: ${0}, 
            iban: "${inputs.iban}"
          ) {
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
      setShowError(false)
      props.handleClose({
        accountName: inputs.accountName,
        iban: inputs.iban,
        id: responseData.data.createBankBalance.id
      })
  }

  const addOrUpdateBankAccount = async () => {
    if(props.updateOrAdd === "update" && inputs.accountName !== "" && inputs.iban !== "") {
      await updateBankAccount()
    } else if (props.updateOrAdd === "add" && inputs.accountName !== "" && inputs.iban !== "") {
      await createBankAccount()
    } else {
      console.log("Can't execute!")
      setShowError(true)
    }
  }

  //#region form functions
  const updateInput: any = (inputAttribute: any) => (event: any) =>{
    setInputs({...inputs, [inputAttribute]: event.target.value})
  }

  return(
    <MainOffCanvas show={props.show} handleClose={() => props.handleClose(inputs)}>
      <MainForm 
        heading={"Bank account"}
        subHeadline={"Add your money."}
        buttonText={"Add / change account"}
        submitFunction={() => addOrUpdateBankAccount()}
      >
        <Form.Group className="mb-3"style={{marginRight: '5px'}}>
          <Form.Label><div className='fontStyle'>Accountname</div></Form.Label>
          <Form.Control
            type="textfield" 
            placeholder="Accountname" 
            style={{fontFamily: 'SF Pro Text'}}
            onChange={updateInput("accountName")}/>
        </Form.Group> 
        <Form.Group className="mb-3">
          <Form.Label><div className='fontStyle'>IBAN</div></Form.Label>
          <Form.Control 
            type="textfield" 
            placeholder="IBAN" 
            style={{fontFamily: 'SF Pro Text'}}
            onChange={updateInput("iban")}/>
        </Form.Group> 
      </MainForm>
      {
          showError
          ? <Alert variant={'danger'} style={{marginTop: "15px"}}>
              Please fill in all necessary fields!
            </Alert>
          : <></>
        }
    </MainOffCanvas>
  )
}

export default AddBankAccountOffCanvas
