import { CardItem } from "@/Components/CardItem";
import Pagination from "@/Components/Pagination";
import SearchForm from "@/Components/SearchForm";
import UserLayout from "@/Layouts/UserLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

function Product(props) {
    const [search, setSearch] = useState(props.search||"")
    let onSearch=(e)=>{
        e.preventDefault()
        router.get(`/user/product?search=${search}`)
    }
    return (
        <UserLayout user={props.user} >
            <Head title={props.title} />
            <div className="flex flex-row items-center justify-between mb-8 shadow p-4">
                <h1 className="font-bold text-3xl ">Item</h1>
                <SearchForm onPress={onSearch} value={search} setValue={setSearch} />
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 place-items-center">
                {props.barang.data.map((data,idx)=>{
                    return(
                        <CardItem data={data} key={idx}/>
                    )
                })}
            </div>
            <div className="flex justify-center">
                <Pagination data={props.barang}/>
            </div>
        </UserLayout>
    )

}
export default Product;
