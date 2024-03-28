import  OrderTable  from "@/Components/OrderTable";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function History(props) {
    return (
        <AdminLayout user={props.user}>
            <Head title={props.title} />
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl">History</h1>
                <OrderTable data={props.pesanan.data} isAdmin={props.user.isAdmin} />
                <div className="flex justify-center">
                    <Pagination data={props.pesanan} />
                </div>
            </div>
        </AdminLayout>
    )
}
export default History;
