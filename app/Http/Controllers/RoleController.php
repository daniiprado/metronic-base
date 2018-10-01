<?php

namespace Logistic\Http\Controllers;

use Logistic\Http\Requests\StoreRoleRequest;
use Logistic\Http\Requests\UpdateRoleRequest;
use Logistic\Http\Resources\RoleResource;
use Logistic\Role;

class RoleController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->collectionResponse(
            RoleResource::collection( $this->getModel( new Role ) ),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreRoleRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function store(StoreRoleRequest $request)
    {
        $role = new Role();
        $role->fill( $request->all() );
        $role->saveOrFail( $request->all() );
        return $this->api_success([
            'data'      =>  new RoleResource( $role ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Role $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Role $role)
    {
        return $this->singleResponse(
            new RoleResource( $role ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateRoleRequest $request
     * @param Role $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update( $request->all() );
        return $this->api_success([
            'data'      =>  new RoleResource( $role ),
            'message'   =>  __('pages.responses.updated'),
            'code'      =>  200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Role $role
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return $this->api_success([
            'data'      =>  new RoleResource( $role ),
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
        return datatables()->eloquent( Role::query() )->toJson();
    }
}
