// Name: Rachael Bogdany
// Date: 4/5/2020
// Filename: index.js
// ISTE340 Project 2

function getAttributesByName(arr, name, val){
	var result = null;
	$.each(arr, function(){
		if(this[name] === val){
			result = this;
		}
	});
	return result;
}

function resourceDetails(key, obj){
	//Creates the html for the clicked resource
	//returns the created html
	//
	// key is which resource was selected
	// obj is the data returned from the API
	var html = $('<div></div>');
	switch(key){
		case "studyAbroad":
			var title = $('<h2></h2>').text(obj.studyAbroad.title);
			var desc = $('<p></p>').text(obj.studyAbroad.description);
			var sec = $('<div></div>');
			$.each(obj.studyAbroad.places, function(i,item){
				sec2 = $('<div></div>');
				sec2.append($('<h4></h4>').text(item.nameOfPlace)).append($('<p></p>').text(item.description));
				sec.append(sec2);
			});
			html.append(title);
			html.append(desc);
			html.append(sec);
			break;
		case "studentServices":
			var title = $('<h3></h3>').text(obj.studentServices.title);
			var advisors = obj.studentServices.academicAdvisors;
			var sec = $('<div></div>').append($('<h4></h4>').text(advisors.title)).append($('<p></p>').text(advisors.description))
			sec.append($('<a></a>').text(advisors.faq.title).attr('href',advisors.faq.contentHref))
			var profAds = obj.studentServices.professonalAdvisors;
			var sec2 = $('<div></div>').append($('<h2></h2>').text(profAds.title));
			$.each(profAds.advisorInformation, function(i,item){
				sec2.append($('<div></div>').append($('<h3></h3>').text(item.name)).append($('<h4></h4>').text(item.department)).append($('<p></p>').text(item.email)));;
			});
			var facAds = $('<div></div>').append($('<h3></h3>').text(obj.studentServices.facultyAdvisors.title)).append($('<p></p>').text(obj.studentServices.facultyAdvisors.description));
			var minor = obj.studentServices.istMinorAdvising;
			var sec3 = $('<div></div>').append($('<h2></h2>').text(minor.title));
			$.each(minor.minorAdvisorInformation, function(i,item){
				sec3.append($('<div></div>').append($('<h3></h3>').text(item.title)).append($('<h4></h4>').text(item.advisor)).append($('<p></p>').text(item.email)));;
			});
			html.append(title);
			html.append(sec);
			html.append(sec2);
			html.append(facAds);
			html.append(sec3);
			break;
		case "tutorsAndLabInformation":
			html.append($('<h2></h2>').text(obj.tutorsAndLabInformation.title)).append($('<p></p>').text(obj.tutorsAndLabInformation.description));
			html.append($('<a></a>').text(obj.tutorsAndLabInformation.tutoringLabHoursLink).attr('href', obj.tutorsAndLabInformation.tutoringLabHoursLink));
			break;	
		case "studentAmbassadors":
			var title = $('<h2></h2>').text(obj.studentAmbassadors.title);
			var img = $('<img/>').attr('src', obj.studentAmbassadors.ambassadorsImageSource);
			var sec = $('<div></div>');
			$.each(obj.studentAmbassadors.subSectionContent, function(i, item){
				sec.append($('<div></div>').append($('<h4></h4>').text(item.title)).append($('<p></p>').text(item.description)));
			});
			html.append(title);
			html.append(img);
			html.append(sec);
			html.append($('<h3></h3>').text('Apply Here:')).append($('<a></a>').text(obj.studentAmbassadors.applicationFormLink).attr('href',obj.studentAmbassadors.applicationFormLink));
			html.append($('<p></p>').text(obj.studentAmbassadors.note));
			break;
		case "forms":
			html.append($('<h2></h2>').text('Graduate Forms'));
			$.each(obj.forms.graduateForms, function(i,item){
				var gradForms = $('<div></div>')
				gradForms.append($('<a></a>').text(item.formName).attr('href', item.href));
				html.append(gradForms);
			});
			html.append($('<h2></h2>').text('Undergraduate Forms'));
			$.each(obj.forms.undergraduateForms, function(i,item){
				var underForms = $('<div></div>')
				underForms.append($('<a></a>').text(item.formName).attr('href', item.href));
				html.append(underForms);
			});
			break;
		case "coopEnrollment":
			var title = $('<h2></h2>').text(obj.coopEnrollment.title);
			var sec = $('<div></div>');
			$.each(obj.coopEnrollment.enrollmentInformationContent, function(i, item){
				sec.append($('<div></div>').append($('<h4></h4>').text(item.title)).append($('<p></p>').text(item.description)));
			});
			html.append(title);
			html.append(sec);
			html.append($('<a></a>').text(obj.coopEnrollment.RITJobZoneGuidelink).attr('href',obj.coopEnrollment.RITJobZoneGuidelink));
			break;
		default:
			html.append($('<div></div>').text('Error has occured'));
	}
	return html;
}

