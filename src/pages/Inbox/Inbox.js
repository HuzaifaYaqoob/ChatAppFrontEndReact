
import {useState , useEffect} from 'react'

import {Link , useParams} from 'react-router-dom'

import {BsThreeDotsVertical , IoCall , FiSend} from 'react-icons/all'

import ChatMessage from './ChatMessage'
var uuid = require("uuid");

const Inbox = () =>{
    const [chat_name , setChatName] = useState(useParams().chat_name)
    const [userName , setUserName] = useState('')
    const [uid , setUID] = useState(uuid.v4() )

    const [usernameUpdate , setusernameUpdate ] = useState(false)
    const [loading , setLoading ] = useState(true)
    const [MessageList , setMessagesList] = useState([])

    const [socketConnection , setSocketConnection] = useState(false)
    


    // CONNECTION TO WEB SOCKET CHAT CONNECTION ******************************************

    const socket = new WebSocket('ws://127.0.0.1:8000/inbox/'+ useParams().chat_name + '/')
    


    const SendMessage = () =>{
        const input_message = document.getElementById('InputField')
        input_message.parentElement.classList.remove('border-red-700')
        input_message.parentElement.classList.remove('border')
        
        if(input_message.value == ''){
            input_message.parentElement.classList.add('border-red-700')
            input_message.parentElement.classList.add('border')
        }else{
            socket.send(JSON.stringify(
                {
                    message : input_message.value,
                    username : uid
                }
            ))
            input_message.value = ''
        }
    }

    const SubmitChatMessage = () =>{
        if(socketConnection){
            SendMessage()
        }else{
            console.log('Could not send message')
        }
    }


    const UpdateChat_Received_MSG = (msg_data) =>{
        
        
        const new_chat_msg =  <ChatMessage key={msg_data.message} imageURL={ msg_data.userName == uid ? 'data:image/jpeg;base64,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': 'https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg'} orientation = {msg_data.username == uid ? 'left' : 'right'} text={msg_data.message} date={msg_data.date} />
        
        setMessagesList(MessageList => [...MessageList , new_chat_msg])
    }

    
    useEffect(()=>{
        
        socket.onopen = ()=>{
            console.log('Connected to Chat')
            setSocketConnection(true)
        }
        socket.onclose = ()=>{
            console.log('Connection Lost')
            setSocketConnection(false)
        }
        socket.onmessage = (response_data) =>{
            const data = JSON.parse(response_data.data)
            console.log('Msg received')
            UpdateChat_Received_MSG(data)
        }
    
        
        setTimeout(() => {
            setLoading(false)
            // const number = [1,2,3,4,5,6,7,89]
            // const all_messages = number.map((value)=>{
            //     const chat_message_comp = <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
            //     return(chat_message_comp)
            // })
            // setMessagesList(all_messages)

        }, 5000);
    } ,[])


    return(
        <div className='h-screen w-screen'>
            {
                !usernameUpdate && 
                <div className='absolute top-0 left-0 z-50 w-full h-full bg-gray-300 bg-opacity-70 flex item-center justify-center'>
                    <div className='max-w-md w-full p-3 bg-white h-40 rounded'>
                        <h3 className='text-gray-800'>Enter Your Name</h3>
                        <div className='my-4'>
                            <input className='w-full outline-none text-gray-700' value={userName} placeholder='Enter Your Name' onChange={(evt)=>{setUserName(evt.target.value)}} />
                        </div>
                        <button className='w-full py-1 text-white bg-green-600 hover:bg-green-900 rounded' disabled={userName ? false : true} onClick={()=>{setusernameUpdate(true)}} >Enter</button>
                    </div>

                </div> 
            }
            <div className='container mx-auto h-screen overflow-hiddenas flex'>
                <div className='ChatSection flex-1 bg-gray-700 flex flex-col'>
                    <div className='ChatSectionHeader w-full pt-6 px-6 '>
                        <div className='ChatSectionUserBar w-full bg-green-500 rounded-md py-1 md:py-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 '>
                            <div className='hidden sm:hidden md:block'>

                            </div>
                            <div className='text-center mb-1.5 md:mb-0'>
                                <h3 className='text-xl '>{userName}</h3>
                            </div>
                            <div className='flex items-center justify-center md:justify-end'>
                                <div className='mx-1.5 rounded-full bg-indigo-600 p-1.5 hover:bg-indigo-700 hover:text-white transition-all duration-150 cursor-pointer hover:scale-125 origin-bottom transform'>
                                    <IoCall/>
                                </div>
                                <div className='mx-1.5 rounded-full bg-indigo-600 p-1.5 hover:bg-indigo-700 hover:text-white transition-all duration-150 cursor-pointer hover:scale-125 origin-bottom transform'>
                                    <BsThreeDotsVertical/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        loading?
                        <div className='flex flex-1 items-center justify-center'>
                            <div className='w-5 h-5 bg-green-600 rounded-full'>
                                <div className='animate-ping w-5 h-5 bg-green-600 rounded-full'>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='p-4 px-6 flex-1 relative flex overflow-y-auto pb-16 '>
                            <div className='w-full flex-1 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-500 scrollbar-track-gray-0 scroll-bottom' id='messages'>
                                <ul className='message-list flex flex-col px-5'>
                                    {/* <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='How are you?' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NDk3ODA1fHxlbnwwfHx8fA%3D%3D&w=1000&q=80' left text="i'm good, ki abakwas kr rha bya sdjfasdiof asdjas nasfjasdfas jfkafa fjasdjfioasdfjk aj ki abakwas kr rha bya sdjfasdiof asdjas nasfjasdfas jfkafa fjasdjfki abakwas kr rha bya sdjfasdiof asdjas nasfjasdfas jfkafa fjasdjf"  date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='i"m good, ki abakwas kr rha bya sdjfasdiof asdjas nasfjasdfas jfkafa fjasdjfioasdfjk aj ki abakwas kr rha bya sdjfasdiof asdjas nasfjasdfas jfkafa fjasdjfki abakwas kr rha bya sdjfasdiof asdjas nasfjasdfas jfkafa fjasdjf' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' />
                                    <ChatMessage imageURL='https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg' right text='Hi' date='Nov 12, 2020' /> */}
                                    {
                                    MessageList
                                    }
                                </ul>
                            </div>
                            <div className='w-full px-5 pb-3 pt-1 absolute bottom-0 left-0 flex'>
                                <div className='flex-1 flex items-center h-12 bg-gray-800 rounded-md shadow-xl overflow-hidden '>
                                    <input type='text' placeholder='Type something' id='InputField' className='w-full h-full flex-1 bg-gray-800 text-gray-300 px-5 placeholder-gray-400 font-light outline-none ' />
                                    <div className='px-4' onClick={SubmitChatMessage}>
                                        <FiSend className='text-2xl hover:scale-125 transform duration-150 cursor-pointer'  />
                                    </div>
                                </div>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Inbox