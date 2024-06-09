import axios from 'axios';
import React, { useContext } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { GlobalContext } from '../context/globalContext';
import { MdDisabledByDefault } from "react-icons/md";

export const TaskDelete = ({id, isEdit}) => {
  const { getGlobalData } = useContext(GlobalContext)
 
  const handleDelete = async () => {
    try {
        await axios.delete(`http://localhost:4000/task/${id}`)
        getGlobalData();
    } catch (error) {
        console.log(error.message)
    }
  }
    return (
    <div>
        {isEdit?<MdDisabledByDefault title='Disabled' />:<MdDeleteForever onClick={handleDelete} title='Delete'/>}
    </div>
  )
}

export default TaskDelete