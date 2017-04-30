<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryEvent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_event', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')
            ->on('categories')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('event_id')->unsigned();
            $table->foreign('event_id')->references('id')
            ->on('events')->onDelete('cascade')->onUpdate('cascade');
            $table->unique(array('event_id','category_id'));
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
        Schema::dropIfExists('category_event');
    }
}
