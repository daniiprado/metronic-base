<?php

namespace Logistic\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Logistic\Status;

class PurchaseOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                =>  isset( $this->id ) ? $this->id : (int) 0,
            'delivery_address'  =>  isset( $this->delivery_address ) ? $this->delivery_address : null,
            'business_unity_id' =>  isset( $this->business_unity_id ) ? $this->business_unity_id : 0,
            'provider_id'       =>  isset( $this->provider_id ) ? $this->provider_id : 0,
            'delivery_at'       =>  isset( $this->delivery_at ) ? $this->delivery_at : null,
            'requested_at'      =>  isset( $this->requested_at ) ? $this->requested_at : null,
            'status_id'         =>  isset( $this->status_id ) ? $this->status_id : (int) 0,
            'disabled'          =>  isset( $this->disabled ) ? (bool) $this->disabled : false,
            'user_id'           =>  isset( $this->user_id ) ? $this->user_id : (int) 0,
            'products_order'    =>  ProductsOrderResource::collection( $this->whenLoaded('products_order') ),
            'status'            =>  new StatusResource( $this->whenLoaded('status') ),
            'user'              =>  new UserResource( $this->whenLoaded('user') ),
            'created_at'        =>  isset( $this->created_at ) ? $this->created_at : null,
            'updated_at'        =>  isset( $this->updated_at ) ? $this->updated_at : null,
            'deleted_at'        =>  $this->when( isset( $this->deleted_at ),  $this->deleted_at ),
            'links'             =>  [
                'self' => '#',
            ],
        ];
    }
}
