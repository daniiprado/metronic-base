<?php

namespace Logistic\Http\Controllers;


use Logistic\Http\Requests\StoreProductsOrderIssueRequest;
use Logistic\ProductsOrder;

class ProductsOrderIssueController extends ApiController
{


    public function store(StoreProductsOrderIssueRequest $request, ProductsOrder $products_order)
    {
        if ( is_array( $request->get('issues') ) ) {
            $products_order->issues()->createMany( $request->all() );
        }

        $products_order->issues()->create([
            'issue' => $request->get('issues' )
        ]);

        return $this->api_success([
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }
}
