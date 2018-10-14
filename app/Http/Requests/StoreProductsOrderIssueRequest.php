<?php

namespace Logistic\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductsOrderIssueRequest extends FormRequest
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
        if ( is_array( request()->get('issues') ) ) {
            return [
                'issues'            =>  'required|array',
                'issues.*.issue'    =>  'required|string|max:3000'
            ];
        }

        return [
            'issues'            =>  'required|string|max:3000'
        ];
    }
}
