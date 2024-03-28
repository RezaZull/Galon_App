<?php

namespace App\Http\Controllers;


use App\Models\Barang;
use App\Models\Pesanan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function showDashboard(Request $request){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $pesanan = Pesanan::with(["Keranjangs"=>["Barangs"],"User"])->where('status','!=','selesai')->orderBy('status')->orderBy('created_at')->paginate(5);
        $pesananCount = Pesanan::all()->count();
        $pesananDipesan = Pesanan::where('status','=','dipesan')->get()->count();
        $pesananSelesai = Pesanan::where('status','=','selesai')->get()->count();
        $pesananDiantar = Pesanan::where('status','=','diantarkan')->get()->count();
        return Inertia::render("Admin/Dashboard",[
            "user"=> $user,
            "title"=>"Admin Dashboard",
            "pesanan"=>$pesanan,
            "statistik"=>[$pesananCount,$pesananDipesan,$pesananDiantar,$pesananSelesai]
        ]);
    }
    public function showOrder(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $pesanan = Pesanan::with(["Keranjangs"=>["Barangs"],"User"])->where('status','!=','selesai')->orderBy('status')->orderBy('created_at')->paginate(10);
        return Inertia::render("Admin/Order",[
            "user"=> $user,
            "title"=>"Admin Order",
            "pesanan"=>$pesanan
        ]);
    }
    public function showDetailOrder($id){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $pesanan = Pesanan::with(["Keranjangs"=>["Barangs"],"User"])->findOrFail( $id );
        return Inertia::render("Admin/DetailOrder",[
            "user"=> $user,
            "title"=>"Admin Order",
            "pesanan"=>$pesanan
        ]);
    }

    public function UpdateStatus($id){
        $pesan = Pesanan::find($id);
        if($pesan->status =="dipesan" ){
            $newStatus = "diantarkan";
        }else{
            $newStatus = "selesai";
        }
        $pesan->status = $newStatus;
        $pesan->update([
            "status"=> $newStatus
        ]);
        return back();
    }

    public function showHistory(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $pesanan = Pesanan::with(["Keranjangs"=>["Barangs"],"User"])->orderBy('created_at')->paginate(10);
        return Inertia::render("Admin/History",[
            "user"=> $user,
            "title"=>"Admin History",
            "pesanan"=>$pesanan
        ]);
    }
    public function showStock(Request $request){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();

        if(!empty($request->input("search"))){
            $barang=Barang::with("BarangImages")->where("nama","like","%".$request->input("search")."%")->paginate(9);
        }else{
            $barang = Barang::with("BarangImages")->paginate(9);
        }

        return Inertia::render("Admin/Stock",[
            "user"=> $user,
            "title"=>"Admin Stock",
            "barang"=>$barang,
            "search"=>$request->input("search"),
        ]);
    }
    public function showItem(Request $request){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        if(!empty($request->input("search"))){
            $barang=Barang::with("BarangImages")->where("nama","like","%".$request->input("search")."%")->paginate(9);
        }else{
            $barang = Barang::with("BarangImages")->paginate(9);
        }
        return Inertia::render("Admin/Item",[
            "user"=> $user,
            "title"=>"Admin Item",
            "barang"=> $barang,
            "search"=>$request->input("search"),
        ]);
    }
    public function showDetailItem($id){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $barang = Barang::with("BarangImages")->findOrFail($id);

        return Inertia::render("Admin/DetailItem",[
            "user"=> $user,
            "title"=>"Admin Item",
            "barang"=> $barang
        ]);
    }
    public function EditItem(Request $request, $id){
        // $data = Barang::findOrFail($id)->update($request->all());
        Barang::find($request->id)->update([
            "nama"=> $request->nama,
            "deskripsi"=> $request->deskripsi,
            "harga"=> $request->harga,
            "stock"=>$request->stock
        ]);
        return back();
    }
    public function DeleteItem($id){
        Barang::find($id)->delete();
        return redirect()->route('admin.item');
    }
    public function AddItem(Request $request){
        Barang::create([
            'nama'=> $request->nama,
            'deskripsi'=> $request->deskripsi,
            'harga'=> $request->harga,
            'stock'=>0,
        ]);
        return redirect()->route('admin.item');
    }
    public function showSetting(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        return Inertia::render("Admin/Setting",[
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

    public function showUserList(){
        $userId = session()->get("userId");
        $user = User::where("id","=",$userId)->first();
        $userList = User::paginate(10);
        return Inertia::render("Admin/UserList",[
            "title"=>"Admin Users",
            "user"=>$user,
            "userList"=>$userList
        ]);
    }

    public function deleteUserList($id){
        User::find($id)->delete();
        return back();
    }

    public function updateUserList(Request $request,$id){
        $user = User::find($id)->update([
            'name'=>$request->name,
            'email'=>$request->email,
            'isAdmin'=>$request->isAdmin
        ]);
        return back();

    }

    public function insertUserList(Request $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'isAdmin'=>$request->isAdmin,
            'gambar_url'=>'image/noimage.png'
        ]);
        return back();
    }
}
