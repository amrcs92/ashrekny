<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class EventAlbum extends Model
{
	public $table = "event_album";
    public function event(){
    	return $this->belongsTo('App\Event');
    }
}
