<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Link;
class LinksTableSeeder extends Seeder
{
    static $number=0;
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,10) as $index)
        {
            Link::create([
						        'description' => $faker->name,
						        'link' =>'www.google.com',
						        'organization_id'=>LinksTableSeeder::autoIncrement(),
						    ]);
        }
    }
     public static function autoIncrement()
            {
                return ++self::$number;
            }
}
