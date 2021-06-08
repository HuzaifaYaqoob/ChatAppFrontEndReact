






const ChatMessage = (props) =>{
    return(
        <li className={ 'flex mb-4 items-end' + (props.orientation == 'right' ? ' self-end flex-row-reverse' : ' self-start')}>
            <div className={ 'w-6 h-6 md:w-8 md:h-8 xl:w-10 , xl:h-10 object-fill bg-indigo-700 rounded-full overflow-hidden' + (props.orientation == 'right'  ? ' ml-3 ' : ' mr-3 ')} style={{minWidth:'1.5rem' , minHeight:'1.5rem'}}>
                <img className='w-full' src={props.imageURL} />
            </div>
            <div className={ 'max-w-xs sm:max-w-sm md:max-w-md xl:max-w-2xl p-2 rounded-lg' + (props.orientation == 'right'  ? ' rounded-br-none bg-green-600' : ' rounded-bl-none bg-indigo-500')}>
                <p className='mb-1 text-xs text-gray-300 font-light text-opacity-70'>{props.date}</p>
                <p className='text-white break-words'>{props.text}</p>
            </div>
        </li>
    )
}

export default ChatMessage