<?php

namespace Logistic\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource
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
            'id'            =>  isset( $this->id ) ? $this->id : (int) 0,
            'name'          =>  isset( $this->name ) ? $this->name : null,
            'display_name'  =>  isset( $this->display_name ) ? $this->display_name : null,
            'description'   =>  isset( $this->description ) ? $this->description : null,
            'created_at'    =>  isset( $this->created_at ) ? $this->created_at : null,
            'updated_at'    =>  isset( $this->updated_at ) ? $this->updated_at : null,
            'deleted_at'    =>  $this->when( isset( $this->deleted_at ),  $this->deleted_at ),
            'links'         =>  [
                'self' => '#',
            ],
        ];
    }
}
