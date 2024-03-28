import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

function UserList(props) {
    const [formUser,setFormUser]=useState({
        name:'',
        email:'',
        password:'',
        isAdmin:false,
        id:''
    });

    function resetFormState(){
        setFormUser({
            name:'',
            email:'',
            password:'',
            isAdmin:false,
            id:''
        })
    }

    function openEditForm(data){
        setFormUser({
            name:data.name,
            email:data.email,
            password:'',
            isAdmin:data.isAdmin,
            id:data.id
        })
        document.getElementById('UpdateModalUser').showModal()
    }

    let onEditSubmit=()=>{
        router.put(`/admin/users/${formUser.id}`,formUser)
    }

    let onInsertSubmit=()=>{
        router.post('/admin/users',formUser)
    }

    let onDeletButtonPressed = (id) => {
        router.delete(`/admin/users/${id}`)
    }
    return (
        <AdminLayout user={props.user}>
            <Head title={props.title} />
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl">User List</h1>
                <div className="overflow-x-auto">
                    <button className="btn join-item btn-primary" onClick={() => document.getElementById('InsertModalUser').showModal()}>Insert</button>
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                                <th>No Telepon</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {props.userList.data.map((data, idx) => {
                                return (
                                    <tr key={idx} >
                                        <th>{idx + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.isAdmin == 1 ? "Yes" : "No"}</td>
                                        <td>{data.no_tlpn}</td>
                                        <td>
                                            <div className="join">
                                                <button className="btn join-item btn-error" onClick={() => onDeletButtonPressed(data.id)}>Delete</button>
                                                <button className="btn join-item btn-warning" onClick={() => openEditForm(data)}>Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center">
                    <Pagination data={props.userList} />
                </div>

                <dialog id="UpdateModalUser" className="modal">
                    <div className="modal-box">
                        <form method="dialog" onSubmit={()=>resetFormState()} >
                            {/* if there is a button in form, it will close the modal */}
                            <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Update New User</h3>
                        <div className="">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Username</span>
                                </div>
                                <input type="text"  className="input input-bordered w-full " value={formUser.name} onChange={(e)=>setFormUser({...formUser,name:e.target.value})} />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input type="text"  className="input input-bordered w-full " value={formUser.email} onChange={(e)=>setFormUser({...formUser,email:e.target.value})} />
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Is Admin</span>
                                    <input type="checkbox" className="toggle" checked={formUser.isAdmin} onChange={(e)=>setFormUser({...formUser,isAdmin:!formUser.isAdmin})} />
                                </label>
                            </div>
                            <button className="btn btn-primary" onClick={()=>onEditSubmit()} >Submit</button>
                        </div>
                    </div>
                </dialog>
                <dialog id="InsertModalUser" className="modal">
                    <div className="modal-box">
                        <form method="dialog" onSubmit={()=>resetFormState()}>
                            {/* if there is a button in form, it will close the modal */}
                            <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="">
                        <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Username</span>
                                </div>
                                <input type="text"  className="input input-bordered w-full " value={formUser.name} onChange={(e)=>setFormUser({...formUser,name:e.target.value})} />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input type="text"  className="input input-bordered w-full " value={formUser.email} onChange={(e)=>setFormUser({...formUser,email:e.target.value})} />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input type="password"  className="input input-bordered w-full " value={formUser.password} onChange={(e)=>setFormUser({...formUser,password:e.target.value})} />
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Is Admin</span>
                                    <input type="checkbox" className="toggle" checked={formUser.isAdmin} onChange={(e)=>setFormUser({...formUser,isAdmin:!formUser.isAdmin})} />
                                </label>
                            </div>
                            <button className="btn btn-primary" onClick={()=>onInsertSubmit()} >Submit</button>
                        </div>
                    </div>
                </dialog>
            </div>
        </AdminLayout>
    )
}
export default UserList;
