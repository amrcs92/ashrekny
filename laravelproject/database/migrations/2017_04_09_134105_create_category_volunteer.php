<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryVolunteer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_volunteer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')
            ->on('categories')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('volunteer_id')->unsigned();
            $table->foreign('volunteer_id')->references('id')
            ->on('volunteers')->onDelete('cascade')->onUpdate('cascade');
            $table->unique(array('category_id','volunteer_id'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_volunteer');
    }
}
