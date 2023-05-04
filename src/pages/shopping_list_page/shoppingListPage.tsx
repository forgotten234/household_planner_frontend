import MainButton from '../../components/button/mainButton';
import MainImage from '../../components/image/mainImage';
import ShoppingListItem from './childs/shoppingListItem';
import './shopping_list_page.css'
import { useContext, useEffect, useState } from 'react';
import AddItemOffCanvas from './childs/addItemOffCanvas';
import {AuthContext} from '../../contexts/AuthContext';
import ShowItemOffCanvas from './childs/showItemOffCanvas';
import SaveListOffCanvas from './childs/saveListOffCanvas';
import { IShoppingListItem } from '../../interfaces/IShoppingListItem';
import LoadListOffCanvas from './childs/loadListOffCanvas';
import DeleteListOffCanvas from './childs/deleteListOffCanvas';
console.log(import.meta.env.VITE_BACKEND_URL)
console.log(import.meta.env)
const ShoppinglistPage = () => {
  const { auth, setAuthData }: any = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    title: "",
    type: "",
    description: ""
  })
  const [showItem, setShowItem] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [showAddList, setShowAddList] = useState(false)
  const [showLoadList, setShowLoadList] = useState(false)
  const [showDeleteList, setShowDeleteList] = useState(false)
  const [shoppingListItems, setShoppingListItems] = useState<IShoppingListItem[]>([])
  const [updatePage, setUpdatePage] = useState(0)
  
  const loadList = async (id:any) => {
    const query = 
      `
        query {
          shoppingItemListById(id: "${id}") {
            items {
              description
              type
              title
            }
          }
        }
      `;
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization':  'Bearer ' + auth.data.token},
        body: JSON.stringify({ query: query }),
      });
      const responseData = await response.json();
      setShoppingListItems(responseData.data.shoppingItemListById.items)
  }

  return (
    <div>
      <MainImage position='right'/>
      <div className='mainArea'>
        <div className='containerUpperArea'>
          <div className='heading'>
            <h2 className='fontStyle'>Shopping List</h2>
            <div className='fontStyle' style={{marginBottom: '5px'}}>Add stuff for yourself.</div>
          </div>
          <div className='buttonsArea'>
            <div className='buttons-row-one'>
              <MainButton buttonText={"Safe list"} handleClick={() => {setShowAddList(prevState => true)}}/>
              <MainButton buttonText={"Add item"} handleClick={() => {setShowAddItem(prevState => true)}}/>
            </div>
            <div className='buttons-row-two'>
              <MainButton buttonText={"Load list"} handleClick={() => {setShowLoadList(prevState => true)}}/>
              <MainButton buttonText={"Delete list"} handleClick={() => {setShowDeleteList(prevState => true)}}/>
            </div>
          </div>
        </div>
        <div className='containerBelowArea'>
          <div>
            {
              shoppingListItems!.map((item: IShoppingListItem) => {
                const key = Math.floor(Math.random()*10000000)
                return (
                  <ShoppingListItem type={item.type} title={item.title} key={key} handleClick={() => {
                    setShowItem(prevState => true)
                    setSelectedItem({
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      type: item.type
                    })
                  }}/>
                )
              })
            }
          </div>
        </div>
      </div>
      {
        showAddItem 
        ? <AddItemOffCanvas
            show={showAddItem} 
            handleClose={(newItem: any) => {
            setShowAddItem(false)
            setUpdatePage(prevState => prevState+1)  
            if(newItem !== undefined) setShoppingListItems([...shoppingListItems!, newItem])
          }}/>
        : <></>
      }
      {
        showItem
        ? <ShowItemOffCanvas 
            heading={selectedItem.title}
            type={selectedItem.type}
            description={selectedItem.description}
            show={showItem}
            id={selectedItem.id}
            handleClose={() => {
              setShowItem(false)
              setUpdatePage(prevState => prevState+1)  
            }}
          />
        : <></>
      }
      {
        showAddList
        ? <SaveListOffCanvas 
            show={showAddList}
            items={shoppingListItems}
            handleClose={() => {
              setShowAddList(false)
              setUpdatePage(prevState => prevState+1)  
            }}
          />
        : <></>
      }
      {
        showLoadList
        ? <LoadListOffCanvas
            show={showLoadList}
            handleClose={() => {
              setShowLoadList(false)
              setUpdatePage(prevState => prevState+1)  
            }}
            loadList={(data:any) => loadList(data)}/>
        : <></>
      }
      {
        showDeleteList
        ? <DeleteListOffCanvas
            show={showDeleteList}
            handleClose={() => {
              setShowDeleteList(false)
              setUpdatePage(prevState => prevState+1)  
              setShoppingListItems([])
            }}
          />
        : <></>
      }
    </div>
  )
}

export default ShoppinglistPage;