import { useContext } from 'react';
import MainButton from '../../../components/button/mainButton'
import MainOffCanvas from '../../../components/offcanvas/mainOffCanvas'
import '../shopping_list_page.css'
import {AuthContext} from '../../../contexts/AuthContext';

const ShowItemOffCanvas = (props: any) => {
  const { auth, setAuthData }: any = useContext(AuthContext);
  const deleteItem = async () => {
    const mutation = 
    `
      mutation {
        deleteShoppingItemByUser(id: "${props.id}") {
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
    props.handleClose()
  }

  return(
    <MainOffCanvas show={props.show} handleClose={props.handleClose}>
      <h2 className='fontStyle'>{props.heading}</h2>
      <div className='fontStyle' style={{marginBottom: '5px'}}>See the item.</div>
      <div className='fontStyle'>Type: {props.type}</div>
      <div className='fontStyle'>Description: {props.description}</div>
      <MainButton 
        buttonText={"Delete item"} handleClick={() => deleteItem()}
      />
    </MainOffCanvas>
  )
}

export default ShowItemOffCanvas