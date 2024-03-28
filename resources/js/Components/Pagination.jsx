import { Link } from "@inertiajs/react";

function Pagination({data}) {
    return (
        <div className="join">
            <Link href={data.prev_page_url} disabled={data.prev_page_url==null} className="join-item btn">«</Link>
            <button className="join-item btn">Page {data.current_page}</button>
            <Link href={data.next_page_url} disabled={data.next_page_url==null} className="join-item btn">»</Link>
        </div>
    )
}

export default Pagination;
