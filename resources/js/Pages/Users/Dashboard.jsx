import OrderTable from "@/Components/OrderTable";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";

function Dashboard(props) {
    return (
        <UserLayout user={props.user}>
            <Head title={props.title} />
            <div className="gap-8 flex flex-col">
            <h1 className="text-3xl" >Hello {props.user.name}</h1>
            <div className="stats stats-vertical lg:stats-horizontal shadow my-8">
                <div className="stat">
                    <div className="stat-title">Total Pesanan</div>
                    <div className="stat-value">{props.statistik[0]}</div>
                </div>

                <div className="stat">
                    <div className="stat-title text-sky-700">Dipesan</div>
                    <div className="stat-value text-sky-700">{props.statistik[1]}</div>
                </div>

                <div className="stat">
                    <div className="stat-title text-sky-700">Diantar</div>
                    <div className="stat-value text-sky-700">{props.statistik[2]}</div>
                </div>

                <div className="stat">
                    <div className="stat-title text-green-600">Selesai</div>
                    <div className="stat-value text-green-600">{props.statistik[3]}</div>
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">History</h2>
                    <p>Your recent order to see other check <Link className="link" href={route('user.history')} >this.</Link></p>
                    <OrderTable data={props.pesanan.data} isAdmin={props.user.isAdmin} />
                </div>
            </div>
            </div>
        </UserLayout>
    )

}
export default Dashboard;
