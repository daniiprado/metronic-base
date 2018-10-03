<?php

namespace Logistic;

use Illuminate\Database\Eloquent\SoftDeletes;
use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'display_name', 'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'name'          =>  'string',
        'display_name'  =>  'string',
        'description'   =>  'string',
    ];
}
