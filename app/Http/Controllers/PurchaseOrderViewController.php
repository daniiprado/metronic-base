<?php

namespace Logistic\Http\Controllers;

use Illuminate\Http\Request;

class PurchaseOrderViewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $purchase_order
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($purchase_order)
    {
        $purchase = PurchaseOrder::with([
            'products_order' => function ($query) {
                return $query->withCount('issues')->with('product', 'issues');
            },
            'status:id,name',
            'user:id,name',
            'provider:id,name,nit',
            'business_unity:id,name',
        ])->find( $purchase_order );

        return response()->json( $purchase, 200 );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
