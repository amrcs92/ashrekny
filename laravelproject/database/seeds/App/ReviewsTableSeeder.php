<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Review;
class ReviewsTableSeeder extends Seeder
{
    static $number=0;
    static $number2=0;
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,10) as $index)
        {
            Review::create([
						        'comment' => $faker->address,
						        'event_id'=>ReviewsTableSeeder::autoIncrement(),
						        'volunteer_id'=>ReviewsTableSeeder::autoIncrement2(),

						        'rate'=>$faker->numberBetween($min = 1, $max = 5),
						    ]);
        }
    }
     public static function autoIncrement()
            {
                return ++self::$number;
            }
            public static function autoIncrement2()
            {
                return ++self::$number2;
            }
}
