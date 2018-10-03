<?php

namespace Logistic\Http\Controllers;

use Logistic\Http\Requests\StorePermissionRequest;
use Logistic\Http\Requests\UpdatePermissionRequest;
use Logistic\Http\Resources\PermissionResource;
use Logistic\Permission;

class PermissionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->collectionResponse(
            PermissionResource::collection( Permission::all() ),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StorePermissionRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function store(StorePermissionRequest $request)
    {
        $permission = new Permission;
        $permission->fill( $request->all() );
        $permission->saveOrFail( $request->all() );
        return $this->api_success([
            'data'      =>  new PermissionResource( $permission ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Permission $permission
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Permission $permission)
    {
        return $this->singleResponse(
            new PermissionResource( $permission ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdatePermissionRequest $request
     * @param Permission $permission
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $permission->update( $request->all() );
        return $this->api_success([
            'data'      =>  new PermissionResource( $permission ),
            'message'   =>  __('pages.responses.updated'),
            'code'      =>  200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Permission $permission
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();
        return $this->api_success([
            'data'      =>  new PermissionResource( $permission ),
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
        return datatables()->eloquent( Permission::query() )->toJson();
    }
}
