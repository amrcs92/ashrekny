<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class OrganizationAlbum extends Model
{
	public $table = "organization_album";
	
	public function event(){
    	return $this->belongsTo('App\Organization');
    }
}
