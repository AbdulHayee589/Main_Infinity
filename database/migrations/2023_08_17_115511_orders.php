<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("printifyId")->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('bp_id');
            $table->unsignedBigInteger('provider_id');
            $table->unsignedBigInteger('variant_id');
            $table->unsignedBigInteger('shipping_id');
            $table->unsignedBigInteger('billing_id');
            $table->longText("print_areas");
            $table->longText("print_details")->nullable();
            $table->boolean("paid")->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('bp_id')->references('bp_id')->on('blueprints');
            $table->foreign('provider_id')->references('id')->on('providers');
            $table->foreign('shipping_id')->references('id')->on('address_books');
            $table->foreign('billing_id')->references('id')->on('address_books');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
