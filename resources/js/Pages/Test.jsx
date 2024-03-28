import { Link, Head } from '@inertiajs/react';

export default function Test(props){
    return(
        <div className="container">
            <Head title={props.title} />
            <h1>hello world</h1>
            <p>{props.desc}</p>
        </div>
    )
}