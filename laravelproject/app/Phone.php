<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Phone extends Model
{
    public function organization(){
    	return $this->belongsTo('App\Organization');
    }
}
