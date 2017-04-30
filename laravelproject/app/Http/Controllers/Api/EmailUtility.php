<?php

namespace App\Http\Controllers\Api;
use Mail;
class EmailUtility
{
    /*
    *   use App\Http\Controllers\Api\EmailUtility;
    *   EmailUtility::send('email here','subject here','content here');
    *
    */

    
        
    public static function send($email,$subject,$content)
    {
         
        Mail::send('Email',['content' => $content], function ($message) use ($subject,$email)
        {

            $message->from('Eshrkny@gmail.com', 'Eshrkny Company');

            $message->to($email)->subject($subject);

        });

        return true;

    }
}
