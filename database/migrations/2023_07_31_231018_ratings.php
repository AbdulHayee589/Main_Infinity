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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->boolean("isMockup")->default(false);
            $table->unsignedBigInteger('bp_id')->nullable();
            $table->unsignedBigInteger('mc_id')->nullable();
            $table->unsignedBigInteger("by_id");
            $table->integer("star_rating")->default(1);
            $table->string("message")->nullable();
            $table->boolean("isApproved")->default(false);
            $table->timestamps();
            $table->foreign('bp_id')->references('id')->on('blueprints');
            $table->foreign('mc_id')->references('id')->on('mockups');
            $table->foreign('by_id')->references('id')->on('users');
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
