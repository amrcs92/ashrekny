<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Organization;
class OrganizationsTableSeeder extends Seeder
{
    static $number=10;
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,10) as $index)
        {
            Organization::create([
					        'name' => $faker->name,
					        'logo' => 'public/images/sample.jpg',
					        'description' => $faker->name,
					        'full_address' => $faker->address,
					        'license_scan' =>'public/images/sample.jpg',
					        'license_number' => $faker->name,
					        'openning_hours' => $faker->unique()->name,
                            'user_id'=>OrganizationsTableSeeder::autoIncrement(),
                            ]);
        }
    }
    public static function autoIncrement()
            {
                return ++self::$number;
            }
}
