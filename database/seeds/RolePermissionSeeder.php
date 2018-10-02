<?php

use Illuminate\Database\Seeder;
use Logistic\Permission;
use Logistic\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $root = new Role;
        $root->name         = 'root';
        $root->display_name = 'Súper Administrador';
        $root->description  = 'Visualiza todos los módulos de la plataforma.';
        $root->save();

        $permissions = [
            'modules'   =>  [
                [
                    'name'          =>  'view-module',
                    'display_name'  =>  'Visualizar Módulo',
                    'description'   =>  'Permite visualizar los módulos de la aplicación.'
                ],
                [
                    'name'          =>  'create-module',
                    'display_name'  =>  'Crear Módulo',
                    'description'   =>  'Permite crear módulos en la aplicación.'
                ],
                [
                    'name'          =>  'edit-module',
                    'display_name'  =>  'Editar Módulo',
                    'description'   =>  'Permite editar módulos en la aplicación.'
                ],
                [
                    'name'          =>  'delete-module',
                    'display_name'  =>  'Eliminar Módulo',
                    'description'   =>  'Permite eliminar módulos en la aplicación.'
                ],
                [
                    'name'          =>  'restore-module',
                    'display_name'  =>  'Restaurar Módulo',
                    'description'   =>  'Permite restaurar módulos eliminados en la aplicación.'
                ],
            ],
            'submodules'   =>  [
                [
                    'name'          =>  'view-submodule',
                    'display_name'  =>  'Visualizar Submódulo',
                    'description'   =>  'Permite visualizar los submódulos de la aplicación.'
                ],
                [
                    'name'          =>  'create-submodule',
                    'display_name'  =>  'Crear Submódulo',
                    'description'   =>  'Permite crear submódulos en la aplicación.'
                ],
                [
                    'name'          =>  'edit-submodule',
                    'display_name'  =>  'Editar Submódulo',
                    'description'   =>  'Permite editar submódulos en la aplicación.'
                ],
                [
                    'name'          =>  'delete-submodule',
                    'display_name'  =>  'Eliminar Submódulo',
                    'description'   =>  'Permite eliminar submódulos en la aplicación.'
                ],
                [
                    'name'          =>  'restore-submodule',
                    'display_name'  =>  'Restaurar Submódulo',
                    'description'   =>  'Permite restaurar submódulos eliminados en la aplicación.'
                ],
            ],
            'users'   =>  [
                [
                    'name'          =>  'view-users',
                    'display_name'  =>  'Visualizar Usuarios',
                    'description'   =>  'Permite visualizar los usuarios de la aplicación.'
                ],
                [
                    'name'          =>  'create-users',
                    'display_name'  =>  'Crear Usuarios',
                    'description'   =>  'Permite crear usuarios en la aplicación.'
                ],
                [
                    'name'          =>  'edit-users',
                    'display_name'  =>  'Editar Usuarios',
                    'description'   =>  'Permite editar usuarios en la aplicación.'
                ],
                [
                    'name'          =>  'delete-users',
                    'display_name'  =>  'Eliminar Usuarios',
                    'description'   =>  'Permite eliminar usuarios en la aplicación.'
                ],
                [
                    'name'          =>  'restore-users',
                    'display_name'  =>  'Restaurar Usuarios',
                    'description'   =>  'Permite restaurar usuarios eliminados en la aplicación.'
                ],
            ],
            'roles'   =>  [
                [
                    'name'          =>  'view-roles',
                    'display_name'  =>  'Visualizar Roles',
                    'description'   =>  'Permite visualizar los roles de la aplicación.'
                ],
                [
                    'name'          =>  'create-roles',
                    'display_name'  =>  'Crear Roles',
                    'description'   =>  'Permite crear roles en la aplicación.'
                ],
                [
                    'name'          =>  'edit-roles',
                    'display_name'  =>  'Editar Roles',
                    'description'   =>  'Permite editar roles en la aplicación.'
                ],
                [
                    'name'          =>  'delete-roles',
                    'display_name'  =>  'Eliminar Roles',
                    'description'   =>  'Permite eliminar roles en la aplicación.'
                ],
                [
                    'name'          =>  'restore-roles',
                    'display_name'  =>  'Restaurar Roles',
                    'description'   =>  'Permite restaurar roles eliminados en la aplicación.'
                ],
            ],
            'permissions'   =>  [
                [
                    'name'          =>  'view-permissions',
                    'display_name'  =>  'Visualizar Permisos',
                    'description'   =>  'Permite visualizar los permisos de la aplicación.'
                ],
                [
                    'name'          =>  'create-permissions',
                    'display_name'  =>  'Crear Permisos',
                    'description'   =>  'Permite crear permisos en la aplicación.'
                ],
                [
                    'name'          =>  'edit-permissions',
                    'display_name'  =>  'Editar Permisos',
                    'description'   =>  'Permite editar permisos en la aplicación.'
                ],
                [
                    'name'          =>  'delete-permissions',
                    'display_name'  =>  'Eliminar Permisos',
                    'description'   =>  'Permite eliminar permisos en la aplicación.'
                ],
                [
                    'name'          =>  'restore-permissions',
                    'display_name'  =>  'Restaurar Permisos',
                    'description'   =>  'Permite restaurar permisos eliminados en la aplicación.'
                ],
            ],
            'companies'   =>  [
                [
                    'name'          =>  'view-companies',
                    'display_name'  =>  'Visualizar Compañías',
                    'description'   =>  'Permite visualizar las compañías de la aplicación.'
                ],
                [
                    'name'          =>  'create-companies',
                    'display_name'  =>  'Crear Compañías',
                    'description'   =>  'Permite crear compañías en la aplicación.'
                ],
                [
                    'name'          =>  'edit-companies',
                    'display_name'  =>  'Editar Compañías',
                    'description'   =>  'Permite editar compañías en la aplicación.'
                ],
                [
                    'name'          =>  'delete-companies',
                    'display_name'  =>  'Eliminar Compañías',
                    'description'   =>  'Permite eliminar compañías en la aplicación.'
                ],
                [
                    'name'          =>  'restore-companies',
                    'display_name'  =>  'Restaurar Compañías',
                    'description'   =>  'Permite restaurar compañías eliminados en la aplicación.'
                ],
            ],
            'business-unities'   =>  [
                [
                    'name'          =>  'view-business-unities',
                    'display_name'  =>  'Visualizar Unidades de Negocio',
                    'description'   =>  'Permite visualizar las unidades de negocio de la aplicación.'
                ],
                [
                    'name'          =>  'create-business-unities',
                    'display_name'  =>  'Crear Unidades de Negocio',
                    'description'   =>  'Permite crear unidades de negocio en la aplicación.'
                ],
                [
                    'name'          =>  'edit-business-unities',
                    'display_name'  =>  'Editar Unidades de Negocio',
                    'description'   =>  'Permite editar unidades de negocio en la aplicación.'
                ],
                [
                    'name'          =>  'delete-business-unities',
                    'display_name'  =>  'Eliminar Unidades de Negocio',
                    'description'   =>  'Permite eliminar unidades de negocio en la aplicación.'
                ],
                [
                    'name'          =>  'restore-business-unities',
                    'display_name'  =>  'Restaurar Unidades de Negocio',
                    'description'   =>  'Permite restaurar unidades de negocio eliminados en la aplicación.'
                ],
            ],
            'products'   =>  [
                [
                    'name'          =>  'view-products',
                    'display_name'  =>  'Visualizar Productos',
                    'description'   =>  'Permite visualizar los productos de la aplicación.'
                ],
                [
                    'name'          =>  'create-products',
                    'display_name'  =>  'Crear Productos',
                    'description'   =>  'Permite crear productos en la aplicación.'
                ],
                [
                    'name'          =>  'edit-products',
                    'display_name'  =>  'Editar Productos',
                    'description'   =>  'Permite editar productos en la aplicación.'
                ],
                [
                    'name'          =>  'delete-products',
                    'display_name'  =>  'Eliminar Productos',
                    'description'   =>  'Permite eliminar productos en la aplicación.'
                ],
                [
                    'name'          =>  'restore-products',
                    'display_name'  =>  'Restaurar Productos',
                    'description'   =>  'Permite restaurar productos eliminados en la aplicación.'
                ],
            ],
            'purchase-order'   =>  [
                [
                    'name'          =>  'view-purchase-order',
                    'display_name'  =>  'Visualizar Ordenes de Compra',
                    'description'   =>  'Permite visualizar las ordenes de compra de la aplicación.'
                ],
                [
                    'name'          =>  'create-purchase-order',
                    'display_name'  =>  'Crear Ordenes de Compra',
                    'description'   =>  'Permite crear ordenes de compra en la aplicación.'
                ],
                [
                    'name'          =>  'edit-purchase-order',
                    'display_name'  =>  'Editar Ordenes de Compra',
                    'description'   =>  'Permite editar ordenes de compra en la aplicación.'
                ],
                [
                    'name'          =>  'delete-purchase-order',
                    'display_name'  =>  'Eliminar Ordenes de Compra',
                    'description'   =>  'Permite eliminar ordenes de compra en la aplicación.'
                ],
                [
                    'name'          =>  'restore-purchase-order',
                    'display_name'  =>  'Restaurar Ordenes de Compra',
                    'description'   =>  'Permite restaurar ordenes de compra eliminados en la aplicación.'
                ],
            ],
        ];

        $modules_view = new Permission;
        $modules_view->fill($permissions['modules'][0]);
        $modules_view->save();
        $modules_create = new Permission;
        $modules_create->fill($permissions['modules'][1]);
        $modules_create->save();
        $modules_edit = new Permission;
        $modules_edit->fill($permissions['modules'][2]);
        $modules_edit->save();
        $modules_delete = new Permission;
        $modules_delete->fill($permissions['modules'][3]);
        $modules_delete->save();
        $modules_restore = new Permission;
        $modules_restore->fill($permissions['modules'][4]);
        $modules_restore->save();

        $submodules_view = new Permission;
        $submodules_view->fill($permissions['submodules'][0]);
        $submodules_view->save();
        $submodules_create = new Permission;
        $submodules_create->fill($permissions['submodules'][1]);
        $submodules_create->save();
        $submodules_edit = new Permission;
        $submodules_edit->fill($permissions['submodules'][2]);
        $submodules_edit->save();
        $submodules_delete = new Permission;
        $submodules_delete->fill($permissions['submodules'][3]);
        $submodules_delete->save();
        $submodules_restore = new Permission;
        $submodules_restore->fill($permissions['submodules'][4]);
        $submodules_restore->save();

        $users_view = new Permission;
        $users_view->fill($permissions['users'][0]);
        $users_view->save();
        $users_create = new Permission;
        $users_create->fill($permissions['users'][1]);
        $users_create->save();
        $users_edit = new Permission;
        $users_edit->fill($permissions['users'][2]);
        $users_edit->save();
        $users_delete = new Permission;
        $users_delete->fill($permissions['users'][3]);
        $users_delete->save();
        $users_restore = new Permission;
        $users_restore->fill($permissions['users'][4]);
        $users_restore->save();

        $roles_view = new Permission;
        $roles_view->fill($permissions['roles'][0]);
        $roles_view->save();
        $roles_create = new Permission;
        $roles_create->fill($permissions['roles'][1]);
        $roles_create->save();
        $roles_edit = new Permission;
        $roles_edit->fill($permissions['roles'][2]);
        $roles_edit->save();
        $roles_delete = new Permission;
        $roles_delete->fill($permissions['roles'][3]);
        $roles_delete->save();
        $roles_restore = new Permission;
        $roles_restore->fill($permissions['roles'][4]);
        $roles_restore->save();

        $permissions_module_view = new Permission;
        $permissions_module_view->fill($permissions['permissions'][0]);
        $permissions_module_view->save();
        $permissions_module_create = new Permission;
        $permissions_module_create->fill($permissions['permissions'][1]);
        $permissions_module_create->save();
        $permissions_module_edit = new Permission;
        $permissions_module_edit->fill($permissions['permissions'][2]);
        $permissions_module_edit->save();
        $permissions_module_delete = new Permission;
        $permissions_module_delete->fill($permissions['permissions'][3]);
        $permissions_module_delete->save();
        $permissions_module_restore = new Permission;
        $permissions_module_restore->fill($permissions['permissions'][4]);
        $permissions_module_restore->save();

        $companies_view = new Permission;
        $companies_view->fill($permissions['companies'][0]);
        $companies_view->save();
        $companies_create = new Permission;
        $companies_create->fill($permissions['companies'][1]);
        $companies_create->save();
        $companies_edit = new Permission;
        $companies_edit->fill($permissions['companies'][2]);
        $companies_edit->save();
        $companies_delete = new Permission;
        $companies_delete->fill($permissions['companies'][3]);
        $companies_delete->save();
        $companies_restore = new Permission;
        $companies_restore->fill($permissions['companies'][4]);
        $companies_restore->save();

        $business_unities_view = new Permission;
        $business_unities_view->fill($permissions['business-unities'][0]);
        $business_unities_view->save();
        $business_unities_create = new Permission;
        $business_unities_create->fill($permissions['business-unities'][1]);
        $business_unities_create->save();
        $business_unities_edit = new Permission;
        $business_unities_edit->fill($permissions['business-unities'][2]);
        $business_unities_edit->save();
        $business_unities_delete = new Permission;
        $business_unities_delete->fill($permissions['business-unities'][3]);
        $business_unities_delete->save();
        $business_unities_restore = new Permission;
        $business_unities_restore->fill($permissions['business-unities'][4]);
        $business_unities_restore->save();

        $products_view = new Permission;
        $products_view->fill($permissions['products'][0]);
        $products_view->save();
        $products_create = new Permission;
        $products_create->fill($permissions['products'][1]);
        $products_create->save();
        $products_edit = new Permission;
        $products_edit->fill($permissions['products'][2]);
        $products_edit->save();
        $products_delete = new Permission;
        $products_delete->fill($permissions['products'][3]);
        $products_delete->save();
        $products_restore = new Permission;
        $products_restore->fill($permissions['products'][4]);
        $products_restore->save();

        $purchase_order_view = new Permission;
        $purchase_order_view->fill($permissions['purchase-order'][0]);
        $purchase_order_view->save();
        $purchase_order_create = new Permission;
        $purchase_order_create->fill($permissions['purchase-order'][1]);
        $purchase_order_create->save();
        $purchase_order_edit = new Permission;
        $purchase_order_edit->fill($permissions['purchase-order'][2]);
        $purchase_order_edit->save();
        $purchase_order_delete = new Permission;
        $purchase_order_delete->fill($permissions['purchase-order'][3]);
        $purchase_order_delete->save();
        $purchase_order_restore = new Permission;
        $purchase_order_restore->fill($permissions['purchase-order'][4]);
        $purchase_order_restore->save();

        $root_permissions = [
            $modules_view,
            $modules_create,
            $modules_edit,
            $modules_delete,
            $modules_restore,
            $submodules_view,
            $submodules_create,
            $submodules_edit,
            $submodules_delete,
            $submodules_restore,
            $users_view,
            $users_create,
            $users_edit,
            $users_delete,
            $users_restore,
            $roles_view,
            $roles_create,
            $roles_edit,
            $roles_delete,
            $roles_restore,
            $permissions_module_view,
            $permissions_module_create,
            $permissions_module_edit,
            $permissions_module_delete,
            $permissions_module_restore,
            $companies_view,
            $companies_create,
            $companies_edit,
            $companies_delete,
            $companies_restore,
            $business_unities_view,
            $business_unities_create,
            $business_unities_edit,
            $business_unities_delete,
            $business_unities_restore,
            $products_view,
            $products_create,
            $products_edit,
            $products_delete,
            $products_restore,
            $purchase_order_view,
            $purchase_order_create,
            $purchase_order_edit,
            $purchase_order_delete,
            $purchase_order_restore,
        ];

        $root->attachPermissions( $root_permissions );

        factory( \Logistic\User::class )->create([
            'email'         =>  'root@app.com',
            'company_id'    =>  1
        ])->attachRole($root);
    }
}
