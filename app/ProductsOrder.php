<?php

namespace Logistic;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as Auditor;

class ProductsOrder extends Model implements Auditable
{
    use SoftDeletes, Auditor;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products_order';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quantity',
        'picked',
        'packed',
        'price',
        'purchase_order_id',
        'product_id',
    ];

    protected $guarded = [
        'received', 'transit'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'quantity'          =>  'integer',
        'picked'            =>  'integer',
        'packed'            =>  'integer',
        'price'             =>  'double',
        'received'          =>  'boolean',
        'transit'           =>  'boolean',
        'purchase_order_id' =>  'integer',
        'product_id'        =>  'integer',
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
        'quantity',
        'picked',
        'packed',
        'price',
        'received',
        'transit',
        'purchase_order_id',
        'product_id',
    ];

    /**
     * Generating tags for each model audited.
     *
     * @return array
     */
    public function generateTags() : array
    {
        return ['company'];
    }

    /*
     * ---------------------------------------------------------
     * Eloquent Relationship
     * ---------------------------------------------------------
     */

    /**
     * Products order has many issues
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function issues()
    {
        return $this->hasMany( Issue::class );
    }

    /**
     * Order product belongs to purchase order
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function purchase_order()
    {
        return $this->belongsTo( PurchaseOrder::class );
    }

    /**
     * Order product belongs to products
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo( Product::class );
    }
}
