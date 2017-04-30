<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventVolunteer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_volunteer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('event_id')->unsigned();
            $table->foreign('event_id')->references('id')
            ->on('events')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('volunteer_id')->unsigned();
            $table->foreign('volunteer_id')->references('id')
            ->on('volunteers')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('rate', false)->default(0);
            $table->string('comment', 200)->nullable();
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
        Schema::dropIfExists('event_volunteer');
    }
}
