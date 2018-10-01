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

    Route::middleware('auth:api')->get('user', function (Request $request) {
        return $request->user();
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

    Route::resource('issues', 'IssueController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('status', 'StatusController', [
        'except' => ['create', 'edit']
    ]);

    /**
     * Administrative Routes
     */
    Route::get('module/datatable', 'ModuleController@datatable');
    Route::resource('modules', 'ModuleController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('submodule/datatable', 'SubmoduleController@datatable');
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
