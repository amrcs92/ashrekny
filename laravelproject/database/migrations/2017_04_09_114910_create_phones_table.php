<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phones', function(Blueprint $table){
            $table->increments('id');
            $table->integer('organization_id')->unsigned();
            $table->string('phone_number', 50);
            $table->foreign('organization_id')->references('id')
            ->on('organizations')->onDelete('cascade')->onUpdate('cascade');
            $table->unique(array('organization_id','phone_number'));
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
        Schema::dropIfExists('phones');
    }
}
