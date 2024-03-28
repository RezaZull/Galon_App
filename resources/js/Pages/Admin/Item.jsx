import {AdminCardItem} from "@/Components/CardItem";
import Pagination from "@/Components/Pagination";
import SearchForm from "@/Components/SearchForm";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link,Head, router } from "@inertiajs/react";
import { useState } from "react";

function Item(props){
    const [nama, setNama] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [harga, setHarga] = useState("")
    const [search, setSearch] = useState(props.search||"")
    let onSearch=(e)=>{
        e.preventDefault()
        router.get(`/admin/item?search=${search}`)
        // alert(search)
    }
    let onHandleAddItem =(e)=>{
        let data = {
            nama: nama,
            deskripsi: deskripsi,
            harga: harga
        }
        router.post(`/admin/item/`, data)
    }
    return(
        <AdminLayout  user={props.user}>
            <Head title={props.title}/>
            <div className="flex flex-row items-center justify-between mb-8 shadow p-4">
                <h1 className="font-bold text-3xl ">Item</h1>
                <SearchForm onPress={onSearch} value={search} setValue={setSearch} />
                <button className="btn " onClick={()=>document.getElementById('add_form_modal').showModal()}>Add Item</button>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 place-items-center">
                {props.barang.data.map((data,idx)=>{
                    return(
                        <AdminCardItem data={data} key={idx} />
                    )
                })}
            </div>
            <div className="flex justify-center">
                <Pagination data={props.barang}/>
            </div>

            <dialog id="add_form_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Item</h3>
                    <form className="flex flex-col gap-4" >
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Nama Item</span>
                            </div>
                            <input type="text" className="input input-bordered w-full " onChange={(e) => setNama(e.target.value)} value={nama} />
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Deskripsi Item</span>
                            </div>
                            <textarea className="textarea textarea-bordered h-24" onChange={(e) => setDeskripsi(e.target.value)} value={deskripsi}></textarea>
                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Harga Item</span>
                            </div>
                            <input type="number" className="input input-bordered w-full " onChange={(e) => setHarga(e.target.value)} value={harga} />
                        </label>
                        <label className="form-control">
                            <button className="btn btn-primary" onClick={onHandleAddItem} >Add Data</button>
                        </label>
                    </form>
                </div>
            </dialog>
        </AdminLayout>
    )
}
export default Item;
