'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp')
.config(function($stateProvider) {

$stateProvider
.state('auth', {
    url: '/auth',
    templateUrl: "templates/auth.html",
    controller: 'AuthCtrl',
    data: {
        permissions: {
          except: ['isloggedin'],
          redirectTo: 'home'
        }
      }
  }
)
.state('home', {
    url: '/home',
    templateUrl: "templates/home.html",
    controller: 'HomeController'
  }
)
.state('events', {
    url: '/events',
    templateUrl: "templates/allevents.html",
    controller: 'EventCtrl'
  }
)
.state('eventdetails', {
    url: '/:id/eventdetails',
    templateUrl: "templates/eventdetails.html",
    controller: 'EventDetailsCtrl'
  }
)
.state('addevent', {
    url: '/addevent',
    templateUrl: "templates/addevent.html",
    controller: 'addEventCtrl',
    data: {
        permissions: {
          only: ['organization'],
          redirectTo: 'home'
        }
      }
  }
)
.state('volunteerprofile', {
    url: '/volunteerprofile/:id',
    templateUrl: "templates/volunteerprofile.html",
    controller: 'VolunteerProfileCtrl'

  }
)
.state('stories', {
    url: '/stories',
    templateUrl: "templates/stories.html",
    controller: 'storiesCtrl'
  }
)
.state('storydetails', {
    url: '/:id/storydetails',
    templateUrl: "templates/storydetails.html",
    controller: 'storydetailsCtrl'
  }
)
.state('select', {
    url: '/select',
    templateUrl: "templates/select.html",
    controller: 'selectCtrl'
})
.state('orgprofile', {
    url: '/orgprofile/:id',
    templateUrl: "templates/orgprofile.html",
    controller: 'orgProfileCtrl'
  }
)
.state('addstory', {
    url: '/addstory',
    templateUrl: "templates/addstory.html",
    controller: 'addStoryCtrl',
    data: {
        permissions: {
          only: ['volunteer'],
          redirectTo: 'home'
        }
      }
  }
)
.state('signup', {
    url: '/signup',
    templateUrl: "templates/signup.html",
    controller: 'signup',
    data: {
        permissions: {
          except: ['isloggedin'],
          redirectTo: 'home'
        }
      }
   
   }
)
.state('editVolunteerProfile', {
      url: '/editMyProfile',
      templateUrl: "templates/editVolProfile.html",
      controller: 'editVolunteerProfile',
      data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'auth'
          }
        }
     
     }
)
.state('editevent', {
      url: '/:id/eventdetails/edit',
      templateUrl: "templates/editevent.html",
      controller: 'editEventCtrl'
     }
)
.state('myEvents', {
      url: '/myevents',
      templateUrl: "templates/myevents.html",
      controller: 'myEventsCtrl',
      data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'events'
          }
        }
    }
)
.state('organizations', {
        url: '/organizations',
        templateUrl: "templates/organizations.html",
        controller: 'OrganizationsCtrl'
      }
)
.state('contactus', {
      url: '/contactus',
      templateUrl: "templates/contactus.html"
      }
)
.state('aboutus', {
      url: '/aboutus',
      templateUrl: "templates/aboutus.html"
      }
)
.state('mystories', {
    url: '/mystories',
    templateUrl: "templates/mystories.html",
    controller: 'mystoriesCtrl',
    data: {
        permissions: {
          only: ['volunteer'],
          redirectTo: 'home'
        }
      }
  }
)
.state('editstory', {
      url: '/:id/story/edit',
      templateUrl: "templates/editstory.html",
      controller: 'editStoryCtrl'
     }
)
.state('reviewvolunteers', {
    url: '/getvolunteers/:id',
    templateUrl: "templates/reviewvolunteer.html",
    controller: 'reviewVolunteersCtrl',
    data: {
        permissions: {
          only: ['organization'],
          redirectTo: 'home'
        }
      }
  }
)
.state('recommendVolunteers',{
   url: '/:id/getrecommendedvolunteers',
   
    templateUrl: "templates/recommendedVolunteers.html",
    controller: 'recommendVolunteer',
     data: {
        permissions: {
          only: ['organization'],
          redirectTo: 'home'
        }
      }
    
  }
)
.state('search', {
    url: '/search/:keyword',
    templateUrl: "templates/search.html",
    controller: 'SearchCtrl'
  }
)
.state('editorgprofile', {
      url: '/editorgprofile',
      templateUrl: "templates/editorgprofile.html",
      controller: 'editOrganizationProfile',
      data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'auth'
          }
        }
     
     }
)
});