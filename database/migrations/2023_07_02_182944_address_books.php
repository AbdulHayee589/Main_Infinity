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
        Schema::create('address_books', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone_number')->nullable()->default(null);
            $table->string('address');
            $table->string('city');
            $table->string('country');
            $table->string('zip_code');
            $table->boolean('is_company')->default(false);
            $table->string('company_name')->nullable();
            $table->string('EIK')->nullable();
            $table->string('DDS')->nullable();
            $table->string('MOL')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address_books');
    }
};
