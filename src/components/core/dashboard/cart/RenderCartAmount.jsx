import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'

const RenderCartAmount = () => {
    const{total,totalItems}=useSelector(state=>state.Cart)
    const handlebuy=()=>{
        console.log("run");
    }
  return (
    <div className='w-[20%]'>
        <p>Total:</p>
        <p>Rs{total}</p>
        <IconBtn text={"buy Now"}  onclick={handlebuy} customClasses={" cursor-pointer"} />
    </div>
  )
}

export default RenderCartAmount