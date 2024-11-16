<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProvinceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("role",[RoleController::class,'index']);
Route::post("role",[RoleController::class,'store']);
Route::get("role/{id}",[RoleController::class,'show']);
Route::put("role/{id}",[RoleController::class,'update']);
Route::delete("role/{id}",[RoleController::class,'destroy']);
Route::post("role/changestatus/{id}",[RoleController::class,'changestatus']);


// Route::get("categories",[CategoryController::class,'index']);
// Route::post("categories",[CategoryController::class,'store']);
// Route::get("categories/{id}",[CategoryController::class,'show']);
// Route::put("categories/{id}",[CategoryController::class,'update']);
// Route::delete("categories/{id}",[CategoryController::class,'destroy']);
// Route::post("categories/changestatus/{id}",[CategoryController::class,'changestatus']);

Route::apiResource('categories', CategoryController::class);
Route::apiResource('customer', CustomerController::class);
Route::apiResource('province', ProvinceController::class);


// Route::get('/role', function (Request $request) {
    
// });

// Route::get('/employee', function (Request $request) {
//     $total = 2000;
//     $employee= [
//         [
//             "id" => 101,
//             "name" => "hav",
//             "position" => "admin",
//             "salary" => 2000 . "$",
//             "contact" => [
//                 "Phone" => "09232454",
//                 "email" => "laylonghav@gmail.com", // Fixed email case sensitivity
//             ],
//         ],
//         [
//             "id" => 102,
//             "name" => "senghy",
//             "position" => "manager",
//             "salary" => 1500 . "$",
//             "contact" => [
//                 "Phone" => "09232789",
//                 "email" => "seanghy@gmail.com", // Fixed email case sensitivity
//             ],
//         ],
//         [
//             "id" => 103,
//             "name" => "Esil",
//             "position" => "sale",
//             "salary" => 1200 . "$",
//             "contact" => [
//                 "Phone" => "02332789",
//                 "email" => "esil@gmail.com", // Fixed email case sensitivity
//             ],
//         ],
//     ];
//     return [
//         "employee"=>$employee,
//         "list" => [
//             "number" => [1, 2, 3, 4, 5, 6, 7, 8],
//             "total" => $total . "$", // Corrected concatenation using '.'
//         ],
//         "role" => [
//             "id" => 101,
//             "name" => "hav",
//             "position" => "admin",
//             "contact" => [
//                 "Phone" => "09232454",
//                 "email" => "laylonghav@gmail.com", // Fixed email case sensitivity
//             ],
//         ],
//     ];
// });