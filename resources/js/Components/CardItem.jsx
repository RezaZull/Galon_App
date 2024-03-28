import { Link } from "@inertiajs/react";

function AdminCardItem({ data }) {
    return (
        <Link href={route('admin.itemdetail', { id: data.id })} >
            <div className="card w-96 h-96 bg-base-100 shadow-xl">
                {data.barang_images.length != 0 ?
                    <figure><img src={`/storage/${data.barang_images[0].gambar_url}`} alt={data.nama} /></figure>
                    :
                    <figure><img src={`/storage/image/noimage.png`} alt="no image" /></figure>

                }
                <div className="card-body">
                    <h2 className="card-title">{data.nama}</h2>
                    <p>{data.deskripsi}</p>
                    <div className="card-actions justify-end">
                        <p>Stock : {data.stock}</p>
                        <p>Rp.{data.harga}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
function CardItem({ data }, props) {
    return (
        <Link href={route('user.productdetail',{id:data.id})}>
            <div className="card w-96  h-96 bg-base-100 shadow-xl">
                {data.barang_images.length != 0 ?
                    <figure><img src={`/storage/${data.barang_images[0].gambar_url}`} alt={data.nama} /></figure>
                    :
                    <figure><img src={`/storage/image/noimage.png`} alt="no image" /></figure>

                }
                <div className="card-body">
                    <h2 className="card-title">{data.nama}</h2>
                    <p>{data.deskripsi}</p>
                    <div className="card-actions justify-end">
                        <p>Stock : {data.stock}</p>
                        <p>Rp.{data.harga}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export { AdminCardItem, CardItem };
