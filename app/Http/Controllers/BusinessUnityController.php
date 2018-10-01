<?php

namespace Logistic\Http\Controllers;

use Logistic\BusinessUnity;
use Logistic\Http\Requests\StoreBussinesUnityRequest;
use Logistic\Http\Resources\BussinesUnityResource;

class BusinessUnityController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->collectionResponse(
            BussinesUnityResource::collection(
                $this->getModel( new BusinessUnity )
            ),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreBussinesUnityRequest $request
     * @return \Illuminate\Http\Response
     * @throws \Throwable
     */
    public function store(StoreBussinesUnityRequest $request)
    {
        $business_unity = new BusinessUnity;
        $business_unity->fill( $request->all() );
        $business_unity->saveOrFail();
        return $this->api_success([
            'data'      =>  new BussinesUnityResource( $business_unity ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param BusinessUnity $businessUnity
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BusinessUnity $businessUnity)
    {
        return $this->singleResponse(
            new BussinesUnityResource( $businessUnity ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreBussinesUnityRequest $request
     * @param BusinessUnity $businessUnity
     * @return \Illuminate\Http\Response
     */
    public function update(StoreBussinesUnityRequest $request, BusinessUnity $businessUnity)
    {
        $businessUnity->update( $request->all() );
        return $this->api_success([
            'data'      =>  new BussinesUnityResource( $businessUnity ),
            'message'   =>  __('pages.responses.updated'),
            'code'      =>  200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param BusinessUnity $businessUnity
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(BusinessUnity $businessUnity)
    {
        $businessUnity->delete();
        return $this->api_success([
            'data'      =>  new BussinesUnityResource( $businessUnity ),
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
        return datatables()->eloquent( BusinessUnity::query() )->toJson();
    }

}
