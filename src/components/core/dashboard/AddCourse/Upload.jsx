import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import ReactPlayer from 'react-player';

const Upload = ({label,name,getValues,register,viewData,editData,setValue,video=false}) => {
    const {course,editCourse}=useSelector(state=>state.Course);
    const [selectedFile,setSelectedFile]=useState(null);
    const [previewFileSource,setPreviewFile]=useState(viewData ? viewData : editData ? editData : "");
    const fileinput=useRef(null);

      const onDrop=(acceptFiles)=>{
      const file=acceptFiles[0];
      if(file){
        previewFile(file);
        setSelectedFile(file);
      }
    }
    const {getInputProps,getRootProps,isDragActive}=useDropzone({
      accept:video?{'video/*':['.mp4']}:{'image/*':[".jpeg",".png",".jpg"]},
      onDrop
    })

     const previewFile=(file)=>{
      const reader= new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setPreviewFile(reader.result);
      }
    }
   
    // logic for click upload
    const handleClick=()=>{
      fileinput.current.click();
    }
   
    const handleChange=(e)=>{
      const file=e.target.files[0];
      if(file){
        previewFile(file);
        setSelectedFile(file);
      }

    }

     useEffect(()=>{
      register(name,{required:true});
    },[])
    useEffect(()=>{
      setValue(name,selectedFile);
    },[selectedFile]);
  return (
    <div className=' flex flex-col gap-2 '>
        <label htmlFor={name} className='text-rich-black-50 font-[400] text-lg'>{label}<sup className='text-red-500'>*</sup></label>
        
        {
          previewFileSource?<>
              <div className=' border-[2px] border-dotted bg-rich-black-700 rounded-lg   flex flex-col gap-2 justify-center cursor-pointer text-rich-black-50 items-center'>
                {
                  !video?<div className='w-full h-full text-center'>
                     <img src={previewFileSource} alt='Preview' className='w-full h-full object-cover' />
                  
                 </div>
                  :<Player aspectRatio="16:9" playsInline src={previewFileSource}  />       
               }
                { !viewData &&<button type='button' onClick={()=>setPreviewFile("")} className='cursor-pointer underline text-rich-black-5'>Cancel</button>}
              </div>
          
          </>:(
            <div {...getRootProps()} onClick={handleClick}  className={`${isDragActive?"bg-rich-black-600":"bg-rich-black-700"} text-wrap border-dotted border-[2px] border-rich-black-300 rounded-lg  h-[15rem] flex flex-col gap-2 justify-center cursor-pointer -[20rem] text-rich-black-50 items-center`}>
            <input {...getInputProps()} onChange={handleChange} ref={fileinput} />
            <div className=' bg-black text-yellow-50 rounded-[50%]  w-fit h-fit text-4xl p-2'><FiUploadCloud/></div>
              <p className="mt-2 max-w-[200px] text-center text-sm text-rich-black-50">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <div className=' w-full flex justify-center items-center '>
                <ul className=' text-[12px] flex list-disc  gap-10'>
                <li>Aspect Ratio</li>
                <li>Recommended Dimension: 1024x1080</li>
                </ul>
            </div>
        </div>
          )
        }
    </div>
)
}

export default Upload