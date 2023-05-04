import './mainImage.css';
const MainImage = (props: any) => {

  if(props.position === 'right') {
    return(
      // <img src={pictureRight} className='imageRight'/>
      <div className='imageRight'>
      </div>
    )
  } else if(props.position === 'left') {
    return(
      <div className='imageLeft'>
      </div>
    )
  } else {
    return(
      <h1>Please definie position property!</h1>
    )
  }
}

export default MainImage;