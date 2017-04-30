<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 100);
            $table->text('description');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('country', 100);
            $table->string('city', 100);
            $table->string('region', 100);
            $table->string('full_address', 200)->nullable();
            $table->integer('avg_rate', false)->nullable();
            $table->integer('organization_id')->unsigned();
            $table->text('logo')->nullable();
            $table->foreign('organization_id')->references('id')
            ->on('organizations')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('events');
    }
}
