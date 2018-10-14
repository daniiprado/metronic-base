<?php

namespace Logistic;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use NunoMaduro\Collision\Provider;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as Auditor;

class PurchaseOrder extends Model implements Auditable
{
    use SoftDeletes, Auditor;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'purchases_orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'delivery_address',
        'business_unity_id',
        'delivery_at',
        'requested_at',
        'user_id',
        'provider_id',
        'status_id'
    ];

    protected $guarded = [
        'status_id',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [ 'requested_at', 'delivery_at' ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'delivery_address'  =>  'string',
        'delivery_at'       =>  'datetime',
        'requested_at'      =>  'datetime',
        'status_id'         =>  'integer',
        'user_id'           =>  'integer',
        'business_unity_id' =>  'integer',
        'provider_id'       =>  'integer'
    ];

    /*
     * ---------------------------------------------------------
     * Audits
     * ---------------------------------------------------------
     */

    /**
     * Attributes to include in the Audit.
     *
     * @var array
     */
    protected $auditInclude = [
        'delivery_address',
        'business_unity_id',
        'delivery_at',
        'requested_at',
        'user_id',
        'provider_id',
        'status_id',
    ];

    /**
     * Generating tags for each model audited.
     *
     * @return array
     */
    public function generateTags() : array
    {
        return ['purchase_order'];
    }

    /*
     * ---------------------------------------------------------
     * Accessors and Mutator
     * ---------------------------------------------------------
     */

    /**
     * Attribute to enable or disable form controls
     *
     * @return bool
     */
    public function getDisabledAttribute()
    {
        return ($this->status_id == Status::findByName('canceled')->first(['id'])->id
                || $this->status_id == Status::findByName('delivered')->first(['id'])->id );
    }

    /*
     * ---------------------------------------------------------
     * Eloquent Relationship
     * ---------------------------------------------------------
     */

    /**
     * Purchase order has many products order
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products_order()
    {
        return $this->hasMany( ProductsOrder::class );
    }

    /**
     * Purchase order belongs to one status
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo( Status::class );
    }

    /**
     * Purchase order belongs to one user
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo( User::class );
    }

    /**
     * Purchase order has one provider
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function provider()
    {
        return $this->belongsTo( Company::class, 'provider_id', 'id' );
    }

    /**
     * Purchase order has one provider
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function business_unity()
    {
        return $this->belongsTo( BusinessUnity::class );
    }
}