//when the document is ready load the info
$(document).ready(function(){
	var browser = $.browserDetection(true);
    switch(browser){
        case "IE7":
            alert("Current browser is outdated, please update browser!");
            window.location = "http://outdatedbrowser.com/en";
            break;
    }
	
	//Initializes the scrolling
	$("#nav-menu a").click(function(e){
	    e.preventDefault();
	    var to = $(this).attr("href");
	    $.mPageScroll2id("scrollTo",to);
	});
	
	//Initializes the Intro Section
	$('#intro').append($('<div></div>').attr('id', 'title').attr('class', 'intro').append($('<div></div>').attr('id', 'heading').append($('<h1></h1>').text('INFORMATION SCIENCES & TECHNOLOGIES @ RIT'))));
	
	//Initializes the About Section
	apiService().getAboutData('#about').done(function(json){
		var outer = $('<div></div>').attr('class', 'about')
		var inner = $('<div></div>').attr('id', 'aboutContent');
		inner.append($('<h1></h1>').text(json.title).attr('id', 'aboutTitle'));
		inner.append($('<p></p>').text(json.description).attr('id','description'));
		var quote = $('<div></div>').attr('id', 'quoteContent');
		quote.append($('<h2></h2>').text(json.quote));
		quote.append($('<h4></h4>').text(json.quoteAuthor));
		$('#about').append(outer.append(inner.append(quote)));
	});
	
	//Initializes the Degrees Section
	apiService().getDegreesData('#undergraduate').done(function(json){
		//Gets Undergraduate Data
		var sec = $('<div></div>').attr('class', 'undergraduate').append($('<h1></h1>').text('Our Undergraduate Degrees'));
		var degrees = $('<div></div>').attr('class', 'degrees');
		$.each(json.undergraduate, function(i, item){
			var outer = $('<div></div>').attr('class', 'hip-item');
			var title = $('<div></div>').attr('class', 'title');
			title.append($('<h2></h2>').text(this.title)).append($('<p></p>').text(item.description)).append($('<p></p>').text('Click to find out more')).append($('<i></i>').attr('class', 'fas fa-plus-circle'));
			var content = $('<div></div').attr('class', 'content');
			content.append($('<div></div').html('&times;')).append($('<h2></h2>').text(this.title)).append($('<p></p>').text(item.description)).append($('<h4></h4>').text('Concentrations'));
			$.each(item.concentrations, function(i, item){
				content.append($('<p></p>').text(item));
			});
			content.append($('<p></p>').text('To learn more about this degree, visit our website')).append($('<a></a>').attr('href', 'http://'+item.degreeName+'.rit.edu').text('http://'+item.degreeName+'.rit.edu'));
			degrees.append(outer.append(title).append(content));
		});
		$('#undergraduate').append(sec.append(degrees));
		//Gets Graduate Data
		var sec = $('<div></div>').attr('class', 'graduate').append($('<h1></h1>').text('Our Graduate Degrees'));
		var degrees = $('<div></div>').attr('class', 'degrees');
		var certs = $('<div></div>').attr('class', 'advancedCertificates');
		$.each(json.graduate, function(i, item){
			var outer = $('<div></div>').attr('class', 'hip-item');
			var title = $('<div></div>').attr('class', 'title');
			title.append($('<h2></h2>').text(this.title)).append($('<p></p>').text(item.description)).append($('<p></p>').text('Click to find out more')).append($('<i></i>').attr('class', 'fas fa-plus-circle'));
			var content = $('<div></div').attr('class', 'content');
			content.append($('<div></div').html('&times')).append($('<h2></h2>').text(this.title)).append($('<p></p>').text(item.description)).append($('<h4></h4>').text('Concentrations'));
			if(this.degreeName == "graduate advanced certificates"){
				$.each(item.availableCertificates, function(i, item){
					if(i == 1){
						certs.append($('<i></i>').attr('class', 'fas fa-network-wired fa-3x').attr('style', 'color: #68C3A3;'));
					}
					else{
						certs.append($('<i></i>').attr('class', 'fas fa-globe fa-3x').attr('style', 'color: #3498DB;'));
					}
					certs.append($('<p></p>').text(item));
				});
			}
			else{
				$.each(item.concentrations, function(i, item){
					content.append($('<p></p>').text(item));
				});
				content.append($('<p></p>').text('To learn more about this degree, visit our website')).append($('<a></a>').attr('href', 'http://'+item.degreeName+'.rit.edu').text('http://'+item.degreeName+'.rit.edu'));
				degrees.append(outer.append(title).append(content));
			}
		});
		$('#graduate').append(sec.append(degrees).append($('<h3></h3>').text('Our Graduate Advanced Certificates')).append(certs));
		$('.degrees').hip({itemsPerRow: 3, itemGaps: '30px'});
		//Binds onclick events to the degree divs
		$('.degrees div .title').on('click', function(){
			$(this).css('display','none');
			$(this).parent().find('.content').slideDown();
		});
		$('.content div').on('click', function(){
			$(this).parent().parent().find('.title').css('display','block').css('border-width','0px');
			$(this).parent().css('display','none');
		});
	});
	
	//Initializes the Minors Section
	apiService().getMinorsData().done(function(json){
		var minor = $('<div></div>').attr('class', 'minors').append($('<h1></h1>').text('Our Undergraduate Minors'));
		var minorContainer = $('<div></div>').attr('id', 'minors-container');
		$.each(json.UgMinors, function(i, item){
			minorContainer.append($('<div></div').attr('id', item.name).text(item.title));
		});
		$('#minors').append(minor.append(minorContainer));
		$('#minors-container').hip({itemsPerRow: 4, itemGaps: '10px'});
		//Binds onclick to the minors divs to open more information
		$('#minors-container div').on('click', function() {
			apiService().getMinorsData('#minors-container','UgMinors/name='+this.id).done(function(json){
				var desc = json.description.split('Faculty')[0];
				var advisors = json.description.split('Faculty')[1].split('.');
				var html = '<div class="minor"><h2>' + json.title + '</h2><p>' + desc + '</p>';
				$.each(advisors, function(i, item){
					html += '<p>' + item + '</p>';
				});
				$.each(json.courses, function(i, item){
					html += '<div class="courses" id="'+item+'">' + item + '</div>';
				});
				html += '<p>' + json.note + '</p></div>'
				$.fancybox.open(html);
				$('.courses').on('click',function(){
					apiService().getCourseData('', 'courseID='+this.id).done(function(json){
						$.fancybox.open('<div><h2>'+ json.courseID +': '+ json.title +'</h2><p>'+ json.description +'</p></div>');
					});
				});
			});
		});
	});
	
	//Initializes the Employment Section
	apiService().getEmploymentData().done(function(json){
		//Adds the employment information and degree statistics
		var outer = $('<div></div>').attr('class', 'employment').append($('<h1></h1>').text('Employment'));
		var intro = $('<div></div>').attr('id', 'introduction').append($('<h2></h2>').text(json.introduction.title));
		$.each(json.introduction.content, function(i, item){
			intro.append($('<div></div>').append($('<h3></h3>').text(item.title)).append($('<p></p>').text(item.description)));
			if(item.title == "Employment"){
				var stats = $('<div></div>').attr('id', 'degreeStatistics');
				$.each(json.degreeStatistics.statistics, function(i, item){
					stats.append($('<div></div>').append($('<h2></h2>').text(item.value)).append($('<p></p>').text(item.description)));
				});
				intro.append(stats)
			}
		});
		//Adds all the coop and professional employers
		var employer = $('<div></div>').attr('id', 'employers').append($('<h3></h3>').text(json.employers.title)).append($('<hr>'));
		$.each(json.employers.employerNames, function(i, item){
			employer.append($('<span></span>').text(item));
		});
		var careers = $('<div></div>').attr('id', 'careers').append($('<h3></h3>').text(json.careers.title)).append($('<hr>'));
		$.each(json.careers.careerNames, function(i, item){
			careers.append($('<span></span').text(item));
		});
		outer.append(intro);
		outer.append(employer);
		outer.append(careers);
		//Adds the Maps Iframe
		$('#employment').append($('<div></div').attr('id', 'hr')).append(outer).append($('<div></div>').attr('class', 'hr'));
		var work = $('<div></div>').attr('class', 'work').append($('<h1></h1>').text('Where Our Students Work')).append($('<h2></h2>').text('Click a marker to learn more about the jobs at that location'));
		work.append($('<iframe></iframe>').attr('id', 'map-iframe').attr('src', 'http://ist.rit.edu/api/map/').append($('<p></p>').text('Your browser does not show the employment map. You are using an old browser. Update your browser.')));
		work.append($('<div></div>').attr('id', 'coopTable').append($('<h4></h4>').text('Co-op Table')).append($('<i></i>').attr('class', 'fas fa-plus'))).append($('<div></div>').attr('id', 'employmentTable').append($('<h4></h4>').text('Professional Employment Table')).append($('<i></i>').attr('class', 'fas fa-plus')));
		$('#employment').append(work);
		$('#degreeStatistics').hip({itemsPerRow: 4, itemGaps: '10px'});
		//Allows cooptable and employment table to expand with the lists
		$("#coopTable").on('click', function() {
			apiService().getEmploymentData('', 'coopTable').done(function(json){
				$.fancybox.open('<table id="coopTbl" class="display"><thead><tr><th>Employer</th><th>Degree</th><th>City</th></tr></thead><tfoot><tr><th>Employer</th><th>Degree</th><th>City</th></tr></tfoot></table>');
				$('#coopTbl').DataTable( { 
					"pageLength" : 25,
					data: json.coopTable.coopInformation,
					"columns": [
						{ "data" : "employer" },
						{ "data" : "degree" },
						{ "data" : "city" }
					],
					"aaSorting": []
				});
			});
		});
		$("#employmentTable").on('click', function() {
			apiService().getEmploymentData('', 'employmentTable').done(function(json){
				$.fancybox.open('<table id="employTbl" class="display"><thead><tr><th>Employer</th><th>Degree</th><th>City</th></tr></thead><tfoot><tr><th>Employer</th><th>Degree</th><th>City</th></tr></tfoot></table>');
				$('#employTbl')
				$('#employTbl').DataTable( { 
					"pageLength" : 25,
					data: json.employmentTable.professionalEmploymentInformation,
					"columns": [
						{ "data" : "employer" },
						{ "data" : "degree" },
						{ "data" : "city" },
					],
					"aaSorting": []
				});
			});
		});
	});
	
	//Initializes People Section
	apiService().getPeopleData().done(function(json){
		var people = $('<div></div>').attr('class', 'people');
		people.append($('<div></div>').attr('id', 'peopleTitle').append($('<h1></h1>').text(json.title)));
		people.append($('<div></div>').attr('id', 'peopleSubTitle').append($('<h3></h3>').text(json.subTitle)));
		people.append($('<h2></h2>').append($('<span></span>').attr('id', 'facbut').attr('class', 'active1').text('Faculty')).append($('<span></span>').attr('id', 'staffbut').text('Staff')));
		var fac = $('<div></div>').attr('id', 'faculty');
		$.each(json.faculty, function(i, item){
			fac.append($('<div></div>').attr('id', item.username).attr('class', 'prof').append($('<p></p>').text(item.name)).append($('<p></p>').text(item.title)));
		});
		var staff = $('<div></div>').attr('id', 'staff');
		$.each(json.staff, function(i, item){
			staff.append($('<div></div>').attr('id', item.username).attr('class', 'staff').append($('<p></p>').text(item.name)).append($('<p></p>').text(item.title)));
		});
		people.append(fac).append(staff);
		$('#people').append($('<div></div>').attr('class', 'hr')).append(people);
		$('#staff').hip({itemsPerRow: 4, itemGaps: '10px'});
		$('#staff').css('display', 'none');
		$('#faculty').hip({itemsPerRow: 4, itemGaps: '10px'});
		$('.prof').on('click', function(){
			apiService().getPeopleData('', 'faculty/username='+ this.id).done(function(json){
				var html ='<div style="text-align: center"><h2>'+json.name+', <span style="font-size: 20px; color: #F36E21;">'+json.title+'</span><h2><img src="'+json.imagePath+'"/>';
				html += '<p style="font-size: 15px;">' + (json.office != ''&&json.office != 'null'? json.office : '') + '</p><p style="font-size: 15px;">' + (json.phone != ''&&json.phone != 'null'? json.phone : '') + '</p><p style="font-size: 15px;">' + (json.email != ''&&json.email != 'null'? json.email : '') +'</p></div>';
				$.fancybox.open(html);
			});
		});
		$('.staff').on('click', function(){
			apiService().getPeopleData('', 'staff/username='+ this.id).done(function(json){
				var html ='<div style="text-align: center"><h2>'+json.name+', <span style="font-size: 20px; color: #F36E21;">'+json.title+'</span><h2><img src="'+json.imagePath+'"/>';
				html += '<p style="font-size: 15px;">' + (json.office != ''&&json.office != 'null'? json.office : '') + '</p><p style="font-size: 15px;">' + (json.phone != ''&&json.phone != 'null'? json.phone : '') + '</p><p style="font-size: 15px;">' + (json.email != ''&&json.email != 'null'? json.email : '') +'</p></div>';
				$.fancybox.open(html);
			});
		});
		$('#facbut').on('click', function(){
			$('#faculty').css('display', '');
			$('#staff').css('display', 'none');
			$('.people').css('height', '');
			$('#faculty').css('display', '');
			$('#facbut').addClass('active1');
			$('#staffbut').removeClass('active1');
		});
		$('#staffbut').on('click', function(){
			$('#staff').css('display', '');
			$('#faculty').css('display', 'none');
			$('#facbut').removeClass('active1');
			$('#staffbut').addClass('active1');
		});
	
	});
	
	//Initializes Research Section
	apiService().getResearchData().done(function(json){
		var byArea = $('<div></div>').attr('class', 'researchByArea');
		byArea.append($('<h1></h1>').text('Faculty Research: Areas of Interest'));
		byArea.append($('<h4></h4>').text('Click the area you’re interested in to explore our faculty publications.'));
		var areas = $('<div></div>').attr('id', 'researchAreas');
		$.each(json.byInterestArea, function(i, item){
			areas.append($('<div></div>').attr('id', item.areaName).text(item.areaName));
		});
		$('#researchByArea').append(byArea.append(areas));
		var byFac = $('<div></div>').attr('class', 'researchByFaculty');
		byFac.append($('<h1></h1>').text('Faculty Research: Lookup by Faculty'));
		byFac.append($('<h4></h4>').text('Click the faculty member to explore their recent publications.'));
		var fac = $('<div></div>').attr('id', 'researchFacultyWork');
		$.each(json.byFaculty, function(i, item){
			fac.append($('<div></div>').attr('id', item.facultyName).text(item.facultyName));
		});
		$('#researchByFaculty').append(byFac.append(fac));
		$('#researchAreas').hip({itemsPerRow: 6, itemGaps: '10px'});
		$('#researchAreas div').on('click', function(){
			var iD = this.id;
			var color = $(this).css("border-color");
			apiService().getResearchData().done(function(json){
				var html = $('<div></div')
				$.each(json.byInterestArea, function(i, item){
					if(item.areaName == iD){
						html.append($('<h2 style="color: '+color+'"></h2').text('Research By Domain Area: '+item.areaName));
						var list = $('<ul></ul>');
						$.each(item.citations, function(inc, citation){
							list.append($('<li></li>').text(citation));
						});
						html.append(list);
					}
				});
				$.fancybox.open(html);
			});
		});
		$('#researchFacultyWork').hip({itemsPerRow: 5, itemGaps: '10px'});
		$('#researchFacultyWork div').on('click', function(){
			var iD = this.id;
			apiService().getResearchData().done(function(json){
				var html = $('<div></div')
				$.each(json.byFaculty, function(i, item){
					if(item.facultyName == iD){
						html.append($('<h2></h2').text(item.facultyName).css('color', '#DB0A5B'));
						var list = $('<ul></ul>')
						$.each(item.citations, function(inc, citation){
							list.append($('<li></li>').text(citation));
						});
						html.append(list);
					}
				});
				$.fancybox.open(html);
			});
		});
	});
	
	//Initializes Resources Section
	apiService().getResourcesData().done(function(json){
		var resources = $('<div></div>').attr('class', 'resources').append($('<div></div>').attr('class', 'hr'));
		resources.append($('<div></div>').attr('id', 'resourcesTitle').append($('<h1></h1>').text(json.title)));
		resources.append($('<div></div>').attr('id', 'resourcesSubTitle').append($('<h3></h3>').text(json.subTitle)));
		var blocks = $('<div></div>').attr('id', 'blocks');
		$.each(json, function(i, item){
			if(i != 'title' && i != 'subTitle'){
				if(i == 'forms'){
					blocks.append($('<div></div>').attr('id', 'forms').text('Forms'));
				}
				else{
					blocks.append($('<div></div>').attr('id', i).text(item.title));
				}
			}
		});
		$('#resources').append(resources.append(blocks));
		$('#blocks').hip({itemsPerRow: 3, itemGaps: '00px'});
		$('#blocks div').on('click', function(){
			var iD = this.id;
			apiService().getResourcesData('', iD).done(function(json){
				$.fancybox.open(resourceDetails(iD, json));
			});
		});
	});
	
	//Initializes Footer Data
	apiService().getFooterData().done(function(json){
		var foot = $('<div></div>').attr('class', 'foot');
		var x = 1;
		var social = $('<div></div>').attr('id', 'social');
		$.each(json.social, function(i, item){
			if(i == "twitter"){
				social.append($('<a></a>').attr('href', item).append($('<img />').attr('src', 'assets/media/twitter.jpg')));
			}
			else if(i == "facebook"){
				social.append($('<a></a>').attr('href', item).append($('<img />').attr('src', 'assets/media/facebook.jpg')));
			}
			else{
				social.append($('<h'+x+'></h'+x+'>').text(item));
			}
			x += 1;
		});
		var quickLinks = $('<div></div>').attr('id', 'quickLinks');
		var ul = $('<ul></ul>');
		$.each(json.quickLinks, function(i, item){
			ul.append($('<li></li>').append($('<a></a>').attr('href', item.href).text(item.title)));
		});
		quickLinks.append(ul);
		var news = $('<div></div>').attr('id', 'news');
		news.append().append($('<a></a>').text('News Archives'));
		var copyright = $('<div></div>').attr('id', 'copyright');
		copyright.append(json.copyright.html);
		$('#foot').append(foot.append(social).append(quickLinks).append(news).append(copyright));
		$('#news a').on('click', function(){
			apiService().getNewsData().done(function(json){
				var html = $('<div></div').append($('<h1></h1>').text('News Archives'));
				$.each(json.older, function(i, item){
					var date = new Date(item.date);
					html.append($('<div></div>').append($('<h3></h3').text(item.title)).append($('<h4></h4>').text(parseInt(date.getMonth())+1+'/'+date.getDate()+'/'+date.getFullYear())).append($('<p></p>').text(item.description)));
				});
				$.fancybox.open(html);
			});
		});
		$("#nav-menu a").mPageScroll2id();
	});
});