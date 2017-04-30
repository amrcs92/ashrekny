<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnAttendToEventOrganizationVolunteerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('event_organization_volunteer', function (Blueprint $table) {
            $table->boolean('attend');  
            });      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('event_organization_volunteer', function($table) {
               $table->dropColumn('attend');
            });
    }
}
