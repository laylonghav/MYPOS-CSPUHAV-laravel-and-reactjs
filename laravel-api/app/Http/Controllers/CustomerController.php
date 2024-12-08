<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

    class CustomerController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
    public function index(Request $req)
    {
         $validated = $req->validate([
            'txt_search' => 'nullable|string|max:255',
            'status' => 'nullable|integer|in:1,0', // Integer validation
        ])                                                                       ;                                                                             

        $customer = Customer::query();
        if ($req->has('txt_search')) {
            $searchTerm = $req->input('txt_search');
            $fields = [ 'first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'zip_code' ];

            $customer->where(function ($query) use ($searchTerm, $fields) {
                foreach ($fields as $field) {
                    $query->orWhere($field, 'LIKE', '%' . $searchTerm . '%');
                }
            });
        }
        if ($req->has('status')) {
            $customer->where('status', $req->input('status'));
        }
        $list = $customer->get();
        return response()->json([
            'list' => $list,
            'query' => $req->all(), // helpful for debugging inputs
        ]);
    }

    /**
     * Store a newly created customer in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:10',
            'date_of_birth' => 'nullable|date',
        ]);

        $customer = Customer::create($request->all());

        return response()->json([
            'data' => $customer,
            'message' => 'Customer created successfully!'
        ], 201);
    }

    /**
     * Display the specified customer.
     */
    public function show($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json([
                'error' => true,
                'message' => 'Customer not found!',
            ], 404);
        }

        return response()->json($customer);
    }

    /**
     * Update the specified customer in storage.
     */
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json([
                'error' => true,
                'message' => 'Customer not found!',
            ], 404);
        }

        $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:customers,email,' . $id,
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:10',
            'date_of_birth' => 'nullable|date',
        ]);

        $customer->update($request->all());

        return response()->json([
            'data' => $customer,
            'message' => 'Customer updated successfully!'
        ]);
    }

    /**
     * Remove the specified customer from storage.
     */
    public function destroy($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json([
                'error' => true,
                'message' => 'Customer not found!',
            ], 404);
        }

        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully!'
        ]);
    }
}
