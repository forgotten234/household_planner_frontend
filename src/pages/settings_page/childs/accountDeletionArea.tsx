import { useContext, useEffect, useState } from "react";
import '../settings_style.css'
import { ListGroup } from "react-bootstrap";
import MainButton from "../../../components/button/mainButton";
import {AuthContext} from '../../../contexts/AuthContext';
const AccountDeletionArea = () => {
  const { auth, setAuthData }: any = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState("");
  const [updatePage, setUpdatePage] = useState(0)
  const [items, setItems] = useState([{
    user_name: "",
    id: ""
  }])

  // const makeUserAdmin = async (id: any) => {

  // }

  const deleteUser = async (id: any) => {
    const mutation = 
    `
      mutation {
        deleteUserAsAdmin(id: "${selectedItem}") {
          message
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
    setUpdatePage(prevState => prevState+1)
  }

  useEffect(()=>{
    const getUsers = async () => {
      const query = 
        `
          query Users {
            users {
              user_name
              id
            }
          }
        `;
        const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ query: query }),
        });
        const responseData = await response.json();
        setItems(responseData.data.users)
    }
    getUsers()
  },[updatePage])

  return (
    <div style={{marginTop: '-15px'}}>
      <h2 className='fontStyle'>Users</h2>
      <div className='fontStyle' style={{marginBottom: '5px', marginTop: '-10px'}}>Change other</div>
      <ListGroup style={{ maxHeight: '150px', overflowY: 'scroll' }}>
        {items.map((item) => (
          <ListGroup.Item
            key={item.id}
            active={selectedItem === item.id}
            onClick={() => {setSelectedItem(item.id)
            console.log(selectedItem)}}
            action
          >
            {item.user_name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div style={{marginTop: '10px'}}>
        <MainButton buttonText={"Delete user"} handleClick={() => deleteUser(selectedItem)}></MainButton>
        {/* <MainButton buttonText={"Make admin"} handleClick={makeUserAdmin(selectedItem)}></MainButton> */}
      </div>
    </div>
  )
}

export default AccountDeletionArea