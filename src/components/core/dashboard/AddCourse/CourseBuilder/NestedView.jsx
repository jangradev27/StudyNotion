import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit,MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import toast from 'react-hot-toast';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { DeleteCourseSection, deleteSubsection } from '../../../../../services/operation/Course';
import { setCourse } from '../../../../../slices/Courseslice';

const NestedView = ({handleChangeEditSection}) => {
  const {course,editCourse}=useSelector(state=>state.Course);
  const {token}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const [addSubsection,setAddSubsection]=useState(null);
  const [viewSubsection,setviewSubsection]=useState(null);
  const [editSubsection,seteditSubsection]=useState(null);
  const [confirmationModal,setConfirmationModal]=useState(null);
  const handleDeleteSection=(SectionId,CourseId)=>{
    const data={SectionId,CourseId};
    dispatch(DeleteCourseSection(data,token,setConfirmationModal));    
  }
  const handleDeleteSubSection=async(subsectionid,sectionid)=>{
    const data={SectionId:sectionid,SubSectionId:subsectionid};
    const result=await deleteSubsection(data,token);
    if(result){
      const updatedCourseContent=course.CourseContent.map(section=> section._id===sectionid?result:section);
      console.log(updatedCourseContent);
      const updatedCourse={...course,CourseContent:updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null)
  }

  return (
    <>
        <div className='  rounded-lg bg-rich-black-700 p-6 text-rich-black-100'>
            {course?.CourseContent?.map((section)=>(
              <details key={section._id} open className='p-4 cursor-pointer'>
                  <summary className=' flex  items-start    gap-x-3 border-b-2'>
                      <div className='flex gap-3 w-[85%]'>
                        <RxDropdownMenu/>
                          <p>{section.name}</p>
                      </div>
                      <div className='flex gap-2 w-fit border-r-2 border-rich-black-100'>
                        <button onClick={()=>handleChangeEditSection(section._id,section.name)}>
                            <MdEdit/>
                        </button>
                        <button type='button' onClick={()=>{ setConfirmationModal({
                          text1:"Delete this Section",
                          text2:"All the Section will be Deleted",
                          btn1text:"Delete",
                          btn2text:"Cancel",
                          btn1handler:()=>handleDeleteSection(section._id,course._id),
                          btn2handler:()=>setConfirmationModal(null)

                        })}}>
                              <MdDelete/>
                        </button>
                      </div>
                      <div className='flex justify-center items-center w-[5%]'>
                          <FaCaretDown/>
                      </div>
                  </summary>
                  <div className=' p-4'>
                    {
                      section?.Subsection?.map((data)=>(
                        <div  key={data._id}  className='flex justify-center items-center gap-5 border-b-2'>
                             <div onClick={()=>{ console.log(data);setviewSubsection(data)}} className='flex gap-3 w-[85%]'>
                                   <RxDropdownMenu/>
                                   <p>{data.title }</p>
                              </div>
                              <div className='flex'>
                                <button onClick={()=>seteditSubsection( {...data, sectionid:section._id})}>
                                  <MdEdit/>
                                </button>
                                <button onClick={()=>{ setConfirmationModal({
                                  text1:"Delete this Sub Section",
                                  text2:"Current Lecture will be Deleted",
                                  btn1text:"Delete",
                                  btn2text:"Cancel",
                                  btn1handler:()=>handleDeleteSubSection(data._id,section._id),
                                  btn2handler:()=>setConfirmationModal(null)

                                })}}>
                                  <MdDelete/>

                                </button>
                              </div>
                        </div>
                      ))
                    }
                  <button type='button' onClick={()=>setAddSubsection(section._id)} className=' cursor-pointer hover:text-yellow-400 transition-all flex justify-center items-center  rounded-xl text-yellow-100  font-semibold w-fit py-2 px-3'>Add Lecture <IoMdAdd/> </button>
                  </div>

              </details>
            ))}
        </div>

        { addSubsection ? (<SubSectionModal modalData={addSubsection}
        setModalData={setAddSubsection}
        add={true} />)
        :viewSubsection? (<SubSectionModal modalData={viewSubsection}  
        setModalData={setviewSubsection}
        view={true}/>)
        :editSubsection?(<SubSectionModal modalData={editSubsection} 
        setModalData={seteditSubsection} edit={true}/>)
        :<></>}    

     { confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}     
    </>
  )
}

export default NestedView