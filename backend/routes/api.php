<?php

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Route;

Route::post('/get_token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
    
    $token = $user->createToken($request->device_name)->plainTextToken;
    //$user->remember_token = $token;

    return $token;
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/book/add', 'BookController@add');

Route::get('/book/all', 'BookController@all');

Route::post('/book/delete/{id}', 'BookController@delete');

Route::post('/book/change_availability/{id}', 'BookController@changeAvailability');
