<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Story extends Model
{
    public function volunteer(){
    	return $this->belongsTo('App\Volunteer');
    } 
    



}
