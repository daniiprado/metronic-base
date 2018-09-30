<?php

namespace Logistic\Http\Controllers;

use Logistic\Http\Requests\StoreProductsOrderRequest;
use Logistic\Http\Requests\UpdateProductsOrderStatusRequest;
use Logistic\Http\Requests\UpdateProductsOrderRequest;
use Logistic\Http\Resources\ProductsOrderResource;
use Logistic\ProductsOrder;

class ProductsOrderController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->collectionResponse(
            ProductsOrderResource::collection( $this->getModel( new ProductsOrder ) ),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductsOrderRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreProductsOrderRequest $request)
    {
        $products_order = new ProductsOrder();
        $products_order->save( $request->all() );
        return $this->singleResponse(
            new ProductsOrderResource( $products_order ),
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param ProductsOrder $products_order
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ProductsOrder $products_order)
    {
        return $this->singleResponse(
            new ProductsOrderResource( $products_order ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductsOrderRequest $request
     * @param ProductsOrder $products_order
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateProductsOrderRequest $request, ProductsOrder $products_order)
    {
        $products_order->update( $request->all() );
        return $this->singleResponse(
            new ProductsOrderResource( $products_order ),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ProductsOrder $products_order
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(ProductsOrder $products_order)
    {
        $products_order->delete();
        return $this->singleResponse(
            new ProductsOrderResource( $products_order ),
            200
        );
    }

    /**
     * Update product status
     *
     * @param UpdateProductsOrderStatusRequest $request
     */
    public function status(UpdateProductsOrderStatusRequest $request )
    {
        $i = 0;
        if ( $request->has('data') ) {
            foreach ( $request->get('data') as $purchase ) {
                $product = ProductsOrder::find( $purchase['id'] );
                $product->received = $purchase['status'];
                $product->save();
                $i++;
            }
            return $this->api_success([
                'message'   =>  "Se ha actualizado el estado de {$i} productos",
                'code'      =>  200
            ], 200);
        }
    }
}
