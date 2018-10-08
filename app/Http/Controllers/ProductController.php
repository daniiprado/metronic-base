<?php

namespace Logistic\Http\Controllers;

use Logistic\Http\Requests\StoreProductRequest;
use Logistic\Http\Requests\UpdateProductRequest;
use Logistic\Http\Resources\ProductResource;
use Logistic\Product;

class ProductController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->collectionResponse(
            ProductResource::collection( $this->getModel( new Product ) ),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreProductRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function store(StoreProductRequest $request)
    {
        $product = new Product;
        $product->fill( $request->all() );
        $product->saveOrFail();
        return $this->api_success([
            'data'      =>  new ProductResource( $product ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Product $product)
    {
        return $this->singleResponse(
            new ProductResource( $product ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateProductRequest $request
     * @param Product $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update( $request->all() );
        return $this->api_success([
            'data'      =>  new ProductResource( $product ),
            'message'   =>  __('pages.responses.updated'),
            'code'      =>  200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return $this->api_success([
            'data'      =>  new ProductResource( $product ),
            'message'   =>  __('pages.responses.deleted'),
            'code'      =>  204
        ], 204);
    }

    /**
     * Display a listing of the resource in datatable format.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable()
    {
        return datatables()->eloquent( Product::query() )
                            ->addColumn('company', function (Product $product) {
                                return isset( $product->company->name )
                                        ? $product->company->name
                                        : null;
                            })
                            ->toJson();
    }
}
