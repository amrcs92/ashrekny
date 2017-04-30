<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Story;
class StoriesTableSeeder extends Seeder
{
    static $number=0;
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,10) as $index)
        {
            Story::create([
						        'content' => $faker->address,
						        'title' =>$faker->name,
						        'volunteer_id'=>StoriesTableSeeder::autoIncrement(),
						 ]);
        }
    }
     public static function autoIncrement()
            {
                return ++self::$number;
            }
}
