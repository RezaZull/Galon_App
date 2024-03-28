<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\BarangImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/test',function (){
    return Inertia::render('Test',[
        'title'=>"Home galon app ",
        'desc'=>"welcome to galon app"
    ]);
});
Route::get('/barang',[BarangController::class,'index'])->name('barang.list');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth.admin')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class,'showDashboard'])->name('admin.dashboard');
    Route::get('/admin/order', [AdminController::class,'showOrder'])->name('admin.order');
    Route::get('/admin/history', [AdminController::class,'showHistory'])->name('admin.history');
    Route::get('/admin/stock', [AdminController::class,'showStock'])->name('admin.stock');
    Route::get('/admin/item', [AdminController::class,'showItem'])->name('admin.item');

    Route::get('/admin/pesanan/{id}', [AdminController::class,'showDetailOrder'])->name('admin.orderdetail');
    Route::put('/admin/pesanan/{id}',[AdminController::class,'UpdateStatus'])->name('admin.updateStatusPesanan');

    Route::get('/admin/item/{id}', [AdminController::class,'showDetailItem'])->name('admin.itemdetail');
    Route::put('/admin/item/{id}', [AdminController::class,'EditItem'])->name('admin.itemedit');
    Route::delete('/admin/item/{id}', [AdminController::class,'DeleteItem'])->name('admin.itemdelete');
    Route::post('/admin/item/', [AdminController::class,'AddItem'])->name('admin.itemadd');

    Route::post('/admin/gambar/',[BarangImageController::class,'store'])->name('barangimage.store');
    Route::delete('/admin/gambar/{id}',[BarangImageController::class,'destroy'])->name('barangimage.store');

    Route::get('/admin/setting',[AdminController::class,'showSetting'])->name('admin.setting');
    Route::put('/admin/setting',[AdminController::class,'updateSetting'])->name('admin.updateSetting');

    Route::get('/admin/users',[AdminController::class,'showUserList'])->name('admin.users');
    Route::delete('/admin/users/{id}',[AdminController::class,'deleteUserList'])->name('admin.usersDelete');
    Route::put('/admin/users/{id}',[AdminController::class,'updateUserList'])->name('admin.usersUpdate');
    Route::post('/admin/users',[AdminController::class,'insertUserList'])->name('admin.usersInsert');

})->name('adminRoute');


Route::middleware('auth.user')->group(function () {
    Route::get('/user/dashboard', [UserController::class,'showDashboard'])->name('user.dashboard');
    Route::get('/user/product', [UserController::class,'showProduct'])->name('user.product');
    Route::get('/user/history', [UserController::class,'showHistory'])->name('user.history');

    Route::get('/user/product/{id}', [UserController::class,'ShowDetailProduct'])->name('user.productdetail');
    Route::get('/user/pesanan/{id}', [UserController::class,'showDetailOrder'])->name('user.orderdetail');

    Route::get('/user/cart/', [UserController::class,'showCart'])->name('user.cart');
    Route::get('/user/checkout/', [UserController::class,'showCheckout'])->name('user.checkout');
    Route::put('/user/checkout/', [UserController::class,'createCheckout'])->name('user.createCheckout');
    Route::delete('/user/cart/{id}', [UserController::class,'deleteCart'])->name('user.deleteCart');

    Route::post("/user/keranjang/", [UserController::class,"insertKeranjang"])->name("user.insertCart");

    Route::get('/user/setting',[UserController::class,'showSetting'])->name('user.setting');
    Route::put('/user/setting',[UserController::class,'updateSetting'])->name('user.updateSetting');

})->name('userRoute');

require __DIR__.'/auth.php';
