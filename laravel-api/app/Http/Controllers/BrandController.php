<?php

namespace App\Http\Controllers;
use App\Models\Brand;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'txt_search' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive', 
        ]);



        // $brand = Brand::query();

        // if ($req->has('txt_search')) {
        //     $brand->where('name', 'LIKE', '%' . $req->input('txt_search') . '%');
        // }

        $brand = Brand::query();
        if ($request->has('txt_search')) {
            $searchTerm = $request->input('txt_search');
            $fields = [ 'name', 'code', 'from_country' ];

            $brand->where(function ($query) use ($searchTerm, $fields) {
                foreach ($fields as $field) {
                    $query->orWhere($field, 'LIKE', '%' . $searchTerm . '%');
                }
            });
        }

        if ($request->has('status')) {
            $brand->where('status', $request->input('status'));
        }

        $list = $brand->get();

        return response()->json([
            'list' => $list,
            'query' => $request->all(), // helpful for debugging inputs
        ],200);

        // $brands = Brand::all();
        // return response ()-> json([
        //     "list" =>$brands
        // ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        // `name`, `code`, `from_country`, `image`, `status`, `created_at`
      $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:brands,code',
            'from_country' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:active,inactive',
        ]);



        // Handle the image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('brands', 'public');
        }

      

        // create brand
        $brand = Brand::create([
            'name' => $request->name,
            'code' => $request->code,
            'from_country' => $request->from_country,
            'image' => $imagePath,
            'status' => $request->status,
        ]);

        return response()->json([
            "data" => $brand,
            "request" => $request->all(),
            "message" => "Data created successfully!"
        ], 200);

     
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
         $brands = Brand::find($id);
        return response ()-> json([
            "data" =>$brands
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brand = Brand::find($id);
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:brands,code,' . $id,
            'from_country' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'name.required' => 'The brand name is required.',
            'code.unique' => 'The brand code must be unique.',
            'status.in' => 'The status must be either active or inactive.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif.',
            'image.max' => 'The image may not be greater than 2MB.',
        ]);


        // Handle the image upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($brand->image) {
                Storage::disk('public')->delete($brand->image);
            }
            // Store the new image
            $imagePath = $request->file('image')->store('brands', 'public');
            $brand->image = $imagePath;
        }

        if ($request->image_remove != "") {
             Storage::disk('public')->delete($request->image_remove);
              $brand->image = null;
        }

        // Update the brand data
        $brand->update([
            'name' => $request->name,
            'code' => $request->code,
            'from_country' => $request->from_country,
            'status' => $request->status,
        ]);

        return response()->json([

            "data" => $brand,
            "message" => "Data update successfully!",
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::find($id);
        // Delete the image if it exists
        if ($brand->image) {
            Storage::disk('public')->delete($brand->image);
        }
        $brand->delete();
        return response()->json([
            "data" => $brand,
            "message" => "Data delete successfully!",
        ], 200);
    }
}
