import AdminLayout from "@/Layouts/AdminLayout"
import { Head, Link, router, } from "@inertiajs/react"
import { useState } from "react";


function DetailItem(props) {
    const { barang } = props;
    const [nama, setNama] = useState(barang.nama)
    const [deskripsi, setDeskripsi] = useState(barang.deskripsi)
    const [harga, setHarga] = useState(barang.harga)
    const [imagesPick, setImagePick] = useState(null)


    let onHandleEditItem = (e) => {
        let data = {
            nama: nama,
            deskripsi: deskripsi,
            harga: harga,
            stock:barang.stock
        }
        router.put(`/admin/item/${barang.id}`, data)
    }

    let onHandleDeleteItem = (e) => {
        router.delete(`/admin/item/${barang.id}`)
    }

    let onHandleAddImage = (e) => {
        let data = {
            id_barang: barang.id,
            image: imagesPick
        }
        router.post('/admin/gambar/', data, { forceFormData: true })
    }
    let onHandleDeleteImage = (id) => {
        router.delete(`/admin/gambar/${id}`)
    }
    return (
        <AdminLayout user={props.user} >
            <Head title={props.title} />
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href={route('admin.dashboard')}>Admin</Link></li>
                    <li><Link href={route('admin.item')}>Item</Link></li>
                    <li>{barang.nama}</li>
                </ul>
            </div>
            <div className="flex flex-row gap-12 justify-center">
                <div className="w-1/5 carousel rounded-box">
                    {barang.barang_images.length !=0? barang.barang_images.map((data, idx) => {
                        return (
                            <div className="carousel-item w-full">
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
                            <button className="btn btn-warning" onClick={() => document.getElementById('edit_form_modal').showModal()}>Edit</button>
                            <button className="btn btn-error" onClick={() => document.getElementById('delete_form_modal').showModal()} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex justify-between items-center my-4">
                <h2 className="font-bold text-lg">Gambar</h2>
                <button className="btn" onClick={() => document.getElementById('add_image_form_modal').showModal()} >Add Image</button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 place-items-center">
                {barang.barang_images.map((data, idx) => {
                    return (
                        <div className="card bg-base-100 shadow-xl w-3/5 h-96" key={idx}>
                            <figure>
                                <img src={`/storage/${data.gambar_url}`} className="h-full" alt="Tailwind CSS Carousel component" />
                            </figure>
                            <div className="card-body">
                                <div className="card-actions justify-end">
                                    <button className="btn btn-error" onClick={() => onHandleDeleteImage(data.id)} >Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <dialog id="edit_form_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Edit Item</h3>
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
                            <button className="btn btn-primary" onClick={onHandleEditItem} >Edit Data</button>
                        </label>
                    </form>
                </div>
            </dialog>

            <dialog id="add_image_form_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Image</h3>
                    <form className="flex flex-col gap-4" >
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Select Image</span>
                            </div>
                            <input type="file" accept="image/*" onChange={(e) => setImagePick(e.target.files[0])} className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control">
                            <button className="btn btn-primary" onClick={onHandleAddImage} >Upload Image</button>
                        </label>
                    </form>
                </div>
            </dialog>

            <dialog id="delete_form_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Peringatan!</h3>
                    <p className="py-4">Apa anda yakin akan menghapus item ini</p>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cancel</button>
                            <button className="btn btn-error" onClick={onHandleDeleteItem}>Delete</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </AdminLayout>
    )
}
export default DetailItem
