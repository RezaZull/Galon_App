import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";
import UserLayout from "@/Layouts/UserLayout";

export default function Setting(props) {
    const { title } = props
    const [isEdit, setEdit] = useState(false)
    const [user, setUser] = useState(props.user)
    const [image, setImage] = useState(null)
    console.log(user)

    let editModeOn = () => {
        setEdit(true)
    }

    let editModeOff = () => {
        setUser(props.user)
        setEdit(false)
    }

    let confirmEdit = () => {
        let data = {
            _method: "put",
            userData: user,
            imageData: image
        }
        router.post('/user/setting/', data)
    }

    return (
        <UserLayout user={user} >
            <Head title={title} />
            <div className="flex items-center flex-col gap-8">
                <div className="avatar">
                    <div className="rounded-full w-52">
                        <img src={`/storage/${user.gambar_url}`} alt="profile" />
                    </div>
                </div>
                <div className="">
                    <h1 className="text-3xl font-bold" >{user.name}</h1>
                    <p>{user.email}</p>
                </div>
                <div className="flex flex-col items-end w-1/3">
                    {!isEdit ?
                        <button className="btn btn-info text-white" onClick={editModeOn} >Edit Data</button>
                        :
                        <>
                            <div className="join join-horizontal">
                                <button className="btn join-item text-white btn-error" onClick={editModeOff} >cancel</button>
                                <button className="btn join-item text-white btn-success" onClick={confirmEdit} >Save Data</button>
                            </div>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Nama</span>
                                </div>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setUser({ ...user, name: e.target.value })} value={user.name} disabled={!isEdit} />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input type="text" className="input input-bordered w-full" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} disabled={!isEdit} />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Ubah foto profile</span>
                                </div>
                                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="file-input file-input-bordered w-full " />
                            </label>
                        </>
                    }
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">No Telepon</span>
                        </div>
                        <input type="text" className="input input-bordered w-full" onChange={(e) => setUser({ ...user, no_tlpn: e.target.value })} value={user.no_tlpn} disabled={!isEdit} />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Alamat</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24" onChange={(e) => setUser({ ...user, alamat: e.target.value })} value={user.alamat} disabled={!isEdit}></textarea>
                    </label>
                </div>
                <button className="btn" onClick={()=>document.getElementById('password_change').showModal()}>Ubah Password</button>
                <dialog id="password_change" className="modal">
                    <div className="modal-box">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

            </div>

        </UserLayout>
    )
}
