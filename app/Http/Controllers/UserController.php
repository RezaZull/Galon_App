<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Keranjang;
use App\Models\Pesanan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function showDashboard(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $pesanan = Pesanan::with(["Keranjangs"=>["Barangs"],"User"])->where('user_id','=',$user->id)->where('status','!=','selesai')->orderBy('status')->orderBy('created_at')->paginate(5);
        $pesananCount = Pesanan::where('user_id','=',$user->id)->count();
        $pesananDipesan = Pesanan::where('user_id','=',$user->id)->where('status','=','dipesan')->get()->count();
        $pesananSelesai = Pesanan::where('user_id','=',$user->id)->where('status','=','selesai')->get()->count();
        $pesananDiantar = Pesanan::where('user_id','=',$user->id)->where('status','=','diantarkan')->get()->count();
        return Inertia::render("Users/Dashboard",[
            "user"=> $user,
            "title"=>"Dashboard",
            "pesanan"=>$pesanan,
            "statistik"=>[$pesananCount,$pesananDipesan,$pesananDiantar,$pesananSelesai]
        ]);
    }
    public function showProduct(Request $request){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        if(!empty($request->input("search"))){
            $barang=Barang::with("BarangImages")->where("nama","like","%".$request->input("search")."%")->paginate(9);
        }else{
            $barang = Barang::with("BarangImages")->paginate(9);
        }
        return Inertia::render("Users/Product",[
            "user"=> $user,
            "title"=>"Product",
            "barang"=>$barang,
            "search"=>$request->input("search"),
        ]);
    }
    public function showHistory(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $pesanan = Pesanan::with(["Keranjangs"=>["Barangs"],"User"])->where('user_id',"=",$user->id)->orderBy('created_at')->paginate(10);
        return Inertia::render("Users/History",[
            "user"=> $user,
            "title"=>"History",
            "pesanan"=>$pesanan
        ]);
    }

    public function ShowDetailProduct($id){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $barang = Barang::with("BarangImages")->findOrFail($id);
        return Inertia::render("Users/DetailProduct",[
            "user"=> $user,
            "title"=>"detail Product",
            "barang"=>$barang,
        ]);
    }

    public function showDetailOrder($id){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $pesanan = Pesanan::with(["Keranjangs"=>["Barangs"],"User"])->findOrFail( $id );
        return Inertia::render("Users/DetailOrder",[
            "user"=> $user,
            "title"=>"Detail Order",
            "pesanan"=>$pesanan
        ]);
    }

    public function showCart(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $keranjang = Keranjang::with(["Barangs"=>["BarangImages"]])->where([["user_id","=",$user->id],["pesanan_id","=",null]])->get();
        return Inertia::render("Users/Cart",[
            "user"=> $user,
            "title"=> "Keranjang",
            "keranjang"=> $keranjang,
        ]);
    }

    public function deleteCart($id){
        Keranjang::find( $id )->delete();
        return redirect()->route("user.cart");
    }

    public function showCheckout(Request $request){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        foreach($request->query() as $data){
            Keranjang::where([["user_id","=",$user->id],["pesanan_id","=",null],["barang_id","=",$data["barang_id"]]])->update(["qty"=>$data["qty"]]);
        }
        return Inertia::render("Users/Checkout",[
            "user"=> $user,
            "title"=> "Check out",
            "keranjang"=> $request->query(),
        ]);
    }

    public function createCheckout(Request $request){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $order = Pesanan::create([
            "user_id"=>$user->id,
            "status"=>"dipesan",
            "catatan"=>$request->note,
        ]);
        Keranjang::where([["user_id","=",$user->id],["pesanan_id","=",null]])->update(["pesanan_id"=>$order->id]);


        return redirect()->route("user.history");
    }

    public function insertKeranjang(Request $request){
        Keranjang::create($request->all());
        return redirect()->route("user.product");
    }
    public function showSetting(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        return Inertia::render("Users/Setting",[
            "title"=>"Admin Setting",
            "user"=>$user,
        ]);

    }

    public function updateSetting(Request $request){
        $user = User::find($request->userData["id"]);
        $newData= $request->userData;
        if($request->imageData != null){
            if($user->gambar_url=="image/noimage.png"){
                $imagePath = $request->file("imageData")->store('image','public');
            }else{
                Storage::delete($user->gambar_url);
                $imagePath = $request->file("imageData")->store('image','public');
            }
            $newData["gambar_url"] = $imagePath;
        }
        $user->update($newData);
        return back();
    }
}
