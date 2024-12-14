<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(Request $request)
    // {
    //     $query = Product::query(); //ORM eloquent
    //     if ($request->has("category_id")) {
    //         $query->where("category_id", '=', $request->input("category_id"));
    //     }
    //     if ($request->has("brand_id")) {
    //         $query->where("brand_id", '=', $request->input("brand_id"));
    //     }
    //     if ($request->has("txt_search")) {
    //         $query->where("name", '=', $request->input("txt_search"));
    //     }
    //     if ($request->has("status")) {
    //         $query->where("status", '=',  $request->input("status"));
    //     }
    //     // $product = $query->get();   //get list product all 
    //     // $product = $query->with(['categories', 'brands'])->get();   //get list product all include relationship
    //     // $product = $query->with(['categories', 'brands'])->get();   //get list product all include relationship 
    //     $product = $query->with(['categories', 'brands'])->paginate();   //get list product all include relationship and pagination
    //     // $product = Product::with(['categories', 'brands'])->get();
    //     return response()->json([
    //         "list" => $product
    //     ]);
    // }

    public function index(Request $request)
    {
        // Validate request inputs
        $validated = $request->validate([
            'category_id' => 'nullable|integer',
            'brand_id' => 'nullable|integer',
            'txt_search' => 'nullable|string',
            'status' => 'nullable|integer'
        ]);

        // Build query
        $query = Product::query();

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->input('brand_id'));
        }

        if ($request->filled('txt_search')) {
            $query->where('product_name', 'like', '%' . $request->input('txt_search') . '%');
        }


        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // Fetch paginated results with relationships
        $product = $query->with(['categories', 'brands'])->get();

        return response()->json([
            'list' => $product,
            'brands' => Brand::all(),
            'categories' => Category::all(),

        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'product_name' => 'required|string',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'boolean',
            'wishlist' => 'boolean',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);
        return response()->json([
            "list" => $product,
            'message' => 'Product created successfully!'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        return response()->json([
            "data" =>  $product->load(['categories', 'brands'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'product_name' => 'required|string',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'boolean',
            'wishlist' => 'boolean',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        if ($request->image_remove != "") {
            Storage::disk('public')->delete($request->image_remove);
            $data['image'] = null;
        }

        $product->update($data);
        return response()->json([
            "data" =>  $product->load(['categories', 'brands']),
            'message' => 'Customer updated successfully!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id)
    // {
    //     $product = Product::find($id);
    //     if ($product->image) {
    //         Storage::disk('public')->delete($product->image);
    //     }
    //     $product->delete();
    //     return response()->json([
    //         "data" =>  $product->load(['categories', 'brands']),
    //         'message' => 'Customer deleted successfully!'
    //     ], 204);
    // }

    public function destroy(string $id)
    {
        $product = Product::find($id);

        // Check if the product exists
        if (!$product) {
            return response()->json([
                'message' => 'Product not found.'
            ], 404); // Return 404 if the product does not exist
        }

        // Check if product has an image and delete it
        if ($product->image) {
            if (Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
        }

        // Delete the product
        $product->delete();

        // Return response with product data
        return response()->json([
            'data' => $product->load(['categories', 'brands']),
            'message' => 'Product deleted successfully!'
        ], 200); // 200 OK is generally more appropriate for successful deletion
    }
}
