<?php

namespace App\Http\Controllers;

use App\Models\BarangImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BarangImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $image_path = $request->file("image")->store('image','public');
        BarangImage::create([
            'barang_id'=>$request->id_barang,
            'gambar_url'=>$image_path
        ]);
        return redirect()->route('admin.itemdetail',["id"=>$request->id_barang]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BarangImage $barangImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BarangImage $barangImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BarangImage $barangImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $barangImage = BarangImage::where("id",$id)->first();
        $id_barang = $barangImage->barang_id;
        if($barangImage->gambar_url){
            Storage::delete($barangImage->gambar_url);
        }
        BarangImage::destroy($id);
        return redirect()->route("admin.itemdetail",["id"=>$id_barang]);
    }
}
