<?php

namespace Logistic\Http\Controllers;

use Logistic\Http\Requests\StoreRolePermissionRequest;
use Logistic\Http\Requests\UpdateRolePermissionRequest;
use Logistic\Http\Resources\RoleResource;
use Logistic\Permission;
use Logistic\Role;

class RolePermissionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param Role $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Role $role)
    {
        return $this->singleResponse(
            new RoleResource( $role->load('perms') ),
            200
        );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param StoreRolePermissionRequest $request
     * @param Role $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreRolePermissionRequest $request, Role $role)
    {
        if ( $role->has('perms') ) {
            $role->detachPermissions( $role->perms );
        }
        $role->attachPermissions( $request->get('permissions') );
        return $this->api_success([
            'data'      =>  new RoleResource( $role->load('perms') ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Role $role
     * @param Permission $permission
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRolePermissionRequest $request, Role $role, Permission $permission)
    {
        $role->attachPermissions( $permission );

        return $this->singleResponse(
            new RoleResource( $role->with('permissions')->get() ),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Role $role
     * @param Permission $permission
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Role $role, Permission $permission)
    {
        $role->detachPermission( $permission );
        return $this->singleResponse(
            new RoleResource( $role->with('permissions')->get() ),
            200
        );
    }
}
