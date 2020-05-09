// Name: Rachael Bogdany
// Date: 4/5/2020
// Filename: apiService.js
// ISTE340 Project 2

//handles all the calls to the API
let apiService = function(){
	function xhr(getPost, d, idForSpinner){
		return $.ajax({
			type:getPost,
			dataType:'json',
			data:d,
			cache:false,
			async:true,
			url:'proxy.php',
			beforeSend:function(){
				$(idForSpinner).append('<img src="assets/media/gears.gif" class="spin"/>');
			}
		}).always(function(){
			$(idForSpinner).find('.spin').fadeOut(500,function(){
				$(this).remove();
			});
		}).fail(function(err){
			console.log('there was an AJAX error');
			console.log(err);
		});
	}
	
	function getAboutData(id, filter='') { return xhr('get',{path:'/about/'+filter},id); }
    function getDegreesData(id, filter='') { return xhr('get',{path:'/degrees/'+filter}, id) }
    function getMinorsData(id, filter='') { return xhr('get',{path:'/minors/'+filter},id) }
    function getEmploymentData(id, filter='') { return xhr('get',{path:'/employment/'+filter}, id) }
    function getPeopleData(id, filter='') { return xhr('get',{path:'/people/'+filter}, id) }
    function getResearchData(id, filter='') { return xhr('get',{path:'/research/'+filter}, id) }
    function getResourcesData(id, filter='') { return xhr('get',{path:'/resources/'+filter}, id) }
    function getNewsData(id, filter='') { return xhr('get',{path:'/news/'+filter}, id) }
    function getFooterData(id, filter='') { return xhr('get',{path:'/footer/'+filter}, id) }
    function getCourseData(id, filter='') { return xhr('get',{path:'/course/'+filter}, id) }
	function getMapsData(id, filter='') { return xhr('get',{path:'/map/'+filter}, id) }

    return {
        getAboutData: getAboutData,
        getDegreesData: getDegreesData,
        getMinorsData: getMinorsData,
        getEmploymentData: getEmploymentData,
        getPeopleData: getPeopleData,
        getResearchData: getResearchData,
        getResourcesData: getResourcesData,
        getNewsData: getNewsData,
        getFooterData: getFooterData,
        getCourseData: getCourseData,
		getMapsData: getMapsData,
    };
};