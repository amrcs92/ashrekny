<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\EventAlbum;
class EventAlbumsTableSeeder extends Seeder
{
    static $number=0;
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,10) as $index)
        {
            EventAlbum::create([
                            'photo_link' => 'public/images/sample.jpg',
                            'event_id'=>EventAlbumsTableSeeder::autoIncrement(),
                        ]);
        }
    }
     public static function autoIncrement()
            {
                return ++self::$number;
            }
}
