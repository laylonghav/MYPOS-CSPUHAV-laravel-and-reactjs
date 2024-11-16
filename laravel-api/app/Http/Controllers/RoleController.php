<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Role;


class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $total = 2000;
        return response() -> json([
            "list"=> Role::all(),
        ]);
        // [
        //     "list" => [
        //         "number" => [1, 2, 3, 4, 5, 6, 7, 8],
        //         "total" => $total . "$", // Corrected concatenation using '.'
        //     ],
        //     "role" => [
        //         "id" => 101,
        //         "name" => "hav",
        //         "position" => "admin",
        //         "contact" => [
        //             "Phone" => "09232454",
        //             "email" => "laylonghav@gmail.com", // Fixed email case sensitivity
        //         ],
        //     ],
        // ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Add validation rules
        $request->validate([
            'name' => 'required|string',
            'code' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'address' => 'nullable|string'
        ]);

        // Store the new role
        $role = new Role();
        $role->name = $request->input("name");
        $role->code = $request->input("code");
        $role->description = $request->input("description");
        $role->status = $request->input("status");
        $role->address = $request->input("address");
        $role->save();

        return [
            "Data" => $role,            
            "message" => "Inserted successfully!",
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return [
                "error" => true,
                "message" => "Data not found!"
            ];
        }

        return $role;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the input data
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:roles,code,' . $id,
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'address' => 'nullable|string|max:255'
        ]);

        $role = Role::find($id);

        if (!$role) {
            return [
                "error" => true,
                "message" => "Data not found!"
            ];
        }

        $role->name = $request->input("name");
        $role->code = $request->input("code");
        $role->description = $request->input("description");
        $role->status = $request->input("status");
        $role->address = $request->input("address");
        $role->update();

        return [
            "Data" => $role,            
            "message" => "Updated successfully!",
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return [
                "error" => true,
                "message" => "Data not found!"
            ];
        }

        $role->delete();

        return [
            "Data" => $role,            
            "message" => "Deleted successfully!",
        ];
    }


    public function changestatus(Request $request, string $id)
    {
        $role = Role::find($id);
        if(!$role){
            return[
                "error : " =>true,
                "message : " =>"Data not found ! ",
                
            ];
        }else{
            $role->status =$request->input("status");
            $role->update();
            return [
            "data" => $role,
            "message" => "Data changed to status (" . $role->status . ") successfully!"
        ];
    }
    }
}
