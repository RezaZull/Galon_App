import UserLayout from "@/Layouts/UserLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Checkout(props){

    const [note,setNote] = useState("")

    let onCheckoutHandle=()=>{
        router.put("/user/checkout/",{note:note})
    }

    return(

        <UserLayout user={props.user}>
            <Head title={props.title} />
                <div class="card bg-base-100 shadow-xl my-4">
                    <div class="card-body">
                        <div className="flex justify-start">
                            <h2 className="card-title">Checkout</h2>
                            {/* <div className="gap-2 flex">
                                <h2 className={`p-4 badge ${props.pesanan.status == 'dipesan' ? "" : props.pesanan.status == 'diantarkan' ? "badge-info" : "badge-success"}`}>{props.pesanan.status}</h2>
                            </div> */}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>Nama Pemesan</th>
                                        <td>:</td>
                                        <td>{props.user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Alamat Pemesan</th>
                                        <td>:</td>
                                        <td>{props.user.alamat}</td>
                                    </tr>
                                    <tr>
                                        <th>Nomor Telepon Pemesan</th>
                                        <td>:</td>
                                        <td>{props.user.no_tlpn}</td>
                                    </tr>
                                    <tr>
                                        <th>Email Pemesan</th>
                                        <td>:</td>
                                        <td>{props.user.email}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} >
                                            <textarea placeholder="catatan" value={note} onChange={(e)=>setNote(e.target.value)} className=" textarea textarea-bordered textarea-lg text-sm w-full max-w-2xl" ></textarea>
                                        </td>
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
                                    {props.keranjang.map((data, idx) => {
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
                <button className="btn mt-4 btn-primary" onClick={()=>onCheckoutHandle()}>CheckOut </button>
        </UserLayout>
        )
    }
