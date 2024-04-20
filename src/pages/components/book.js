export default function Book(props) {
storage.refFromURL()
    return (
        
        <li className="mt-5"key={props.name}>
            {props.name}
            <div className="">
                <a href={props.href} 
                   target="_blank" 
                   className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600 cursor-pointer'>
                   Download
                </a>
            </div>
        </li>

    )
}
