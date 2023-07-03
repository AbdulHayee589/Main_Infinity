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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('gender')->nullable();
            $table->string('dateOfBirth')->nullable();
            $table->string('email')->unique();
            $table->unsignedBigInteger("shippingAddressId")->nullable();
            $table->unsignedBigInteger("billingAddressId")->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->enum("oauth", ['facebook', 'google', 'discord', 'instagram'])->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('shippingAddressId')->references('id')->on('address_books');
            $table->foreign('billingAddressId')->references('id')->on('address_books');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
