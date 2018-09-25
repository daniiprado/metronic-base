<?php

namespace Logistic\Http\Controllers;

use Logistic\Http\Requests\StoreModuleRequest;
use Logistic\Http\Requests\UpdateModuleRequest;
use Logistic\Http\Resources\ModuleResource;
use Logistic\Module;

class ModuleController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return datatables()->eloquent( Module::query() )->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreModuleRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreModuleRequest $request)
    {
        $module = new Module;
        $module->create( $request->all() );
        return $this->api_success([
            'data'      =>  new ModuleResource( $module ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Module $module
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Module $module)
    {
        return $this->singleResponse(
            new ModuleResource( $module ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateModuleRequest $request
     * @param Module $module
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateModuleRequest $request, Module $module)
    {
        $module->update( $request->all() );
        return $this->api_success([
            'data'      =>  new ModuleResource( $module ),
            'message'   =>  __('pages.responses.updated'),
            'code'      =>  200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Module $module
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Module $module)
    {
        $module->delete();
        return $this->api_success([
            'data'      =>  new ModuleResource( $module ),
            'message'   =>  __('pages.responses.deleted'),
            'code'      =>  200
        ], 200);
    }
}
