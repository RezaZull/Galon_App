<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;


class Barang extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['nama','deskripsi','harga','stock'];

    public function BarangImages(): HasMany
    {
        return $this->hasMany(BarangImage::class,"barang_id","id");
    }

    public function keranjang(): HasMany
    {
        return $this->hasMany(keranjang::class,"barang_id","id");
    }

    public function delete()
    {
        $this->BarangImages()->delete();
        parent::delete();
    }
}
