<?php

namespace Logistic\Http\Controllers;

use Logistic\Http\Requests\StorePurchaseOrderRequest;
use Logistic\Http\Requests\UpdatePurchaseOrderRequest;
use Logistic\Http\Requests\UpdatePurchaseOrderStatusRequest;
use Logistic\Http\Resources\PurchaseOrderResource;
use Logistic\PurchaseOrder;
use Logistic\Status;

class PurchaseOrderController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->collectionResponse(
            PurchaseOrderResource::collection( $this->getModel( new PurchaseOrder, [
                'products_order' => function ( $query ) {
                    return $query->with('product', 'issues');
                },
                'user:id,name',
                'status:id,name'
            ] ) ),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StorePurchaseOrderRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function store(StorePurchaseOrderRequest $request)
    {

        $purchase_order = new PurchaseOrder;
        $purchase_order->delivery_address   = $request->get('delivery_address');
        $purchase_order->business_unity_id  = $request->get('business_unity_id');
        $purchase_order->delivery_at        = $request->get('delivery_at');
        $purchase_order->requested_at       = now();
        $purchase_order->user_id            = auth('api')->user()->id;
        $purchase_order->provider_id        = $request->get('provider_id');
        $purchase_order->status_id          = 3;
        $purchase_order->saveOrFail();
        $purchase_order->products_order()->createMany( $request->get('products') );
        return $this->api_success([
            'data'      =>  new PurchaseOrderResource( $purchase_order->load('products_order') ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param PurchaseOrder $purchase_order
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PurchaseOrder $purchase_order)
    {
        return $this->singleResponse(
            new PurchaseOrderResource( $purchase_order->load('products_order') ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdatePurchaseOrderRequest $request
     * @param PurchaseOrder $purchase_order
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePurchaseOrderRequest $request, PurchaseOrder $purchase_order)
    {
        $purchase_order->update( $request->all() );
        return $this->singleResponse(
            new PurchaseOrderResource( $purchase_order->load('products_order') ),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param PurchaseOrder $purchase_order
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(PurchaseOrder $purchase_order)
    {
        $purchase_order->delete();
        return $this->singleResponse(
            new PurchaseOrderResource( $purchase_order ),
            200
        );
    }

    /**
     * Display a listing of the resource in datatable format.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable()
    {
        return datatables()->eloquent( PurchaseOrder::withCount('products_order') )
                            ->addColumn('status', function (PurchaseOrder $purchaseOrder) {
                                return isset( $purchaseOrder->status->name )
                                        ? $purchaseOrder->status->name
                                        : null;
                            })
                            ->addColumn('user', function (PurchaseOrder $purchaseOrder) {
                                return isset( $purchaseOrder->user->name )
                                        ? $purchaseOrder->user->name
                                        : null;
                            })
                            ->toJson();
    }

    /**
     * Update purchase status
     *
     * @param UpdatePurchaseOrderStatusRequest $request
     * @param PurchaseOrder $purchase_order
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function status(UpdatePurchaseOrderStatusRequest $request, PurchaseOrder $purchase_order)
    {
        $purchase_order->status_id = $request->get('status_id');
        $purchase_order->saveOrFail();
        return $this->api_success([
            'message'   =>  "Se ha actualizado el estado de de la órden",
            'code'      =>  200
        ], 200);
    }

}
