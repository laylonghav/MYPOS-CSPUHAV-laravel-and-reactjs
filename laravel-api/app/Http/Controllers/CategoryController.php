<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
// use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Category::all();
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
        // `id`, `name`, `description`, `status`, `parent_id`,
        $cat = new Category();
        $cat->name = $request->input("name");
        $cat->description = $request->input("description");
        $cat->status = $request->input("status");
        $cat->parent_id = $request->input("parent_id");
        $cat->save();
        return[
            "data"=>$cat,
            "message"=>"Insert successfully !",
        ];
    }

    /**
     * Display the specified resource.
     */
    // public function show( string $id)
    // {
    //     return Category::find($id);
    // }

      public function show(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     $cat = Category::find($id);
    //     if(!$cat){
    //         return[
    //             "error"=>true,
    //             "message"=>"data not found !",

    //         ];
    //     }else{
    //         $cat->name = $request->input("name");
    //     $cat->description = $request->input("description");
    //     $cat->status = $request->input("status");
    //     $cat->parent_id = $request->input("parent_id");
    //     $cat->update();
    //     return[
    //         "data"=>$cat,
    //         "message"=>"update successfully !",
    //     ];
    //     }
    // }

    public function update(Request $request, Category $category)
    {
        if (!$category) {
            return response()->json([
                "error" => true,
                "message" => "Data not found!",
            ], 404);
        }
    
        $category->name = $request->input("name");
        $category->description = $request->input("description");
        $category->status = $request->input("status");
        $category->parent_id = $request->input("parent_id");
    
        $category->save();
    
        return response()->json([
            "data" => $category,
            "message" => "Update successful!",
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id)
    // {
    //   $cat= Category::find($id);
    //     if(!$cat){
    //         return[
    //             "error"=>true,
    //             "message"=>"data not found !",

    //         ];
    //     }else{
    //     $cat->delete();
    //     return[
    //         "data"=>$cat,
    //         "message"=>"delete successfully !",
    //     ];
    //     }
    // }

    public function destroy(Category $category)
    {
        if (!$category) {
            return response()->json([
                "error" => true,
                "message" => "Data not found!",
            ], 404);
        }
    
        $category->delete();
    
        return response()->json([
            "data" => $category,
            "message" => "Deleted successfully!",
        ]);
    }


}
