<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
 
        $this->call(UsersTableSeeder::class);
        $this->call(OrganizationsTableSeeder::class);
        $this->call(VolunteersTableSeeder::class);


        $this->call(EventsTableSeeder::class);
        $this->call(TasksTableSeeder::class);
        $this->call(StoriesTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);

        $this->call(OrganizationAlbumsTableSeeder::class);
        $this->call(EventAlbumsTableSeeder::class);
        $this->call(LinksTableSeeder::class);
        $this->call(PhonesTableSeeder::class);
        $this->call(ReviewsTableSeeder::class);
 
        Model::reguard();
    }
}
