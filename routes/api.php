<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('oauth/token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');

Route::prefix('api')->group( function () {

    Route::get('user', function (Request $request) {
        return response()->json(
            \Logistic\User::with([
                'company:id,name',
                'roles' =>  function ($query){
                    return $query->select(['id', 'name'])->with('perms:id,name');
                }
            ])->find( auth('api')->user()->id ),
            200
        );
    });

    /**
     * Application Routes
     */
    Route::resource('companies.products', 'CompanyProductController', [
        'only' => ['index']
    ]);
    Route::get('companies/datatable', 'CompanyController@datatable');
    Route::resource('companies', 'CompanyController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('business-unity/datatable', 'BusinessUnityController@datatable');
    Route::resource('business-unity', 'BusinessUnityController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('products/datatable', 'ProductController@datatable');
    Route::resource('products', 'ProductController', [
        'except' => ['create', 'edit']
    ]);

    Route::patch('products-order/status', 'ProductsOrderController@status');
    Route::patch('products-order/transit', 'ProductsOrderController@transit');
    Route::resource('products-order', 'ProductsOrderController', [
        'except' => ['create', 'edit']
    ]);

    Route::patch('purchase-order/status', 'PurchaseOrderController@status');
    Route::get('purchase-order/datatable', 'PurchaseOrderController@datatable');
    Route::resource('purchase-order.products-order', 'PurchaseOrderProductOrderController', [
        'only' => ['index']
    ]);
    Route::resource('purchase-order', 'PurchaseOrderController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('products-order.issues', 'ProductsOrderIssueController', [
        'only' => ['store']
    ]);

    Route::resource('issues', 'IssueController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('status', 'StatusController', [
        'except' => ['create', 'edit']
    ]);

    /**
     * Administrative Routes
     */
    Route::get('modules/datatable', 'ModuleController@datatable');
    Route::resource('modules', 'ModuleController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('submodules/datatable', 'SubmoduleController@datatable');
    Route::resource('submodules', 'SubmoduleController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('submodule-action', 'SubmoduleActionController', [
        'except' => ['create', 'edit']
    ]);

    /**
     * Roles and Permissions routes
     */

    Route::get('permissions/datatable', 'PermissionController@datatable');
    Route::resource('permissions', 'PermissionController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('roles/datatable', 'RoleController@datatable');
    Route::resource('roles', 'RoleController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('users/datatable', 'UserController@datatable');
    Route::resource('users', 'UserController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('users.roles', 'UserRoleController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('roles.permissions', 'RolePermissionController', [
        'except' => ['create', 'edit', 'show']
    ]);

});
