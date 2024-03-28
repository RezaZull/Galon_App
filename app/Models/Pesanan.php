<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pesanan extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ["status","catatan","user_id"];
    public function Keranjangs():HasMany{
        return $this->hasMany(Keranjang::class,'pesanan_id','id');
    }
    public function User():HasOne{
        return $this->hasOne(User::class,'id','user_id')->withTrashed();
    }
}
