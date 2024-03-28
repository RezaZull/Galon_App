import {AdminListStock} from "@/Components/ListStock";
import Pagination from "@/Components/Pagination";
import SearchForm from "@/Components/SearchForm";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

function Stock(props){
    const {barang} = props
    const [search, setSearch] = useState(props.search||"")

    let onSearch = (e)=>{
        e.preventDefault()
        router.get(`/admin/stock?search=${search}`)
    }

    let onHandleEditItem = (data) => {
        router.put(`/admin/item/${data.id}`, data)
    }

    return(
        <AdminLayout  user={props.user}>
            <Head title={props.title}/>
            <div className="flex justify-between items-center m-4">
                <h1>Stock</h1>
                <SearchForm onPress={onSearch} value={search} setValue={setSearch} />
            </div>
            {barang.data.map((data,idx)=>{
                return(
                    <AdminListStock data={data} key={idx} onEditStock={(data)=>onHandleEditItem(data)}/>
                )
            })}

            <div className="flex justify-center">
                <Pagination data={props.barang}/>
            </div>
        </AdminLayout>
    )
}
export default Stock;
