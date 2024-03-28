import { Link, router } from "@inertiajs/react";

function AdminLayout({ user, children }) {
    let logOut = () => {
        router.post('/logout')
    }
    return (
        <div className={"flex flex-row min-h-full"}>
            <div className="flex flex-col">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content w-screen">
                        {/* Page content here */}

                        <div className="px-10">
                            <div className="header mb-4">
                                <div className="navbar bg-base-100">
                                    <div className="flex-none">
                                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                        </label>
                                    </div>
                                    <div className="flex-1">
                                        <a className="btn btn-ghost text-xl">Snowflakes</a>
                                    </div>
                                    <div className="flex-none">
                                        <button onClick={logOut} method="post" className="btn btn-square btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                            <span>logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col ">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <div className="flex flex-col my-2 items-center ">
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={`/storage/${user.gambar_url}`} alt={"gambar " + user.name} />

                                    </div>
                                </div>
                                <h2 className="text-lg">Hello {user.name}</h2>
                                <h3>{user.email}</h3>
                            </div>
                            <li><Link href={route('admin.dashboard')}>Dashboard</Link></li>
                            <li><Link href={route('admin.order')}>Order</Link></li>
                            <li><Link href={route('admin.history')}>History</Link></li>
                            <li><Link href={route('admin.stock')}>Stock</Link></li>
                            <li><Link href={route('admin.item')}>Items</Link></li>
                            <li><Link href={route('admin.users')}>Users</Link></li>
                            <li><Link href={route('admin.setting')}>Setting</Link></li>
                            <li><button onClick={logOut}>Logout</button></li>

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminLayout;
