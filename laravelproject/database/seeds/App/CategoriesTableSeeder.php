<?php

use Illuminate\Database\Seeder;

// composer require laracasts/testdummy
use Laracasts\TestDummy\Factory as TestDummy;
use App\Category;
class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
    	$faker = Faker\Factory::create(); 
 
        foreach(range(1,20) as $index)
        {
	        Category::create([
	                            'name'=>$faker->name,
	                        ]);
    	}
    }
}
