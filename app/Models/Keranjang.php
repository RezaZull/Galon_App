<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Keranjang extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ["user_id","barang_id","pesanan_id","qty"];

    public function Pesanans():BelongsTo{
        return $this->belongsTo(Pesanan::class,'id','pesanan_id');
    }
    public function Barangs():HasOne{
        return $this->hasOne(Barang::class,'id','barang_id');
    }
    public function Users():HasOne{
        return $this->hasOne(User::class,'id','user_id');
    }
}
