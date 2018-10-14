<?php

use Illuminate\Database\Seeder;

class CompaniesUsersProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Create a companies
         */
        factory( \Logistic\Company::class )
            ->create([
                'name'  =>  'Colanta',
                'nit'   =>  '890904478-6',
                'phone' =>  '8257013'
            ])
            ->each(function ($company) {
                /**
                 * Create new users
                 */
                $company->users()->save( factory( \Logistic\User::class )->make() );
                /**
                 * Create new products
                 */
                $company->products()->createMany( [
                    [
                        'code'  =>  '7702129014168',
                        'name'  =>  'Cuajada',
                        'price' =>  '5600',
                    ],
                    [
                        'code'  =>  '7702129073141',
                        'name'  =>  'Salchicha Montefrio',
                        'price' =>  '10000',
                    ],
                    [
                        'code'  =>  '7702129072328',
                        'name'  =>  'Chorizo Campesino',
                        'price' =>  '6000',
                    ],
                ]);
            });

    }
}
