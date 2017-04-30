<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaskVolunteer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_volunteer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('volunteer_id')->unsigned();
            $table->foreign('volunteer_id')->references('id')
            ->on('volunteers')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('task_id')->unsigned();
            $table->foreign('task_id')->references('id')
            ->on('tasks')->onDelete('cascade')->onUpdate('cascade');
            $table->unique(array('task_id','volunteer_id'));
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
        Schema::dropIfExists('task_volunteer');
    }
}
