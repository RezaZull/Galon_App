<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BarangImage extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['barang_id','gambar_url'];

    public function Barangs():BelongsTo
    {
        return $this->belongsTo(Barang::class,"barang_id");
    }
}
