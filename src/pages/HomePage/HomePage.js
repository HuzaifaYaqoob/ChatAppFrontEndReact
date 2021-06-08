
import {useState} from 'react'


const HomePage = (props) =>{
    const [room_name , setRoom_name] = useState() 
    const EnterRoom =()=>{
        props.history.push(`/inbox/${room_name}/`)
    }
    return(
        <div className='w-full min-h-screen flex items-center justify-center '>
            <div className='max-w-md w-full bg-white shadow-2xl rounded p-3'>
                <h1 className='text-gray-800 '>Enter Room Name (*any)</h1>
                <div className='my-4'>
                    <input className='w-full outline-none border border-green-600 rounded py-1 px-4 text-gray-800' type="text" name="ChatName"  id="ChatName" placeholder='Enter Chat/Room/Group Name' onChange={(evt)=>{setRoom_name(evt.target.value)}} />
                </div>
                <button onClick={()=>{EnterRoom()}} className='w-full text-center py-1 rounded bg-green-700 hover:bg-green-900 cursor-pointer text-white ' disabled={ room_name ? false : true }>Enter</button>
            </div>
        </div>
    )
}

export default HomePage