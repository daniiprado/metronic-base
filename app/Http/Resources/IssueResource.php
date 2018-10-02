<?php

namespace Logistic\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueResource extends JsonResource
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
            'issue'             =>  isset( $this->issue ) ? $this->issue : null,
            'attachment'        =>  isset( $this->attachment ) ? $this->attachment : null,
            'products_order_id'  =>  isset( $this->products_order_id ) ? $this->products_order_id : (int) 0,
            'products_order'    =>  new ProductsOrderResource( $this->whenLoaded('products_order') ),
            'created_at'        =>  isset( $this->created_at ) ? $this->created_at : null,
            'updated_at'        =>  isset( $this->updated_at ) ? $this->updated_at : null,
            'deleted_at'        =>  $this->when( isset( $this->deleted_at ),  $this->deleted_at ),
            'links'             =>  [
                'self' => '#',
            ],
        ];
    }
}
