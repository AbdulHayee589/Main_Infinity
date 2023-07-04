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
        Schema::create('blueprints', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bp_id')->unique();
            $table->text("title");
            $table->text("description");
            $table->string("brand")->nullable();
            $table->string("model")->nullable();
            $table->unsignedBigInteger("category_id")->nullable();
            $table->longText("images")->nullable();
            $table->longText("filters")->nullable();
            $table->boolean("isActive")->default(false);
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories');
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
