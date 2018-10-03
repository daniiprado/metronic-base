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
        'name', 'display_name', 'description', 'module_id', 'submodule_id'
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
        'submodule_id'  =>  'integer',
    ];

    /*
     * ---------------------------------------------------------
     * Eloquent Relationship
     * ---------------------------------------------------------
     */

    /**
     * Permission belongs to module
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function module()
    {
        return $this->belongsTo( Module::class );
    }

    /**
     * Permission belongs to submodule
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function submodule()
    {
        return $this->belongsTo( Submodule::class );
    }
}
