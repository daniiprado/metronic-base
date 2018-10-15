<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Pages Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'top-bar'   =>  [
        'language'  =>  'Select your language.',
    ],

    'login' => [
        'sign_in'           =>  'Login to your account',
        'forget_password'   =>  'Foget Password?',
        'enter_email'       =>  'Enter your email to reset your password.',
        'description'       =>  'Contingencies Control System',
    ],

    'users' => [
        'title' =>  '{0} :prefix User|{2} Users',
    ],
    'roles' => [
        'title' =>  '{0} :prefix Role|{2} Roles',
    ],
    'permissions' => [
        'title' =>  '{0} :prefix Permissions|{2} Permissions',
    ],
    'attach' => [
        'title' =>  'Attach permissions to :role',
    ],
    'attach_role' => [
        'title' =>  'Attach role to :user',
    ],
    'modules' => [
        'title' =>  '{0} :prefix Module|{2} Modules',
    ],
    'submodules' => [
        'title' =>  '{0} :prefix Submodule|{2} Submodules',
    ],
    'company' => [
        'title' =>  '{0} :prefix Company|{2} Companies',
    ],
    'business_unity' => [
        'title' =>  '{0} :prefix Business Unity|{2} Business Unities',
    ],
    'product' => [
        'title' =>  '{0} :prefix Product|{2} Products',
    ],
    'purchase_order' => [
        'title' =>  '{0} :prefix Purchase Order|{2} Pruchase Orders',
    ],
    'purchase' => [
        'title' =>  '{0} :prefix Purchase|{2} Purchases',
    ],
    'security' => [
        'title' =>  '{0} :prefix Security|{2} Security',
    ],
    'customer' => [
        'title' =>  '{0} :prefix Customers|{2} Customers',
    ],

    'buttons' => [
        'details'       =>  'Details',
        'sign_in'       =>  'Sign In',
        'log_out'       =>  'Sign Out',
        'create'        =>  'Create',
        'view'          =>  'View',
        'select'        =>  'Select',
        'update'        =>  'Update',
        'edit'          =>  'Edit',
        'attach_perm'   =>  'Attach Permissions',
        'attach_role'   =>  'Attach Roles',
        'delete'        =>  'Delete',
        'remove'        =>  'Remove',
        'restore'       =>  'Restore',
        'save'          =>  'Save',
        'cancel'        =>  'Cancel',
        'add'           =>  'Add',
        'add_file'      =>  'Add File',
        'add_product'   =>  'Add Product',
        'zoom_in'       =>  'Zoom in',
        'zoom_out'      =>  'Zoom out',
        'rotate'        =>  'Rotate',
        'new'           =>  'New',
        'print'         =>  'Print',
        'copy'          =>  'Copy',
        'excel'         =>  'Excel',
        'csv'           =>  'CSV',
        'pdf'           =>  'PDF',
        'qr'            =>  'Generate QR',
        'bar'           =>  'Generate Barcode',
        'export_tools'  =>  'Export Tools',
    ],

    'messages'  =>  [
        'success'   =>  '¡Well Done!',
        'warning'   =>  'Warning',
        'error'     =>  'Error',
        'info'      =>  'Info',
        'question'  =>  'Question',
        'comfirm_delete' => '{1} Are you sure to delete this element?|[2,*] Are you sure to delete these :quantity elements?',
        'check_products' => 'To send this request you must to add at least one product.',
        'confirm_cancel' => 'Are you sure to cancel this purchase order?',
    ],

    'responses' =>  [
        'created'       =>  'Data successfully saved.',
        'created_fail'  =>  'Try again, the data was not saved successfully.',
        'updated'       =>  'Data successfully updated.',
        'updated_fail'  =>  'Try again, the data was not updated successfully.',
        'deleted'       =>  'Data successfully deleted.',
        'deleted_fail'  =>  'Try again, the data was not deleted successfully.',
        'empty'         =>  'Type to search :search'
    ],

];
