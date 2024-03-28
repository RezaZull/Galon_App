import { Link } from "@inertiajs/react";

function OrderTable({ data, isAdmin }) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pesanan Id</th>
                        <th>Alamat</th>
                        <th>Nama</th>
                        <th>kontak</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    { data.map((data, idx) => {
                        return (
                            <tr key={idx} >
                                <th>{idx + 1}</th>
                                <td>{data.id}</td>
                                <td>{data.user.alamat}</td>
                                <td>{data.user.name}</td>
                                <td>{data.user.no_tlpn}</td>
                                <td> <div className={`badge ${data.status == 'dipesan' ? "" : data.status == 'diantarkan' ? "badge-info" : "badge-success"}`}>{data.status}</div> </td>
                                <td><Link className="btn btn-outline btn-sm" href={`/${isAdmin ? 'admin' : 'user'}/pesanan/${data.id}`} >Detail</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default OrderTable;
