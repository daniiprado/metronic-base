<?php

namespace Logistic\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'name'                      =>  'required|string|max:191',
            'email'                     =>  'required|email|unique:users,email',
            'password'                  =>  'required|confirmed|min:6|max:16',
            'password_confirmation'     =>  'required|min:6|max:16',
            'company_id'                =>  'required|numeric|exists:companies,id',
        ];
    }
}
