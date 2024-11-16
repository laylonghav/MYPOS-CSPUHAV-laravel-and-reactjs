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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); // Customer's first name
            $table->string('last_name'); // Customer's last name
            $table->string('email')->unique(); // Customer's unique email address
            $table->string('phone')->nullable(); // Optional phone number
            $table->string('address')->nullable(); // Optional address
            $table->string('city')->nullable(); // Optional city
            $table->string('state')->nullable(); // Optional state or province
            $table->string('zip_code')->nullable(); // Optional zip/postal code
            $table->date('date_of_birth')->nullable(); // Optional date of birth
            $table->boolean('status')->default(false); // Indicates if the customer is active
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
