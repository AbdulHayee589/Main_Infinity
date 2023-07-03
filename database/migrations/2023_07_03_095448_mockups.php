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
        Schema::create('mockups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bp_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('pp_id');
            $table->unsignedBigInteger('v_id');
            $table->text("title");
            $table->text("description");
            $table->json("print_areas");
            $table->boolean("isActive")->default(false);
            $table->timestamps();

            $table->foreign('bp_id')->references('bp_id')->on('blueprints');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blueprints');
    }
};
