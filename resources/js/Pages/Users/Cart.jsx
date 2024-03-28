import UserLayout from "@/Layouts/UserLayout"
import { Head, router } from "@inertiajs/react"
import { useState } from "react"


function Cart(props) {
    console.log(props)
    const [keranjang,setKeranjang] = useState(props.keranjang)
    let onDeleteHandle=(id)=>{
        let dataKeranjang = keranjang
        keranjang.map((data,idx)=>{
            if(data.id == id){
                dataKeranjang.splice(idx,1)
                setKeranjang(dataKeranjang);
            }
        })
        router.delete(`/user/cart/${id}`)
    }
    let onCheckoutHandle=()=>{
        router.get('/user/checkout/',keranjang)
    }
    let onChangeQty=(index,value)=>{
        let data = [...keranjang]
        data[index].qty = value
        setKeranjang(data)
    }
    console.log(props)
    return (
        <UserLayout user={props.user} >
            <div className="flex flex-col gap 4"></div>
            <Head title={props.title} />
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl">Keranjang</h2>
                {keranjang.length !=0? keranjang.map((data, idx) => {
                    return (
                        <div className="flex items-center justify-between bg-base-100 shadow-xl" key={idx}>
                            <div className="flex gap-4 items-center">
                                <img className="h-32 w-32" src={`/storage/${data.barangs.barang_images[0].gambar_url}`} alt="barang 1" />
                                <div className="">
                                    <p>{data.barangs.nama}</p>
                                    <p>{data.barangs.deskripsi}</p>
                                </div>

                            </div>
                            <div className="">
                                <p>{data.barangs.harga}</p>
                                <p>{data.barangs.harga*data.qty}</p>
                            </div>
                            <div className="flex gap-4 p-4">
                                <input className="input input-bordered join-item text-center" value={data.qty} onChange={(e)=>onChangeQty(idx,e.target.value)} />
                                <button className="btn join-item" onClick={()=>onDeleteHandle(data.id)} >delete</button>
                            </div>
                        </div>
                    )
                }): <div className="text-center"><h2>tidak ada barang dalam keranjang</h2></div> }
                {keranjang.length!= 0 ?
                    <div className="text-right">
                        <button onClick={()=>onCheckoutHandle()} className="btn">Checkout</button>
                    </div>:null
                }
            </div>

        </UserLayout>
    )
}
export default Cart
