import '../shopping_list_page.css'
import MainOffCanvas from '../../../components/offcanvas/mainOffCanvas';
import MainForm from '../../../components/form/mainForm';
import { Form, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import MainButton from '../../../components/button/mainButton';

const DeleteListOffCanvas = (props: any) => {
  const { auth, setAuthData }: any = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([{
    title: "",
    id: ""
  }])
  
  const loadLists = async () => {
    const query = 
    `
      query {
        shoppingItemListsByUser(ownerId: "${auth.data.id}") {
          id
          title
        }
      }
    `;
    console.log(query)
    const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
      body: JSON.stringify({ query: query }),
    });
    const responseData = await response.json();
    setItems(responseData.data.shoppingItemListsByUser)
  }

  useEffect(() => {
    console.log(auth.data.id)
    loadLists()
  }, [])

  const deleteList = async () => {
    const mutation = 
    `
      mutation Mutation{
        deleteShoppingItemListByUser(id: "${selectedItem}") {
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
    console.log(responseData)
  }

  return (
    <MainOffCanvas show={props.show} handleClose={props.handleClose}>
      <div>
        <h2 className='fontStyle'>Shopping lists</h2>
        <div className='fontStyle' style={{marginBottom: '5px'}}>Delete lists.</div>
        <ListGroup style={{ maxHeight: '150px', overflowY: 'scroll' }}>
          {items.map((item) => (
            <ListGroup.Item
              key={item.id}
              active={selectedItem === item.id}
              onClick={() => {setSelectedItem(item.id)
              console.log(selectedItem)}}
              action
            >
              {item.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div style={{marginTop: '10px'}}>
          <MainButton buttonText={"Delete list"} handleClick={() => {
            deleteList()
            props.handleClose()
          }}></MainButton>
        </div>
      </div>
    </MainOffCanvas>
  )
}

export default DeleteListOffCanvas