import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

function DetailProduct(props){
    const {barang}=props
    const [qty,setQty] = useState(0)
    let onCheckoutPressed = ()=>{
        let data = {
            barang_id:barang.id,
            qty:qty,
            user_id:props.user.id
        }
        router.post('/user/keranjang/',data)
    }
    return(
        <UserLayout user={props.user}>
            <Head title={props.title}/>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('user.dashboard')}>Admin</Link></li>
                    <li><Link href={route('user.product')}>Item</Link></li>
                    <li>{barang.nama}</li>
                </ul>
            </div>
            <div className="flex flex-row gap-12 justify-center">
                <div className="w-1/5 carousel rounded-box">
                    {barang.barang_images.length !=0? barang.barang_images.map((data, idx) => {
                        return (
                            <div className="carousel-item w-full" key={idx}>
                                <img src={`/storage/${data.gambar_url}`} className="w-full" alt={barang.nama} />
                            </div>
                        )
                    })
                    :
                        <div className="carousel-item w-full">
                            <img src={`/storage/image/noimage.png`} className="w-full" alt="no image" />
                        </div>

                    }
                </div>
                <div className="card w-3/5 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{barang.nama}</h2>
                        <p>{barang.deskripsi}</p>
                        <div className="card-actions justify-end">
                            <p>stock: {barang.stock}</p>
                            <p>harga: {barang.harga}</p>
                        </div>
                        <div className="card-actions justify-end">
                            <div className="join join-horizontal">
                                <button className="btn join-item" disabled={qty<=0} onClick={()=>setQty(qty-1)} >-</button>
                                <input className="input input-bordered join-item text-center" value={qty} onChange={(e)=>setQty(e.target.value)} />
                                <button className="btn join-item" onClick={()=>setQty(qty+1)} >+</button>
                            </div>
                            <button className="btn btn-primary" onClick={()=>onCheckoutPressed()} disabled={qty<=0}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex justify-between items-center my-4">
                <h2 className="font-bold text-lg">Gambar</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 place-items-center">
                {barang.barang_images.map((data, idx) => {
                    return (
                        <div className="card bg-base-100 shadow-xl w-3/5 h-96" key={idx}>
                            <figure>
                                <img src={`/storage/${data.gambar_url}`} className="h-full" alt="Tailwind CSS Carousel component" />
                            </figure>
                        </div>
                    )
                })
                }
            </div>
        </UserLayout>
    )
}
export default DetailProduct;
