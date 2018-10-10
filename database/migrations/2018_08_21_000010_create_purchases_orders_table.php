<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchasesOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('delivery_address', 191);
            $table->dateTime('delivery_at');
            $table->dateTime('requested_at');
            $table->unsignedInteger('status_id');
            $table->unsignedInteger('business_unity_id');
            $table->unsignedInteger('provider_id');
            $table->unsignedInteger('user_id');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('status_id')->references('id')->on('status');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('business_unity_id')->references('id')->on('business_unities');
            $table->foreign('provider_id')->references('id')->on('companies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases_orders');
    }
}
