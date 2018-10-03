<?php

namespace Logistic;

use Illuminate\Database\Eloquent\SoftDeletes;
use Zizaco\Entrust\EntrustPermission;

class Permission extends EntrustPermission
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'display_name', 'description', 'module_id'
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
        'module_id'     =>  'integer',
    ];

    /*
     * ---------------------------------------------------------
     * Eloquent Relationship
     * ---------------------------------------------------------
     */

    /**
     * Permission has one submodule action
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function module()
    {
        return $this->belongsTo( Module::class );
    }
}
