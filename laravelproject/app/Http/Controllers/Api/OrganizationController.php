<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Organization;
class OrganizationController extends Controller
{
    /**
     * Display All Organizations.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $organization = Organization::with('categories')->get();
        return response()->json(compact('organization'),200);
    }

    /**
     * Display All Organizations Paginated.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllPaginate()
    {
        $organization = Organization::paginate();    // default 15 per page
        return response()->json(compact('organization'),200);
    }

    /**
     * Display Top 3 Organiztaions.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTop()
    {
        $organization = Organization::limit(3)->get();
        return response()->json(compact('organization'),200);
    }

    /**
     * Display Specific Organization.
     *
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $organization = Organization::find($id);
        return response()->json(compact('organization'),200);
    }

    /**
     * Display Specific Organization phones.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPhones($id)
    {
        $phones = Organization::find($id)->phones;
        return response()->json(compact('phones'),200);
    }

    /**
     * Display Specific Organization links.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLinks($id)
    {
        $links = Organization::find($id)->links;
        return response()->json(compact('links'),200);
    }

    /**
     * Display Specific Organization album.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAlbum($id)
    {
        $album = Organization::find($id)->album;
        return response()->json(compact('album'),200);
    }

    /**
     * Display Specific Organization events.
     *
     * @return \Illuminate\Http\Response
     */
    public function getEvents($id)
    {
        $events = Organization::find($id)->events;
        return response()->json(compact('events'),200);
    }

    /**
     * Display Specific Organization categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCategories($id)
    {
        $categories = Organization::find($id)->categories;
        return response()->json(compact('categories'),200);
    }

    /**
     * Display Specific Organization user.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUser($id)
    {
        $user = Organization::find($id)->user;
        return response()->json(compact('user'),200);
    } 
}
