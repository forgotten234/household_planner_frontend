import './button_style.css'

const MainButton = (props: any) => {
  return(
    <button className='button-style' onClick={props.handleClick}>
      <div className='text'>{props.buttonText}</div>
    </button>
  )
}

export default MainButton;