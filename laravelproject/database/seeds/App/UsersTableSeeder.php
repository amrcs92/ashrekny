<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\User;
class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // TestDummy::times(20)->create('App\Post');
        $faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
            User::create([
                            'email' => $faker->unique()->safeEmail,
                            'country'=>$faker->country,
                            'region'=>$faker->country,
                            'city'=>$faker->city,
                            'password' =>bcrypt('fourcats'),
                            'remember_token' => str_random(10),
                        ]);
        }
    }
}
