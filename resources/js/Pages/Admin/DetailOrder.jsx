import AdminLayout from "@/Layouts/AdminLayout"
import { Head, Link, router } from "@inertiajs/react"

function DetailOrder(props) {
    let onChangeStatusHandle = () => {
        let nextStatus;
        if (props.pesanan.status == "dipesan") {
            nextStatus = "diantarkan"
        } else {
            nextStatus = "selesai"
        }
        let check = confirm(`Apakah anda ingin mengubah status menjadi ${nextStatus} ?`)
        if(check){
            router.put(`/admin/pesanan/${props.pesanan.id}`)
        }
    }
    return (
        <AdminLayout user={props.user} >
            <Head title={props.title} />

            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.dashboard')}>Admin</Link></li>
                    <li><Link href={route('admin.order')}>Order</Link></li>
                    <li>{props.pesanan.id}</li>
                </ul>
            </div>
            <div class="card bg-base-100 shadow-xl my-4">
                <div class="card-body">
                    <div className="flex justify-between">
                        <h2 className="card-title">Order no : {props.pesanan.id}</h2>
                        <div className="gap-2 flex">
                            <h2 className={`p-4 badge ${props.pesanan.status == 'dipesan' ? "" : props.pesanan.status == 'diantarkan' ? "badge-info" : "badge-success"}`}>{props.pesanan.status}</h2>
                            {props.pesanan.status != 'selesai'?
                            <button onClick={() => onChangeStatusHandle()} className={`p-4 badge badge-outline badge-secondary`}>Ubah Status</button>
                            :null}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Nama Pemesan</th>
                                    <td>:</td>
                                    <td>{props.pesanan.user.name}</td>
                                </tr>
                                <tr>
                                    <th>Alamat Pemesan</th>
                                    <td>:</td>
                                    <td>{props.pesanan.user.alamat}</td>
                                </tr>
                                <tr>
                                    <th>Nomor Telepon Pemesan</th>
                                    <td>:</td>
                                    <td>{props.pesanan.user.no_tlpn}</td>
                                </tr>
                                <tr>
                                    <th>Email Pemesan</th>
                                    <td>:</td>
                                    <td>{props.pesanan.user.email}</td>
                                </tr>
                                <tr>
                                    <th>Catatan</th>
                                    <td>:</td>
                                    <td>{props.pesanan.catatan}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <h2>Item</h2>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nama</th>
                                    <th>Deskripsi</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {props.pesanan.keranjangs.map((data, idx) => {
                                    return (
                                        <tr key={idx} >
                                            <th>{idx + 1}</th>
                                            <td>{data.barangs.nama}</td>
                                            <td>{data.barangs.deskripsi}</td>
                                            <td>{data.barangs.harga}</td>
                                            <td>{data.qty}</td>
                                            <td>{data.qty * data.barangs.harga}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default DetailOrder
