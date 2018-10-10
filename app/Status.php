<?php

namespace Logistic;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as Auditor;

class Status extends Model implements Auditable
{
    use SoftDeletes, Auditor;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'status';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 'name' ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'name'  =>  'string',
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
        'name',
    ];

    /**
     * Generating tags for each model audited.
     *
     * @return array
     */
    public function generateTags() : array
    {
        return ['status'];
    }

    /*
     * ---------------------------------------------------------
     * Scopes
     * ---------------------------------------------------------
     */
    public function scopeFindByStatus( $name )
    {
        return $this->where('name', '=', $name);
    }

    /*
     * ---------------------------------------------------------
     * Accessors and Mutator
     * ---------------------------------------------------------
     */

    public function getNameAttribute( $name )
    {
        return isset( $name ) ? ucfirst( __("validation.attributes.{$name}") ) : null;
    }

    /*
     * ---------------------------------------------------------
     * Eloquent Relationship
     * ---------------------------------------------------------
     */

    /**
     * Status has one purchase order
     *
     * @Relation
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function purchase_order()
    {
        return $this->hasOne( PurchaseOrder::class );
    }
}
