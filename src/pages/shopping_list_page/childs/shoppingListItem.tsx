import '../shopping_list_page.css'
import { Icon } from '@iconify/react';

const ShoppingListItem = (props: any) => {
  
  const iconSelection = (input: string) => {
    if(input.toLocaleLowerCase() === "beverage") return "zondicons:beverage"
    else if (input === "food") return "mdi:food-ramen"
    else return "material-symbols:more-outline-sharp"
  }

  return(
    <div className='shoppingListItemContainer' onClick={props.handleClick}>
      <Icon icon={iconSelection(props.type)} className={props.type === "Beverage" ? 'iconLeftSmall' : 'iconLeft'}/>
      <div className='textArea'>
        <div className='upperText'>
          {props.type}
        </div>
        <div className='textBelow'>
          {props.title}
        </div>
      </div>
      {
        props.noRightButton
        ? <></>
        : <Icon icon="material-symbols:arrow-forward-ios-rounded" className='iconRight'/>
      } 
    </div>
  )
}

export default ShoppingListItem;