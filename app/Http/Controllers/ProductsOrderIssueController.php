<?php

namespace Logistic\Http\Controllers;


use Logistic\Http\Requests\StoreProductsOrderIssueRequest;
use Logistic\ProductsOrder;

class ProductsOrderIssueController extends ApiController
{


    public function store(StoreProductsOrderIssueRequest $request, ProductsOrder $products_order)
    {
        $products_order->issues()->saveMany( $request->all() );
        return $this->api_success([
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }
}
