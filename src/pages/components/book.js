export default function Book(props) {


    return (
            <li key={props.name}>
                {props.name}
                <a href={props.href} target="_blank" className='underline ml-5 text-blue-600 hover:text-blue-800 visited:text-purple-600 cursor-pointer'>Download</a></li>

    )
}