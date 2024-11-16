<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $province = Province::all();
        return response()->json($province);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return the view to create a new province
        return view('provinces.create');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:provinces,code',
            'region' => 'required|string|max:255',
            'population' => 'nullable|integer',
            'area' => 'nullable|numeric',
            'description' => 'nullable|string',
        ]);

        // Create a new Province record
        $province = new Province();
        $province->name = $request->name;
        $province->code = $request->code;
        $province->region = $request->region;
        $province->population = $request->population;
        $province->area = $request->area;
        $province->description = $request->description;
        $province->save();

        // Return a response or redirect
        return response()->json([
            'message' => 'Province created successfully!',
            'province' => $province
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Province $province)
    {
        // Return the province details as JSON
        return response()->json([
            'province' => $province
        ], 200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Province $province)
    {
        // Return the province data for editing
        return response()->json([
            'province' => $province
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Province $province)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:provinces,code,' . $province->id,
            'region' => 'required|string|max:255',
            'population' => 'nullable|integer',
            'area' => 'nullable|numeric',
            'description' => 'nullable|string',
        ]);
    
        // Update the province with the validated data
        $province->name = $request->name;
        $province->code = $request->code;
        $province->region = $request->region;
        $province->population = $request->population;
        $province->area = $request->area;
        $province->description = $request->description;
    
        // Save the updated province
        $province->save();
    
        // Return a response indicating success
        return response()->json([
            'message' => 'Province updated successfully!',
            'province' => $province
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Province $province)
    {
        // Delete the province
        $province->delete();
    
        // Return a response indicating success
        return response()->json([
            'message' => 'Province deleted successfully!'
        ], 200);
    }
    
}
