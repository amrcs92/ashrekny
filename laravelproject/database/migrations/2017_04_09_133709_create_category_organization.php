<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryOrganization extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_organization', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')
            ->on('categories')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('organization_id')->unsigned();
            $table->foreign('organization_id')->references('id')
            ->on('organizations')->onDelete('cascade')->onUpdate('cascade');
            $table->unique(array('organization_id','category_id'));
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
        Schema::dropIfExists('category_organization');
    }
}
