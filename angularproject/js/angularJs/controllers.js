'use strict';
angular.module('myApp')
.controller('AuthCtrl',function($auth, $state, $http, $rootScope,$scope) {
 		
		$scope.loginError = false;
        $scope.loginErrorText;
        $scope.login = function(isvalid) {
            if(isvalid)
        {
            var credentials = {
                email: $scope.email,
                password: $scope.password
            }
            
            $auth.login(credentials).then(function successCallback() {
                $http.get('http://localhost/ashrekny/laravelproject/api/authenticate/user').success(function successCallback(response){
                    response.user.isVolunteer=response.isVolunteer;
                    response.user.role_id=response.role_id;
                    var user = JSON.stringify(response.user);
                    localStorage.setItem('user', user);
                    $rootScope.currentUser = response.user;
                    console.log($rootScope.isVolunteer + " " +$rootScope.role_id);
                    $state.go('home');
                })
                .error(function errorCallback(){
                    $scope.loginError = true;
                    $scope.loginErrorText = error.data.error;
                    console.log($scope.loginErrorText);
                })
            },function errorCallback(error){
                    $scope.loginErrorText = error.data.error;
                    console.log($scope.loginErrorText);
                });}
        }
})
.controller('EventCtrl',function($scope,modelFactory){
    $scope.descriptionLimit=100;
    $scope.location=0;
    $scope.first=true;
    $scope.filterscategories=[];
    $scope.filteredevents=[];
    $scope.exist = function(item){
        return $scope.filterscategories.indexOf(item) > -1;
      }
    $scope.toggleSelection = function(item){
        $scope.first=false;
        var varitem=item;
        var idx = $scope.filterscategories.indexOf(varitem);
        if (idx > -1) 
        {
            $scope.filterscategories.splice(idx, 1);
        }
        else 
        {
            $scope.filterscategories.push(varitem);
        }
        if($scope.filterscategories.length==0)
        {
            $scope.first=true;
            $scope.location=0;
            $scope.events=$scope.allevents.slice($scope.location,$scope.location+=4);
            $scope.filteredevents=[];
        }
        else
        {
            $scope.filteredevents=[];
            angular.forEach($scope.allevents, function(event, key){
                angular.forEach(event.categories, function(category, key){
                    angular.forEach($scope.filterscategories, function(filterscategory, key){
                        if(filterscategory==category.name)
                            {
                                $scope.filteredevents.push(event);
                            }
                    });
                });
            });
            $scope.location=0;
            $scope.events=$scope.filteredevents.slice($scope.location,$scope.location+=4);
        
        }
        
      };
    modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/select/selected'
        ).then(function successCallback(data){ 
            $scope.categories=data.categories;
        },function errorCallback(err){
            console.log(err);
    });
    modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/event/getAll'
        ).then(function successCallback(data){
                $scope.allevents = data;
                $scope.events=$scope.allevents.slice($scope.location,$scope.location+=4);
                
            },function errorCallback(err){
                console.log(err);
    });
    $scope.filterCategory = function (categories) {
            var check=false;
            angular.forEach(categories, function(category, key){
                angular.forEach($scope.filterscategories, function(filterscategory, key){
                    if(filterscategory==category.name)
                        {
                            check=true;
                        }
                });
            });
            return check;
    };     

    $scope.next=function()
    {
        if($scope.filteredevents.length>0)
        {
            $scope.events=$scope.filteredevents.slice($scope.location,$scope.location+=4);
        }
        else
        {
            $scope.events=$scope.allevents.slice($scope.location,$scope.location+=4);
        }
    };
    $scope.previous=function()
    {
        $scope.location-=8;
        if($scope.filteredevents.length>0)
        {
            $scope.events=$scope.filteredevents.slice($scope.location,$scope.location+=4);
        }
        else
        {
            $scope.events=$scope.allevents.slice($scope.location,$scope.location+=4);
        }
    };
    
})
.controller('EventDetailsCtrl',function($scope,$rootScope,modelFactory,$stateParams){
        var id = $stateParams.id;
        // $scope.participated=true;
        //ajax to let volunteer participate in an event's task
        $scope.participate=function(task){
            var volunteerid = $rootScope.currentUser.volunteer.id;
            console.log(volunteerid);
            var data = JSON.stringify({volunteer_id : volunteerid , task_id : task.id});
            console.log(data);
            modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/task/participate',data
            ).then(function successCallback(data){
                task.required_volunteers= data.required_volunteers;
                task.going_volunteers = data.going_volunteers;
                $scope.is_participated=data.is_participated;
                },function errorCallback(err){
                    console.log(err);
                 });



        }; 
        //ajax to let volunteer cancel his participation in an event's task
        $scope.cancelparticipate=function(task){
            var volunteerid = $rootScope.currentUser.volunteer.id;
            var data = JSON.stringify({volunteer_id : volunteerid , task_id : task.id});
            console.log(data);
            modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/task/cancelparticipate',data
            ).then(function successCallback(data){
                task.required_volunteers= data.required_volunteers;
                task.going_volunteers = data.going_volunteers;
                // $scope.is_participated=data.is_participated;
                },function errorCallback(err){
                    console.log(err);
                 });

           
        };

        //ajax to post review on an event
        $scope.postreview=function(review,eventID){
            var commentform = review.comment;
            var rateform = review.rate;
            var eventidform = eventID;
            var volunteerid = $rootScope.currentUser.volunteer.id;
            console.log(commentform,eventidform,rateform);
            var postdata = { id : eventidform, volunteer_id : volunteerid , comment : commentform , rate : rateform}
            var data=JSON.stringify(postdata);
            console.log(postdata);
            modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/event/'+id+'/addReview',data
            ).then(function successCallback(data){
                    console.log(data);
                    console.log("success");
            modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/event/'+id+'/getReviews'
            ).then(function successCallback(data){
                            $scope.eventDetails.reviewsvolunteers = data.reviewsvolunteers;
                             $scope.eventDetails.reviewsCount = data.reviewsCount;
                            // $scope.eventDetails.reviews.diffdate=Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                            console.log(data);
                          },function errorCallback(err){
                            console.log(err);
                        });
                },function errorCallback(err){
                    console.log(err);
                    console.log("error");
                 });
            $scope.reviewForm.$setPristine();
            $scope.review={};
            
        }; 
        //ajax request to get event's details      
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/event/'+id+'/get'
            ).then(function successCallback(data){
                            $scope.eventDetails = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
        //ajax request to get the organization that created the event
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/event/'+id+'/getOrganization'
            ).then(function successCallback(data){
                            $scope.eventDetails.organization = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
        //ajax request to get event's tasks
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/task/'+id+'/get'
            ).then(function successCallback(data){
                            $scope.eventDetails.tasks = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
        //ajax request to get event's categories
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/event/'+id+'/getCategories'
            ).then(function successCallback(data){
                            $scope.eventDetails.categories = data;
                            console.log(data);
                          },function errorCallback(err){
                            console.log(err);
                        });
        //ajax to get event's reviews
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/event/'+id+'/getReviews'
            ).then(function successCallback(data){
                            $scope.eventDetails.reviewsvolunteers = data.reviewsvolunteers;
                            $scope.eventDetails.reviewsCount = data.reviewsCount;
                            // $scope.eventDetails.reviews.diffdate=Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                            console.log(data);
                          },function errorCallback(err){
                            console.log(err);
                        });
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/event/'+id+'/getAlbum'
        ).then(function successCallback(data){
                        $scope.albums = data;
                         console.log($scope.albums);
                      },function errorCallback(err){
                        console.log(err);
                    });
})
.controller('addEventCtrl',function($rootScope,$scope,modelFactory,$compile,$state){

    
    $scope.add=function(valid){    
    if(valid){
    var categories = [];
    $('.categories:checked').each(function(i){
         categories[i] = $(this).val();
     });
    if($scope.othercategory){
        categories.push($scope.othercategory);
    }
    console.log(categories);
    
    console.log($scope.newEvent);
    if($scope.uploadedFile){
      $scope.newEvent.logo = $scope.uploadedFile;
    }
    var form = new FormData();
    form.append('title', $scope.newEvent.title);
    form.append('description', $scope.newEvent.description);
    form.append('start_date', $scope.newEvent.start_date);
    if($scope.newEvent.end_date){
        form.append('end_date', $scope.newEvent.end_date);
    }
    form.append('country', $scope.newEvent.country);
    form.append('city', $scope.newEvent.city);
    form.append('region', $scope.newEvent.region);
    form.append('full_address', $scope.newEvent.region);
    if($scope.newEvent.tasks){
        form.append('tasks', JSON.stringify($scope.newEvent.tasks));
    }
    form.append('logo', $scope.newEvent.logo);
    form.append('organization_id', $rootScope.currentUser.role_id);
    if(categories){
        form.append('categories', JSON.stringify(categories));
    }
    // console.log( $scope.newEvent.tasks);
    var tasks = $scope.newEvent.tasks;

    var method = 'post',
        url    = 'http://localhost/ashrekny/laravelproject/api/event/add',
        processData = false,
        transformRequest = angular.identity,
        headers = {'Content-Type': undefined};

    modelFactory.getData(method, url, form, processData, transformRequest, headers).then(
      function(data){
        console.log(data);
        console.log("success");
        $state.go('events');
    },
      function(err){
        console.log("fail");
        console.log(err);
    });
    } 
  }
  
  $scope.no_of_needs = 0;
  
  console.log($rootScope.currentUser);

  console.log($rootScope.currentUser.isVolunteer);
  $scope.add_need=function(){

        $scope.no_of_needs++;
        var need = "<div id='need"+$scope.no_of_needs+"' class='col-md-7 col-md-offset-3'>\
        <div class='col-md-9'>\
        <input ng-model='newEvent.tasks["+$scope.no_of_needs+"].name' name='task' placeholder='الاحتياج' class='wp-form-control wpcf7-text'  type='text'>\
        </div>\
        <div class='col-md-3'>\
        <input ng-model='newEvent.tasks["+$scope.no_of_needs+"].required_volunteers' placeholder='العدد' class='wp-form-control wpcf7-text'  type='number' min='0'>\
        </div></div>"
        ;
        $('#needs').append(need);
        var newneed = (angular.element($('#need'+$scope.no_of_needs)));
        $compile(newneed)($scope);
        console.log($scope.newEvent.tasks);
    }
  $scope.uploadLogo=function(file){
     console.log(file[0]);
     $scope.uploadedFile = file[0];
  }
})
.controller('VolunteerProfileCtrl',function($scope,$rootScope,modelFactory,$stateParams){
    var id = $stateParams.id;
    // get volunteer data
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/volunteer/get/'+id
    ).then(function successCallback(data){
        //console.log(data);
        $scope.volunteer = data.volunteer;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;
    });
    //get user data
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/volunteer/'+id+'/getuser'
    ).then(function successCallback(data){
        //console.log(data);
        $scope.user = data.user;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;
    });
    //get volunteer stories
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/volunteer/'+id+'/getstories')
    .then(function successCallback(data){
        //console.log(data);
        $scope.stories = data.stories;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;    
    });
    // get volunteer events
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/volunteer/'+id+'/getevents')
    .then(function successCallback(data){
        console.log(data);
        $scope.events = data.events;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;    
    });
    // get volunteer categories
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/volunteer/'+id+'/getcategories')
    .then(function successCallback(data){
        //console.log(data);
        $scope.categories = data.category;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;    
    });
})
.controller('orgProfileCtrl',function($scope,modelFactory,$stateParams){
        var id=$stateParams.id;
        $scope.location=0;
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/organization/get/'+id
        ).then(function successCallback(data){
                        $scope.organization = data.organization;
                        console.log($scope.organization);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/organization/'+id+'/getuser'
        ).then(function successCallback(data){
                        $scope.user = data.user;
                        // console.log($scope.user);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/organization/'+id+'/getcategories'
        ).then(function successCallback(data){
                        $scope.categories = data.categories;
                        // console.log($scope.categories);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/organization/'+id+'/getphones'
        ).then(function successCallback(data){
                        // $scope.phones = data.phones;
                        // console.log($scope.phones);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/organization/'+id+'/getevents'
        ).then(function successCallback(data){
                        $scope.fourevents = data.events;
                        console.log($scope.fourevents);
                        $scope.events=$scope.fourevents.slice($scope.location,$scope.location+=4);

                        console.log($scope.events);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/organization/'+id+'/getlinks'
        ).then(function successCallback(data){
                        $scope.links = data.links;
                         // console.log($scope.links);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/organization/'+id+'/getalbum'
        ).then(function successCallback(data){
                        $scope.albums = data.album;
                         // console.log($scope.albums);
                      },function errorCallback(err){
                        console.log(err);
                    });
        $scope.next=function()
        {
            // $scope.location+=4;
            $scope.events=$scope.fourevents.slice($scope.location,$scope.location+=4);
            // console.log($scope.organizations);
            // var newneed = (angular.element($('body')));
            // $compile(newneed)($scope);
        };
        $scope.previous=function()
        {
            $scope.location-=8;
            $scope.events=$scope.fourevents.slice($scope.location,$scope.location+=4);
            // console.log($scope.organizations);
            // var newneed = (angular.element($('body')));
            // $compile(newneed)($scope);
        };
})
.controller('addStoryCtrl',function($rootScope,$scope,modelFactory,$state){
    $scope.add = function(valid){
        if(valid){
            $scope.newStory.volunteer_id = $rootScope.currentUser.role_id;
            var data = $scope.newStory;
            data = JSON.stringify(data);
            console.log(data);
            modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/story/add',
            data
            ).then(function successCallback(data){
                //console.log(data);
             },function errorCallback(err){
               console.log(err);
          });
            $state.go('stories');
        }   
    }
})
.controller('signup', function($scope, modelFactory,$state) {

       
     $scope.addUser = function(isvaild) {
         console.log($scope.user);
         
       
      if (isvaild) {
     var    processData = false,
            transformRequest = angular.identity,
            headers = {'Content-Type': undefined},
        
      formdata= new FormData();
        
        formdata.append("firstName",$scope.user.firstName);
         formdata.append("secondName",$scope.user.secondName);
          formdata.append("gender",$scope.user.gender);
           formdata.append("email",$scope.user.email);
           formdata.append("password",$scope.user.password);
         formdata.append("region",$scope.user.region);
         formdata.append("city",$scope.user.city);
          formdata.append("gender",$scope.user.gender);
          if($scope.profilePic)
         {   formdata.append("profilepic",$scope.profilePic);}
   console.log($scope.user.category);
    if($scope.user.category)
      {
        formdata.append("categories",$scope.user.category);
      } 
      
           
         for (var pair of formdata.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

           modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/user/add',formdata,processData, transformRequest, headers
           ).then(function(data) {
             
             $state.go('auth');
      
            },
            function(err) {

         if (err.volErrors) {
              $scope.volerror = err.volErrors;
              

             }
             if (err.userErrors) {
              $scope.userAsVolErros = err.userErrors;
              console.log($scope.userAsVolErros);
             
             }



            }); }};


        $scope.addOrg = function(isvaild) {
          
            
         
          if (isvaild) {

         var    processData = false,
                transformRequest = angular.identity,
                headers = {'Content-Type': undefined},
            
          formdata= new FormData();
            
            formdata.append("orgName",$scope.org.orgName);
             formdata.append("desc",$scope.org.desc);
              formdata.append("region",$scope.org.region);
               formdata.append("city",$scope.org.city);
               formdata.append("email",$scope.org.email);
               formdata.append("password",$scope.org.password);
              formdata.append("fullAddress",$scope.org.fullAddress);
                    formdata.append("officeHours",$scope.org.officeHours);
          formdata.append("license_number",$scope.org.license_number);
              
           if($scope.logo)
             {   formdata.append("logo",$scope.logo);}
                if($scope.license)
             {   formdata.append("licenseScan",$scope.license);}
console.log($scope.org.category)
             if($scope.org.category)
      {
        formdata.append("categories",$scope.org.category);
      } 
      

               
                for (var pair of formdata.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }




           modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/user/add',formdata,processData, transformRequest, headers
           ).then(function(data) {
            
          $state.go('auth');

            },
            function(err) {    
                if (err.userErrors) {
         
              $scope.orgAsUserErrors = err.userErrors;
              console.log($scope.orgAsUserErrors);
             }


             if (err.orgErrors) {
              $scope.orgErrors = err.orgErrors;
             }


            }
            
            ); }};


        $scope.setProfilePic=function(file)
        { console.log(file[0]);
          $scope.profilePic=file[0];
          console.log( $scope.profilePic);

        }

        $scope.setLogo=function(file)
        { console.log(file[0]);
          $scope.logo=file[0];

        }

        $scope.setLicense=function(file)
        { console.log(file[0]);
          $scope.license=file[0];

        }
})
.controller('storiesCtrl',function($scope,modelFactory){
        $scope.storiesContent = 100;
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/story/getall'
        ).then(function successCallback(data){
                        console.log(data);
                        $scope.stories = data;
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/story/mostrecent'
            ).then(function successCallback(data){
                            $scope.mostrecent = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
})
.controller('mystoriesCtrl',function($rootScope,$scope,modelFactory){
    var id = $rootScope.currentUser.role_id;
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/story/getall/volunteer/'+id
        ).then(function successCallback(data){
                        console.log(data);
                        $scope.volunteerstory = data;
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/story/mostrecent'
            ).then(function successCallback(data){
                            $scope.mostrecent = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
})
.controller('storydetailsCtrl',function($scope,modelFactory,$stateParams){
    var id = $stateParams.id;
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/story/get/'+id
            ).then(function successCallback(data){
                $scope.storyDetails = data;
                },function errorCallback(err){
                    console.log(err);
                });
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/story/mostrecent'
            ).then(function successCallback(data){
                            $scope.mostrecent = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
})
.controller('OrganizationsCtrl',function($scope,modelFactory,$compile){
        $scope.descriptionLimit=100;
        $scope.location=0;
        $scope.first=true;
        $scope.filterscategories=[];
        $scope.filteredorganizations=[];
        $scope.exist = function(item){
            return $scope.filterscategories.indexOf(item) > -1;
          }
        $scope.toggleSelection = function(item){
            $scope.first=false;
            var varitem=item;
            var idx = $scope.filterscategories.indexOf(varitem);
            if (idx > -1) 
            {
                $scope.filterscategories.splice(idx, 1);
            }
            else 
            {
                $scope.filterscategories.push(varitem);
            }
            if($scope.filterscategories.length==0)
            {
                $scope.first=true;
                $scope.location=0;
                $scope.organizations=$scope.allorganizations.slice($scope.location,$scope.location+=4);
                $scope.filteredorganizations=[];
            }
            else
            {
                $scope.filteredorganizations=[];
                angular.forEach($scope.allorganizations, function(organization, key){
                    angular.forEach(organization.categories, function(category, key){
                        angular.forEach($scope.filterscategories, function(filterscategory, key){
                            if(filterscategory==category.name)
                                {
                                    $scope.filteredorganizations.push(organization);
                                }
                        });
                    });
                });
                $scope.location=0;
                $scope.organizations=$scope.filteredorganizations.slice($scope.location,$scope.location+=4);
            
            }
            
          };
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/select/selected'
            ).then(function successCallback(data){ 
                $scope.categories=data.categories;
            },function errorCallback(err){
                console.log(err);
        });
        modelFactory.getData('get',
            'http://localhost/ashrekny/laravelproject/api/organization/getall'
            ).then(function successCallback(data){
                    $scope.allorganizations = data.organization;
                    $scope.organizations=$scope.allorganizations.slice($scope.location,$scope.location+=4);
                },function errorCallback(err){
                    console.log(err);
        });
        $scope.filterCategory = function (categories) {
            var check=false;
            angular.forEach(categories, function(category, key){
                angular.forEach($scope.filterscategories, function(filterscategory, key){
                    if(filterscategory==category.name)
                        {
                            check=true;
                        }
                });
            });
            return check;
        };     

        $scope.next=function()
        {
            if($scope.filteredorganizations.length>0)
            {
                $scope.organizations=$scope.filteredorganizations.slice($scope.location,$scope.location+=4);
            }
            else
            {
                $scope.organizations=$scope.allorganizations.slice($scope.location,$scope.location+=4);
            }
        };
        $scope.previous=function()
        {
            $scope.location-=8;
            if($scope.filteredorganizations.length>0)
            {
                $scope.organizations=$scope.filteredorganizations.slice($scope.location,$scope.location+=4);
            }
            else
            {
                $scope.organizations=$scope.allorganizations.slice($scope.location,$scope.location+=4);
            }
        };
})
.controller('editVolunteerProfile', function($scope, modelFactory,$state,$rootScope) {


    var id = $rootScope.currentUser.id;
    //To DO get volunteer id dynamic
    // var id=34 ;
    console.log(id);
    // get volunteer data
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/user/'+id+'/getdetails'
    ).then(function successCallback(data){
        console.log(data);
        $scope.volunteer = data.volunteer;
        console.log($scope.volunteer);
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;
    });
    //get user data
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/user/get/'+id
    ).then(function successCallback(data){
        
        $scope.user = data.user;
        console.log($scope.user);
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;
    });

    $scope.updateUser = function(isvaild) {
        console.log("hello");
    
        if (isvaild) {
            var processData = false,
            transformRequest = angular.identity,
            headers = {'Content-Type': undefined},
            formdata= new FormData();
            
            formdata.append("firstName",$scope.volunteer.first_name);
            formdata.append("secondName",$scope.volunteer.last_name);
            formdata.append("gender",$scope.volunteer.gender);
            formdata.append("email",$scope.user.email);
             if($scope.user.password){
                formdata.append("password",$scope.user.password);
            }
            formdata.append("region",$scope.user.region);
            formdata.append("city",$scope.user.city);
            formdata.append("phone",$scope.volunteer.phone);
            formdata.append("work",$scope.volunteer.work);
            if($scope.profilePic){   
                formdata.append("profilepic",$scope.profilePic);
            }
            for (var pair of formdata.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/user/update',formdata,processData, transformRequest, headers
            ).then(function(data) {
                $state.go('volunteerprofile',{id:$rootScope.currentUser.role_id});
            },
            function(err) {

            if (err.volErrors) {
              $scope.volerror = err.volErrors;
            }
            if (err.userErrors) {
              $scope.userAsVolErros = err.userErrors;
              console.log($scope.userAsVolErros);
            }
            }); 
        }
    };
    $scope.setProfilePic=function(file){ 
        console.log(file[0]);
        $scope.profilePic=file[0];
        console.log( $scope.profilePic);
    }
})
.controller('editEventCtrl',function($rootScope,$scope,modelFactory,$compile,$state,$stateParams){
    
    var id = $stateParams.id;
    modelFactory.getData('get',
       'http://localhost/ashrekny/laravelproject/api/event/'+id+'/get'
        ).then(function successCallback(data){
            $scope.event = data;
            console.log($scope.event)
        },function errorCallback(err){
            console.log(err);
        });
    modelFactory.getData('get',
   'http://localhost/ashrekny/laravelproject/api/event/'+id+'/gettasks'
    ).then(function successCallback(data){
        $scope.eventTasks = data;
        console.log($scope.eventTasks)
    },function errorCallback(err){
        console.log(err);
    });
    $scope.add=function(valid){    
    if(valid){
    //     $scope.event.start_date=dateFormate($scope.start_date);
        
    //     if($scope.end_date){
    //       $scope.event.end_date=dateFormate($scope.end_date);
    //     }
    if($scope.uploadedFile){
      $scope.event.logo = $scope.uploadedFile;
    }
    var form = new FormData();
    form.append('title', $scope.event.title);
    form.append('description', $scope.event.description);
    form.append('start_date', $scope.event.start_date);
    form.append('end_date', $scope.event.end_date);
    form.append('country', $scope.event.country);
    form.append('city', $scope.event.city);
    form.append('region', $scope.event.region);
    form.append('full_address', $scope.event.region);
    if($scope.event.tasks){
        form.append('tasks', JSON.stringify($scope.event.tasks));
    }
    if($scope.event.logo){
        form.append('logo', $scope.event.logo);
    }
    form.append('organization_id', $rootScope.currentUser.role_id);

    var method = 'post',
        url    = 'http://localhost/ashrekny/laravelproject/api/event/'+id+'/update',
        processData = false,
        transformRequest = angular.identity,
        headers = {'Content-Type': undefined};

    modelFactory.getData(method, url, form, processData, transformRequest, headers).then(
      function(data){
        console.log(data);
        console.log("success");
    },
      function(err){
        console.log("fail");
        console.log(err);
    });
    var data = JSON.stringify($scope.eventTasks);
    modelFactory.getData('post',
    'http://localhost/ashrekny/laravelproject/api/task/edit',
    data
    ).then(function successCallback(data){
        $state.go('events');
    },function errorCallback(err){
        console.log(err);
    }); 
    }
  }
  
  $scope.no_of_needs = 0;
  
  $scope.add_need=function(){
        console.log($scope.eventTasks);
        
        var need = "<div id='need"+$scope.no_of_needs+"' class='col-md-7 col-md-offset-3'>\
        <div class='newtask"+$scope.no_of_needs+"'><div class='col-md-7'>\
        <input ng-model='event.tasks["+$scope.no_of_needs+"].name' name='task' placeholder='الاحتياج' class='wp-form-control wpcf7-text'  type='text'>\
        </div>\
        <div class='col-md-3'>\
        <input ng-model='event.tasks["+$scope.no_of_needs+"].required_volunteers' placeholder='العدد' class='wp-form-control wpcf7-text'  type='number' min='0'>\
         </div>\
        <div class='col-md-2'>\
          <button class='btn wpcf7-delete' type='button' ng-click='delete_newtask("+$scope.no_of_needs+")'>\
          <span class='glyphicon glyphicon-remove'></span></button>\
        </div></div></div>"
        ;
        $('#needs').append(need);
        var newneed = (angular.element($('#need'+$scope.no_of_needs)));
        $compile(newneed)($scope);
        // console.log($scope.newEvent.tasks);
         $scope.no_of_needs++;
    }
  $scope.uploadLogo=function(file){
     console.log(file[0]);
     $scope.uploadedFile = file[0];
  }
  $scope.delete_task=function(id){
    console.log(id);
    $('.task-'+id).remove();
    modelFactory.getData('post',
    'http://localhost/ashrekny/laravelproject/api/task/'+id+'/delete'
    ).then(function successCallback(data){
        },function errorCallback(err){
            console.log(err);
         });
  }
  $scope.delete_newtask=function(id){
    $('.newtask'+id).remove();
  }
})
.controller('myEventsCtrl',function($scope,$rootScope,modelFactory){
        var id = $rootScope.currentUser.id;
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/event/get/user/'+id
        ).then(function successCallback(data){
                        console.log(data);
                        $scope.myevents = data.myevents;
                      },function errorCallback(err){
                        console.log(err);
                    });
})
.controller('HomeController',function($scope,$rootScope,modelFactory){
    //console.log("kimo");
    // ajax to get all events 
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/event/getAll')
    .then(function successCallback(data){
        //console.log(data);
        $scope.allevents = data;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;    
    });
    // ajax to get top 3 events
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/event/gettop')
    .then(function successCallback(data){
        // console.log(data);
        $scope.topEvents = data;
        // console.log($scope.events);
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;    
    });
    // ajax to get the top 3 organization
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/organization/gettop')
    .then(function successCallback(data){
        // console.log(data);
        $scope.topOrgs = data.organization;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;    
    });
    // ajax to get most recent 3 stories
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/story/mostrecent')
    .then(function successCallback(data){
        //console.log(data);
        $scope.mostRecentStories = data;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;    
    });
    if($scope.currentUser){

        var id = $scope.currentUser.id;
        //get user data
        modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/user/'+id+'/getdetails'
        ).then(function successCallback(data){
            if(data.volunteer){
                $rootScope.name = data.volunteer.first_name;
            } else{
                $scope.name = data.organization.name;
            }
            console.log(data.volunteer);
        },function errorCallback(err){
            console.log(err);
            $scope.dataerr = err;
        });
    }
})
.controller('selectCtrl', function($scope,modelFactory) {
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/select/selected')
        .then(function successCallback(data){
                console.log(data);
                $scope.cat = data.categories;
                 },function errorCallback(err){
                        console.log(err);
              });
    $scope.selected = [];
    $scope.exist = function(item){
        return $scope.selected.indexOf(item) > -1;
      }

    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item);
        if (idx > -1) {
            $scope.selected.splice(idx, 1);
        }else {
            $scope.selected.push(item);
        }
        $scope.$broadcast('filters',$scope.selected);
      };

    $scope.checkAll = function(){
        if ($scope.selectAll) {
            angular.forEach($scope.users, function(item){
                idx = $scope.selected.indexOf(item);
                if (idx >= 0) {
                    return true;
                }else {
                    $scope.selected.push(item);
                    $scope.$broadcast('filters',$scope.selected);
            
                }
            })
        }else {
            $scope.selected = [];
            $scope.$broadcast('filters',$scope.selected);
        }
        
            
     };
                        
})
.controller('editStoryCtrl',function($scope,modelFactory,$state,$stateParams){
    
    var id = $stateParams.id;
    //ajax request to get story datails 
    modelFactory.getData('get',
       'http://localhost/ashrekny/laravelproject/api/story/get/'+id
        ).then(function successCallback(data){
            $scope.story = data;
            console.log($scope.story)
        },function errorCallback(err){
            console.log(err);
        });
    
    //function that send ajax with the new values
    $scope.edit=function(valid){    
    if(valid){
    var data = JSON.stringify($scope.story);
    modelFactory.getData('post',
    'http://localhost/ashrekny/laravelproject/api/story/'+id+'/update',
    data
    ).then(function successCallback(data){
        $state.go('stories');
    },function errorCallback(err){
        console.log(err);
    }); 
    }
  }
})
.controller('reviewVolunteersCtrl',function($scope,$rootScope,modelFactory,$stateParams){
        var id = $stateParams.id;

        $scope.reviewvolunteer=[];
        //get volunteers that participated in certain event
        modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/event/getvolunteers/'+id
        ).then(function successCallback(data){
                        console.log(data);
                        $scope.eventid=data.eventid;
                        $scope.eventname=data.eventname;
                        $scope.volunteers = data.volunteers;
                        console.log($scope.volunteers);
                      },function errorCallback(err){
                        console.log(err);
                    });
        //function to rate each volunteer in the event
        $scope.reviewvolunteers = function(eventid,volunteerid,index){
            console.log($scope.reviewvolunteer[index]);
            var volunteerid= volunteerid;
            var eventid=eventid;
            var organizarionid = $rootScope.currentUser.organization.id;
            var comment = $scope.reviewvolunteer[index].comment;
            var rate = $scope.reviewvolunteer[index].rate;
            var attend = $scope.reviewvolunteer[index].attend;
            var postdata = { id : eventid, volunteerid : volunteerid ,organizationid:organizarionid, comment : comment, rate : rate, attend : attend}
            var data=JSON.stringify(postdata);
            modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/event/reviewvolunteers/'+id,data
            ).then(function successCallback(data){
                            console.log(data);
                            // $scope.volunteers = data;
                            // console.log($scope.volunteers);
                          },function errorCallback(err){
                            console.log(err);
                        });
        };
})
.controller('recommendVolunteer',function($scope,modelFactory,$stateParams,$state){
      var id = $stateParams.id;
          modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/event/'+id+'/getrecommendedvolunteers'
       
        ).then(function successCallback(data){
                        $scope.recommendedVolnteers= data;
                        console.log($scope.recommendedVolnteers);
                      },function errorCallback(err){
                        console.log(err);
                    });

     $scope.skip= function() {
   $state.go('eventdetails',{"id":id});
}

 

$scope.invite=function()
{
 
var invitedvol= $scope.invitedVolunteers=[];
 angular.forEach($scope.recommendedVolnteers, function(volunteer){
    if (volunteer.selected){$scope.invitedVolunteers.push(volunteer.id);}
  })
  console.log($scope.invitedVolunteers);
  var postdata = { id : id, invitedVolunteers:invitedvol}
       var data=JSON.stringify(postdata);
  console.log(data);
   
  modelFactory.getData('post',
         'http://localhost/ashrekny/laravelproject/api/event/inviteVolunteers',data
       
        ).then(function successCallback(data){
                       
                         console.log(data);
                         $state.reload();
                  },function errorCallback(err){
                         console.log(err);
                     });



}




})
.controller('SearchCtrl',function($scope,modelFactory,$stateParams,$rootScope){
     var searchdata={data:$stateParams.keyword};
    $scope.first=true;
    $scope.filterscategories=[];
    $scope.exist = function(item){
        return $scope.filterscategories.indexOf(item) > -1;
      }

    $scope.toggleSelection = function(item){
        $scope.first=false;
        var varitem=item;
        var idx = $scope.filterscategories.indexOf(varitem);
        if (idx > -1) {
            $scope.filterscategories.splice(idx, 1);
        }else {

            $scope.filterscategories.push(varitem);
        }
        if($scope.filterscategories.length==0)
        {
            $scope.first=true;
        }
      };
    var data = JSON.stringify(searchdata);
    modelFactory.getData('get',
        'http://localhost/ashrekny/laravelproject/api/select/selected'
        ).then(function successCallback(data){ 
            $scope.categories=data.categories;
        },function errorCallback(err){
            console.log(err);
    });
        modelFactory.getData('post',
        'http://localhost/ashrekny/laravelproject/api/search',data
        ).then(function successCallback(data){
                        $scope.events_results = data.events;
                        // console.log('events_results');
                        // console.log($scope.events_results);
                        $scope.organizations_results = data.organizations;
                        // console.log('organizations_results');
                        // console.log($scope.organizations_results);
                        $scope.stories_results = data.stories;
                        // console.log('stories_results');
                        // console.log($scope.stories_results);
                      },function errorCallback(err){
                        console.log(err);
                    });
        $scope.filterCategory = function (categories) {
            // return true;
            // console.log("kam");
            var check=false;
            angular.forEach(categories, function(category, key){
                angular.forEach($scope.filterscategories, function(filterscategory, key){
                    // console.log("lobna");
            
                  if(filterscategory==category.name)
                    {
                        // console.log("matched");
                        // console.log(category.name);
                        //console.log(filterscategory);
                        check=true;
                    }
                });
            });
            return check;
        };
        
})
.controller('editOrganizationProfile', function($scope, modelFactory,$state,$rootScope) {

 var id = $rootScope.currentUser.id;
    //To DO get organization id dynamic
    console.log(id);
    
    //get user data
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/user/'+id+'/getdetails'
    ).then(function successCallback(data){
        $scope.org = data.organization;
        console.log($scope.org);
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;
    });
    //get user data
    modelFactory.getData('get','http://localhost/ashrekny/laravelproject/api/user/get/'+id
    ).then(function successCallback(data){
        console.log(data);
        $scope.user = data.user;
    },function errorCallback(err){
        console.log(err);
        $scope.dataerr = err;
    });

    $scope.updateUser = function(isvaild) {
        // console.log("hello");
        if (isvaild) {
            var processData = false,
                transformRequest = angular.identity,
                headers = {'Content-Type': undefined},
            
            formdata= new FormData();
            
            formdata.append("name",$scope.org.name);
            formdata.append("email",$scope.user.email);
            formdata.append("description",$scope.org.description);
            formdata.append("country",$scope.user.country);
            formdata.append("region",$scope.user.region);
            formdata.append("city",$scope.user.city);
            formdata.append("full_address",$scope.org.full_address);
            formdata.append("openning_hours",$scope.org.openning_hours);
            if($scope.user.password){
                formdata.append("password",$scope.user.password);
            }
             
        
            if($scope.logo){
                formdata.append("logo",$scope.logo);
            }
            for (var pair of formdata.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            modelFactory.getData('post',
            'http://localhost/ashrekny/laravelproject/api/user/update',formdata,processData, transformRequest, headers
           ).then(function(data) {
            console.log(data);
            $state.go('orgprofile',{id:$rootScope.currentUser.role_id});
            },
            function(err) {

                if (err.orgErrors) {
                  $scope.orgerror = err.orgErrors;
                 }
                if (err.userErrors) {
                  $scope.userAsOrgErros = err.userErrors;
                  console.log($scope.userAsOrgErros);
                }
            }); 
    }
};
    $scope.setLogo=function(file)
        { console.log(file[0]);
          $scope.logo=file[0];

        }

         
})
.controller('IndexCtrl',function($scope,$rootScope,modelFactory,$state){
    // console.log($scope.keyword);
    $rootScope.filterDetailsLimit = 40;
    
    $scope.search=function()
    {
        if($scope.keyword!=""&&$scope.keyword!=undefined)
        $state.go('search',{keyword:$scope.keyword});
    }
})