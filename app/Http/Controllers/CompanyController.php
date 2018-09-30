<?php

namespace Logistic\Http\Controllers;

use Logistic\Company;
use Logistic\Http\Requests\StoreCompanyRequest;
use Logistic\Http\Requests\UpdateCompanyRequest;
use Logistic\Http\Resources\CompanyResource;

class CompanyController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->collectionResponse(
            CompanyResource::collection(
                $this->getModel( new Company )
            ),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCompanyRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function store(StoreCompanyRequest $request)
    {
        $company = new Company;
        $company->fill( $request->all() );
        $company->saveOrFail();
        return $this->api_success([
            'data'      =>  new CompanyResource( $company ),
            'message'   =>  __('pages.responses.created'),
            'code'      =>  201
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Company $company)
    {
        return $this->singleResponse(
            new CompanyResource( $company ),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateCompanyRequest $request
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $company->update( $request->all() );
        return $this->api_success([
            'data'      =>  new CompanyResource( $company ),
            'message'   =>  __('pages.responses.updated'),
            'code'      =>  200
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Company $company
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return $this->api_success([
            'data'      =>  new CompanyResource( $company ),
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
        return datatables()->eloquent( Company::query() )->toJson();
    }
}
