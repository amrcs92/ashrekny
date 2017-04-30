<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    public function organization(){
    	return $this->belongsTo('App\Organization');
    }
}
