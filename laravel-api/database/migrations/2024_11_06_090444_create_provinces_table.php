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
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Province name
            $table->string('code')->unique(); // Unique province code
            $table->string('region'); // Region where the province is located
            $table->integer('population')->nullable(); // Population count, nullable if unknown
            $table->float('area')->nullable(); // Area of the province in square kilometers
            $table->text('description')->nullable(); // Description or additional info about the province
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
