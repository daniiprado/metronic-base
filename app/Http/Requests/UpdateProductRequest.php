<?php

namespace Logistic\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'code'          =>  'required|string|unique:products,code,'.$this->route('product')->id,
            'name'          =>  'required|string|max:191',
            'price'         =>  'required|min:50|numeric',
            'company_id'    =>  'required|numeric|exists:companies,id',
        ];
    }
}
