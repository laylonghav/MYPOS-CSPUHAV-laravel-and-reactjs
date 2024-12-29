<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|string|email|unique:users,email',
        //     'password' => 'required|string|min:6|confirmed',
        // ]);

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed', // required password_confirmation
            'phone' => 'nullable',
            'address' => 'nullable',
            'type' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // create new user
        $user = User::create([
            'name' => $request->name, // body json from client $request->name | $request->input("name")
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Handle the image upload if exists
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('profiles', 'public');
        }

        // Create the Profile
        $user->profile()->create([
            'phone' => $request->phone,
            'address' => $request->address,
            'image' => $imagePath,
            'type' => $request->type,
        ]);

        return response()->json(
            [
                'message' => 'User registered successfully',
                'user' => $user->load("profile"),

            ],
            201
        );
    }


    public function login(Request $request)
    {
        // Validate the request input
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Check if the user exists
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404); // If the email is incorrect
        }

        // Check if the password matches
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Incorrect password'], 401); // Explicit wrong password message
        }

        // Attempt to create a token
        $token = JWTAuth::fromUser($user);

        $permissions = DB::table('permissions as p')
            ->join('permission_roles as pr', 'p.id', '=', 'pr.permission_id')
            ->join('roles as r', 'pr.role_id', '=', 'r.id')
            ->join('user_roles as ur', 'r.id', '=', 'ur.role_id')
            ->where('ur.user_id', $user->id)
            ->select('p.*')
            ->get();


        return response()->json(
            [
                'access_token' => $token,
                'user' => $user->load("profile"), // Load user profile
                'permission' => $permissions, // Load user profile
            ]
        );
    }


    // // Login a user and return a JWT token
    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|string|email',
    //         'password' => 'required|string',
    //     ]);

    //     // Attempt to verify the credentials and create a token
    //     if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     return response()->json(
    //         [
    //             'access_token' => $token,
    //             'user' => JWTAuth::user()->load("profile"),
    //         ]
    //     );
    // }

    // Logout a user (invalidate the token)
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'User logged out successfully']);
    }

    // Refresh the JWT token
    public function refresh()
    {
        return response()->json(['access_token' => JWTAuth::refresh()]);
    }
}
