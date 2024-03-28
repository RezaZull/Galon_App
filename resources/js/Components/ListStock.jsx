import { useState } from "react";

function AdminListStock(props) {
    const {data} = props
    const [showForm, setShowForm] = useState(false);
    const [stock,setStock] = useState(data.stock)

    let onCancleHandle = ()=>{
        setShowForm(false)
        setStock(data.stock)
    }

    let onSubmitHandle=()=>{
        let sendData = {
            ...data,
            stock:stock
        }
        props.onEditStock(sendData)
    }
    return (
        <div className="flex flex-row items-center   bg-slate-100 p-4 rounded-xl m-2">
            <div className="" style={{flex:1}}>
                <h2 className="text-2xl font-bold" >{data.nama}</h2>
                <p>{data.deskripsi}</p>
            </div>
            <div className="text-right" style={{flex:1}}>
                <p className="text-xl font-semibold" >Rp.{data.harga}</p>
                <p>Stock :{data.stock}</p>
            </div>
            <div className="items-center justify-end flex" style={{flex:2}}>
                {showForm ?
                    <div className="gap-1 flex">
                        <input type="text" placeholder="Add new stock" value={stock} onChange={(e)=>setStock(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        <button className="btn btn-error" onClick={() => onCancleHandle()}>Cancel</button>
                        <button className="btn btn-success" onClick={()=>onSubmitHandle()}>Send</button>
                    </div>
                    :
                    <button className="btn btn-info" onClick={() => setShowForm(true)}>Set Stock</button>
                }
            </div>
        </div>
    )
}
export {AdminListStock};
