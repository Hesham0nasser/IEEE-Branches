// global declarations
var lat = 34.0983425, lng = 118.3267434;

function wlCommonInit() {
	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */

	// Common initialization code goes here
	
	// fetch the data from the server and update gui
	try {
		$.mobile.loading("show");
		WL.Client.invokeProcedure({
			adapter : 'adapter',
			procedure : 'getAdapters'
		}, {
			onSuccess : function(result) {
				result = result.invocationResult;
				$.mobile.loading("hide");
				if (result.isSuccessful && result.statusCode == 200) {
					fill_data(result.data);
				} else {
					WL.Logger.debug("Error: " + result.invocationResult);
				}
			},
			onFailure : function(result) {
				WL.Logger.debug("Error: " + result);
			}
		});
	} catch (e) {
		WL.Logger.debug("Error: " + e);
	}
}

// update gui with the fetched data (ieee_sections)
function fill_data(ieee_sections) {

	// fill regions page
	if (ieee_sections.length == 0)
		return;
	var content = '';
	for (var i = 0; i < ieee_sections.length; i++) {
		var region = ieee_sections[i].name;
		ieee_sections[i].id = i;
		content += '<li><a href="#branchPage" regionId="' + i + '">' + region + '</a></li>';
	}
	$("#regionFilter").html(content);
	$("#regionFilter").listview('refresh');

	// onclick on a region in region page
	$("ul a").click(
			function() {

				// fill branches data
				var id = $(this).attr('regionId');
				var sz = ieee_sections[id].branches.length;
				if (sz == 0)
					return;
				var content = "";
				for (var i = 0; i < sz; i++) {
					content += '<div class="collapse" data-role="collapsible" data-filtertext="' + ieee_sections[id].branches[i].name + '"'
							+ ' data-collapsed-icon="arrow-l" data-expanded-icon="arrow-d" data-iconpos="right">' + '<h3>' + ieee_sections[id].branches[i].name
							+ '</h3><h4>Events</h4>';
					if (ieee_sections[id].branches[i].events.length > 0) {
						content += '<div class="swipe"><div class="swipe-wrap">';
						for (var j = 0; j < ieee_sections[id].branches[i].events.length; j++) {
							content += '<div><p>' + ieee_sections[id].branches[i].events[j] + '</p></div>';
						}
						content += '</div><a href="#mapPage" class="ui-btn map" lat="' + ieee_sections[id].branches[i].lat + '" lng="' + ieee_sections[id].branches[i].lng
								+ '">View On Map</a>' + '</div>';
					}
					content += "</div>";
				}
				$("#BranchFilter").html(content);
				$("#BranchFilter").trigger('create');
			});
}

$(document).on("pageshow", "#branchPage", function() {
	// start the slider on click on branch
	$(".collapse").on("collapsibleexpand", function(event, ui) {
		var elm = $(this).find(".swipe").get(0);
		window.mySwipe = Swipe(elm, {
			startSlide : 0,
			auto : 3000,
		});
	});
	// slide expanded
	var elm = $(this).find(".ui-collapsible").each(function(i, elm) {
		if (elm.className.indexOf("ui-collapsible-collapsed") == -1) {
			elm = $(elm).find('.swipe').get(0);
			window.mySwipe = Swipe(elm, {
				startSlide : 0,
				auto : 3000,
			});
		}
	});
	// update marker on the map
	$(".map").click(function() {
		lat = $(this).attr('lat') * 1;
		lng = $(this).attr('lng') * 1;
	});
});

// start the map on page show
$(document).on("pageshow", "#mapPage", function(event, data) {
	var defaultLatLng = new google.maps.LatLng(lat, lng);
	drawMap(defaultLatLng, "IEEE");
});

// clear the map on page hide
$(document).on("pagebeforehide", "#mapPage", function(event, data) {
	$("#map-canvas").html("");
});

// draw the map
function drawMap(latlng, branch) {
	var myOptions = {
		zoom : 12,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
	var marker = new google.maps.Marker({
		position : latlng,
		map : map,
		title : branch
	});
}
