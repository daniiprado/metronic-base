<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Pages Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during pages for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'login' => [
        'forget_password'   =>  '¿Olvidaste tu contraseña?'
    ],
    'users' => [
        'title' =>  '{0} :prefix Usuario|{2} Usuarios',
    ],
    'roles' => [
        'title' =>  '{0} :prefix Rol|{2} Roles',
    ],
    'permissions' => [
        'title' =>  '{0} :prefix Permiso|{2} Permisos',
    ],
    'attach' => [
        'title' =>  'Asignar permisos para :role',
    ],
    'attach_role' => [
        'title' =>  'Asignar rol para :user',
    ],
    'modules' => [
        'title' =>  '{0} :prefix Módulo|{2} Módulos',
    ],
    'submodules' => [
        'title' =>  '{0} :prefix Submódulo|{2} Submódulos',
    ],
    'company' => [
        'title' =>  '{0} :prefix Compañía|{2} Compañías',
    ],
    'business_unity' => [
        'title' =>  '{0} :prefix Unidad de Negocio|{2} Unidates de Negocio',
    ],
    'product' => [
        'title' =>  '{0} :prefix Producto|{2} Productos',
    ],
    'purchase_order' => [
        'title' =>  '{0} :prefix Orden de Compra|{2} Ordenes de compra',
    ],
    'purchase' => [
        'title' =>  '{0} :prefix Compra|{2} Compras',
    ],
    'security' => [
        'title' =>  '{0} :prefix Seguridad|{2} Seguridad',
    ],
    'customer' => [
        'title' =>  '{0} :prefix Cliente|{2} Clientes',
    ],

    'buttons' => [
        'details'       =>  'Detalles',
        'sign_in'       =>  'Iniciar Sesión',
        'log_out'       =>  'Cerrar Sesión',
        'create'        =>  'Crear',
        'view'          =>  'Ver',
        'select'        =>  'Seleccionar',
        'update'        =>  'Actualizar',
        'edit'          =>  'Modificar',
        'attach_perm'   =>  'Asignar Permisos',
        'attach_role'   =>  'Asignar Roles',
        'delete'        =>  'Eliminar',
        'remove'        =>  'Remover',
        'restore'       =>  'Restaurar',
        'save'          =>  'Guardar',
        'cancel'        =>  'Cancelar',
        'add'           =>  'Añadir',
        'add_file'      =>  'Añadir Archivo',
        'add_product'   =>  'Añadir Producto',
        'zoom_in'       =>  'Ampliar',
        'zoom_out'      =>  'Alejar',
        'rotate'        =>  'Girar',
        'new'           =>  'Nuevo',
        'print'         =>  'Imprimir',
        'copy'          =>  'Copiar',
        'excel'         =>  'Excel',
        'csv'           =>  'CSV',
        'pdf'           =>  'PDF',
        'qr'            =>  'Generar QR',
        'bar'           =>  'Generar Códigos de Barras',
        'export_tools'  =>  'Herramientas de Exportación',
    ],

    'messages'  =>  [
        'success'   =>  '¡Bien Hecho!',
        'warning'   =>  'Advertencia',
        'error'     =>  'Error',
        'info'      =>  'Información',
        'question'  =>  'Pregunta',
        'comfirm_delete' => '{1} ¿Estás seguro que deseas eliminar este elemento?|[2,*] ¿Estás seguro que deseas eliminar :quantity elementos?',
        'check_products' => 'Para enviar esta solicitud debes añadir al menos un producto.',
        'confirm_cancel' => '¿Estás seguro de cancelar la orden de compra?',
    ],

    'responses' =>  [
        'created'       =>  'Se han almacenado los datos satisfactoriamente.',
        'created_fail'  =>  'No se han almacenado los datos intenta de nuevo.',
        'updated'       =>  'Se han actualizado los datos satisfactoriamente.',
        'updated_fail'  =>  'No se han actualizado los datos intenta de nuevo.',
        'deleted'       =>  'Se han eliminado los datos satisfactoriamente.',
        'deleted_fail'  =>  'No se han eliminado los datos intenta de nuevo.',
        'cant_delete'   =>  'No se puede eliminar esta orden con estado :status',
    ],

];
