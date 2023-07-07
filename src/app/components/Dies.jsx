import React from 'react'

const Dies = (props) => {
let styles = {
  backgroundColor: props.isHeld ? "#59E391" : "white"
}

  return (
    <div style={styles} className="h-[50px] w-[50px] shadow-md rounded-lg flex justify-center
     items-center cursor-pointer">
      <h2 onClick={()=> props.holdDice(props.id)} className='text-xl'>{props.values}</h2>
      </div>
  )
}

export default Dies