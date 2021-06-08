import logo from './logo.svg';
import './App.css';

import {Link, Route , Switch} from 'react-router-dom'


// All Pages 
import HomePage from '../src/pages/HomePage/HomePage'
import Inbox from '../src/pages/Inbox/Inbox'

// const chatSocket = new WebSocket('ws://127.0.0.1:8000/inbox/ad/');

// console.log(chatSocket);

// chatSocket.onopen = ()=>{
//   console.log('connectee');
//   const send_data = {
//       'message' : 'This is React message',
//       'username' : 'This is my user name Huzaifa',
//       'first_name' : 'Huzaifa',
//       'last_name' : 'Moon'
//     }
//   chatSocket.send(JSON.stringify(send_data));
// }

// chatSocket.onmessage = (response_data) =>{
//   console.log(response_data)
//   console.log('message sent or received')
// }
// chatSocket.onclose = ()=>{
//   console.log('Connection refused')
// }


const PageNotFound = (props) =>{
  const GoBackFunction = () =>{
    props.history.goBack()
  }
  return(
    <div className='h-screen w-screen flex items-center justify-center flex-col'>
      <h1 className='text-5xl'>OOPS!<br/>Page not found.</h1>
      <p className='underline cursor-pointer mt-5' onClick={GoBackFunction} >Go Back</p>
    </div>
  )
}



function App() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/inbox/:chat_name/' component={Inbox} />
      <Route path='/' component={PageNotFound} />
    </Switch>
  );
}

export default App;
