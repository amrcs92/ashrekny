<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Phone;
class PhonesTableSeeder extends Seeder
{
    static $number=0;
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,10) as $index)
        {
            
            Phone::create([
						        'organization_id'=>PhonesTableSeeder::autoIncrement(),
						        'phone_number'=> $faker->phoneNumber,
						    ]);
        }
    }
     public static function autoIncrement()
            {
                return ++self::$number;
            }
}
