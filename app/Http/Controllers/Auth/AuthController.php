<?php

namespace App\Http\Controllers\Auth;

use Auth;
use JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'username'    => 'required',
            'password' => 'required',
        ]);

        $credentials = $request->only('username', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->error('Invalid credentials', 401);
            }
        } catch (\JWTException $e) {
            return response()->success(compact('user', 'token'));
        }

        $user = Auth::user();

        $number = "";
        $message = "Test is now login";
        $apicode = "TR-EMERI572871_GJ4TS";

        $result = $this->itexmo($number, $message, $apicode);

        $resultN = "iTexMo: No response from server!!!";
        $result0 = "Message Sent!";
        $result1 = "Error Num ". $result . " was encountered!";

        if ($result == "") {
            return response()->success(compact('user', 'token', '$resultN'));
        } else if ($result == 0) {
            return response()->success(compact('user', 'token', '$result0'));
        } else {
            return response()->success(compact('user', 'token', '$result1'));
        }

        return response()->success(compact('user', 'token'));
    }

    private function itexmo( $number, $message, $apicode ) {

        $ch = curl_init();
        $itexmo = array(
            '1' =>  $number,
            '2' =>  $message,
            '3' =>  $apicode
        );

        curl_setopt($ch, CURLOPT_URL, "https://www.itexmo.com/php_api/api.php");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($itexmo));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        return curl_exec ($ch);
        curl_close ($ch);

    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'username'   => 'required|min:3',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:8',
        ]);

        $user = new User;
        $user->username = trim($request->username);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->success(compact('user', 'token'));
    }
}
