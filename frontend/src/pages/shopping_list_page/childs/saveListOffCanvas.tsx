import { Form } from 'react-bootstrap'
import MainButton from '../../../components/button/mainButton'
import MainOffCanvas from '../../../components/offcanvas/mainOffCanvas'
import {AuthContext} from '../../../contexts/AuthContext'
import { IShoppingListItem } from '../../../interfaces/IShoppingListItem'
import '../shopping_list_page.css'
import ShoppingListItem from './shoppingListItem'
import { useContext, useEffect, useState } from 'react'
const SaveListOffCanvas = (props: any) => {
  const { auth, setAuthData }: any = useContext(AuthContext);
  const [itemIds, setItemIds]: any = useState([])
  const [title, setTitle] = useState("no title")

  let promises: any[] = []
  const createShoppingItems = async ()=> {
    await props.items.forEach(async (item: IShoppingListItem) => {
      const mutation = 
        `
          mutation {
            createShoppingListItem(
              title: "${item.title}",
              type: "${item.type}",
              description: "${item.description}"
            ) {
                id
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
        promises.push(responseData)
        setItemIds([...itemIds, responseData.data.createShoppingListItem.id])
    })
  }

  useEffect(()=> {
    if(itemIds.length === props.items.length && itemIds.length >= 1) safeShoppingList()
  },[itemIds])

  const safeShoppingList = async () => {
    let mutation = 
    `
      mutation {
        safeShoppingListItemList(title: "${title}", items: ["${itemIds}"]) {
          id
          items {
            id
          }
        }
      }
    `;
    const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
      body: JSON.stringify({ query: mutation }),
    });
    const responseData = await response.json();
    console.log(responseData)
    props.handleClose()
  }
  const updateInput: any = (event: any) =>{
    setTitle(event.target.value)
  }
  return(
    <MainOffCanvas show={props.show} handleClose={props.handleClose}>
      <div style={{minWidth: '400px'}}>
        <h4 className='fontStyle'>New list with the following items?</h4>
        <Form.Group className="mb-3" >
          <Form.Label><div className='fontStyle'>Shopping list title</div></Form.Label>
          <Form.Control
            type="textfield" 
            placeholder="Shopping list title" 
            style={{fontFamily: 'SF Pro Text'}}
            onChange={updateInput}/>
        </Form.Group> 
        <div className='containerBelowArea' style={{marginTop: '-5px'}}>
          <div>
            {
              props.items.map((item: any) => {
                const key = Math.floor(Math.random()*10000000)
                return (
                  <ShoppingListItem type={item.type} title={item.title} key={key} noRightButton={true}/>
                )
              })
            }
          </div>
        </div>
        <br></br>
        <MainButton buttonText={"Safe list"} handleClick={() => {createShoppingItems()}}/>
      </div>
    </MainOffCanvas>
  )
}

export default SaveListOffCanvas;