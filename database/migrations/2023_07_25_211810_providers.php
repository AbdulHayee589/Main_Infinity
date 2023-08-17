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
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('blueprint_id');
            $table->unsignedBigInteger('internal_id')->index();
            $table->text("title");
            $table->json("variants");
            $table->float("price")->default(0);
            $table->boolean("isActive")->default(false);
            $table->timestamps();
            $table->foreign('blueprint_id')->references('id')->on('blueprints');
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
