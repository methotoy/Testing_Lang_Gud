<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
    * Get the identifier that will be stored in the subject claim of the JWT
    *
    * @return mixed
    */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
    * Return a key value array, containing any custom claims to be added to the JWT
    *
    * @return array
    */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
    * Return an array value, containing all the book request of the user
    *
    * @return array
    */
    public function bookRequests()
    {
        return $this->hasMany(BookRequest::class, 'user_id');
    }

    /**
    * Return an array value, containing user profile details
    *
    * @return array
    */
    public function profile()
    {
        return $this->hasOne(Profile::class, 'user_id');
    }


}
