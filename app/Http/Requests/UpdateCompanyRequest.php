<?php

namespace Logistic\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
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
            'name'  =>  'required|string|max:191',
            'nit'   =>  'required|string|max:12|unique:companies,nit,'.$this->route('company')->id,
            'phone' =>  'required|string|max:12',
        ];
    }
}
