import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateProfilePic } from '../../../../services/operation/profile';

const UpdatePhoto = () => {
    const {token}=useSelector(state=>state.auth);
    const {profile:user}=useSelector(state=>state.profile);
    const fileInputRef=useRef(null)
    const dispatch=useDispatch();
    const[loading,setloading]=useState(false);
    const[preview,setpreview]=useState(null)
    const [image,SetImage]=useState(null);


 

    const handleclick=()=>{
      fileInputRef.current.click();
    }

    const handlefilechange=(e)=>{
     const file=e.target.files[0];
     if(file){
      SetImage(file);
      previewFile(file);
     }
    }
    const previewFile=(file)=>{
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setpreview(reader.result);
      }
    }
    const UploadFile=()=>{
     try{
      setloading(true);
      const formdata=new FormData();
    
      formdata.append("displayPicture",image);
      // console.log(formdata)
      dispatch(UpdateProfilePic(token,formdata)).then(()=>{
        setloading(false);
      })
     }
     catch(err){
      console.log(err.message)
     }

    }
    useEffect(()=>{
      if(image){
        previewFile(image)
      }
    },[image])

    return (
    <div className='w-full flex justify-center items-center'>
       <div className='flex bg-rich-black-700 w-[90%] p-5 rounded-lg min-h-[7rem] justify-around gap-5 items-center '>
            <img src={preview ||user?.Image} alt={`profile-${user?.firstname}`}
            className='aspect-square w-[6rem] h-[6rem] rounded-full object-cover'></img>
            <div className='w-full flex flex-col gap-4 justify-around  '>
              <h1 className='text-xl text-rich-black-50'>Change Your Profile Picture</h1>

              <div className='flex gap-5'>
                  <input type='file'
                  ref={fileInputRef}
                  onChange={handlefilechange}
                  className='hidden'
                  accept='image/jpg, image/png ,image/jpeg'
                  />
                  <button onClick={handleclick} disabled={loading}
                  className='cursor-pointer bg-gray-600 text-rich-black-200 transition-all hover:scale-95 p-2 font-[500] rounded-lg w-[5rem]'
                  
                  >Select</button>
                  <button onClick={UploadFile} className='bg-yellow-200 p-2 min-w-[5rem] rounded-lg font-[500] cursor-pointer hover:scale-95'>
                    {
                      loading?<p>Updating...</p>:<p>Update Photo</p>
                    }
                  </button>
              </div>
            </div>
        </div>

    </div>
  )
}

export default UpdatePhoto