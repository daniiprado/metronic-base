<?php

namespace Logistic\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductsOrderTransitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'data'              => 'required|array',
            'data.*.id'         => 'required|exists:products_order,id',
            'data.*.transit'    => 'required|boolean',
            'data.*.packed'     => 'required|numeric',
        ];
    }
}
