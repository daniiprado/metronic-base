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
    Route::get('company/datatable', 'CompanyController@datatable');
    Route::resource('company', 'CompanyController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('product/datatable', 'ProductController@datatable');
    Route::resource('product', 'ProductController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('products-order/status', 'ProductsOrderController@status');
    Route::resource('products-order', 'ProductsOrderController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('purchase-order', 'PurchaseOrderController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('issue', 'IssueController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('status', 'StatusController', [
        'except' => ['create', 'edit']
    ]);

    /**
     * Administrative Routes
     */
    Route::get('module/datatable', 'ModuleController@datatable');
    Route::resource('module', 'ModuleController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('submodule/datatable', 'SubmoduleController@datatable');
    Route::resource('submodule', 'SubmoduleController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('submodule-action', 'SubmoduleActionController', [
        'except' => ['create', 'edit']
    ]);

    /**
     * Roles and Permissions routes
     */

    Route::resource('permission', 'PermissionController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('role', 'RoleController', [
        'except' => ['create', 'edit']
    ]);

    Route::get('users/datatable', 'UserController@datatable');
    Route::resource('users', 'UserController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('user.role', 'UserRoleController', [
        'except' => ['create', 'edit']
    ]);

    Route::resource('role.permission', 'RolePermissionController', [
        'except' => ['create', 'edit', 'show']
    ]);

});
