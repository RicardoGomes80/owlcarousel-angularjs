// Simple AngularJS wrapper for Owl Carousel https://github.com/OwlFonk/OwlCarousel
// Written by Joel Saupe, http://joelsaupe.com
// 26 September 2014
//
// Requires
// *** owl.carousel.js
// *** owl.carousel.css
// *** JQuery1.7+
// *** AngularJS 1.2+
//
// See README.txt for implementation guide.

app.directive('owlcarousel',function(){

	var link = function(scope,element,attr){

        // Loads owl carousel with default settings, unless otherwise requested in parameters
        var carousel = function(){
            element.owlCarousel({
                // Most important owl features
                items : attr.owlItems ? attr.owlItems : 5,
                itemsCustom : attr.owlItemscustom ? (attr.owlItemscustom.toLowerCase() == 'true') : false,
                itemsDesktop : [1199,attr.owlItemsdesktop ? attr.owlItemsdesktop : 4],
                itemsDesktopSmall : [980, attr.owlItemsdesktopsmall ? attr.owlItemsdesktopsmall : 3],
                itemsTablet: [768, attr.owlItemstablet ? attr.owlItemstablet : 2],
                itemsTabletSmall: attr.owlItemstabletsmall ? (attr.owlItemstabletsmall.toLowerCase() == 'true') : false,
                itemsMobile : [479, attr.owlItemsmobile ? attr.owlItemsmobile : 1],
                singleItem : attr.owlSingleitem ? (attr.owlSingleitem.toLowerCase() == 'true') : false,
                itemsScaleUp : attr.owlItemsscaleup ? (attr.owlItemsscaleup.toLowerCase() == 'true') : false,

                //Basic Speeds
                slideSpeed : attr.owlSlidespeed ? attr.owlSlidespeed : 200,
                paginationSpeed : attr.owlPaginationspeed ? attr.owlPaginationspeed : 800,
                rewindSpeed : attr.owlRewindspeed ? attr.owlRewindspeed : 1000,

                //Autoplay
                autoPlay : attr.owlAutoplay ? (attr.owlAutoplay.toLowerCase() == 'true') : false,
                stopOnHover : attr.owlStoponhover ? (attr.owlStoponhover.toLowerCase() == 'true') : false,

                // Navigation
                navigation : attr.owlNavigation ? (attr.owlNavigation.toLowerCase() == 'true') : false,
                navigationText : [attr.owlNavigationtextprev ? attr.owlNavigationtextprev : "prev",
                        attr.owlNavigationtextnext ? attr.owlNavigationtextnext : "next"],
                rewindNav : attr.owlRewindnav ? (attr.owlRewindnav.toLowerCase() == 'true') : true,
                scrollPerPage : attr.owlScrollperpage ? (attr.owlScrollperpage.toLowerCase() == 'true') : false,

                //Pagination
                pagination : attr.owlPagination ? (attr.owlPagination.toLowerCase() == 'true') : true,
                paginationNumbers: attr.owlPaginationnumbers ? (attr.owlPaginationnumbers.toLowerCase() == 'true') : false,

                // Responsive
                responsive: attr.owlResponsive ? (attr.owlResponsive.toLowerCase() == 'true') : true,
                responsiverefreshrate : attr.owlResponsiverefreshrate ? attr.owlResponsiverefreshrate : 200,
                responsivebasewidth: attr.owlResponsivebasewidth ? attr.owlResponsivebasewidth : window,

                // CSS Styles
                baseClass : attr.owlBaseclass ? attr.owlBaseclass : "owl-carousel",
                theme : attr.owlTheme ? attr.owlTheme : "owl-theme",

                //Lazy load
                lazyLoad : attr.owlLazyload ? (attr.owlLazyload.toLowerCase() == 'true') : false,
                lazyFollow : attr.owlLazyfollow ? (attr.owlLazyfollow.toLowerCase() == 'true') : true,
                lazyEffect : attr.owlLazyeffect ? attr.owlLazyeffect : "fade",

                //Auto height
                autoHeight : attr.owlAutoheight ? (attr.owlAutoheight.toLowerCase() == 'true') : false,

                //JSON
                jsonPath : attr.owlJsonpath ? (attr.owlJsonpath.toLowerCase() == 'true') : false,
                jsonSuccess : attr.owlJsonsuccess ? (attr.owlJsonsuccess.toLowerCase() == 'true') : false,

                //Mouse Events
                dragBeforeAnimFinish : attr.owlDragbeforeanimfinish ? (attr.owlDragbeforeanimfinish.toLowerCase() == 'true') : true,
                mouseDrag : attr.owlMousedrag ? (attr.owlMousedrag.toLowerCase() == 'true') : true,
                touchDrag : attr.owlTouchdrag ? (attr.owlTouchdrag.toLowerCase() == 'true') : true,

                //Transitions
                transitionStyle : attr.owlTransitionstyle ? (attr.owlTransitionstyle.toLowerCase() == 'true') : false,

                // Other
                addClassActive : attr.owlAddclassactive ? (attr.owlAddclassactive.toLowerCase() == 'true') : false,

                //Callbacks
                beforeUpdate : attr.owlBeforeupdate ? (attr.owlBeforeupdate.toLowerCase() == 'true') : false,
                afterUpdate : attr.owlAfterupdate ? (attr.owlAfterupdate.toLowerCase() == 'true') : false,
                beforeInit: attr.owlBeforeinit ? (attr.owlBeforeinit.toLowerCase() == 'true') : false,
                afterInit: attr.owlAfterinit ? (attr.owlAfterinit.toLowerCase() == 'true') : false,
                beforeMove: attr.owlBeforemove ? (attr.owlBeforemove.toLowerCase() == 'true') : false,
                afterMove: attr.owlAftermove ? (attr.owlAftermove.toLowerCase() == 'true') : false,
                afterAction: attr.owlAfteraction ? (attr.owlAfteraction.toLowerCase() == 'true') : false,
                startDragging : attr.owlStartdragging ? (attr.owlStartdragging.toLowerCase() == 'true') : false,
                afterLazyLoad : attr.owlAfterlazyload ? (attr.owlAfterlazyload.toLowerCase() == 'true') : false
			});
		}

        // Use carousel's id to bind control buttons to specific carousel (Multiple carousel support)
        // Otherwise, use owl-carousel as default.
        // Any element with given class will trigger control on click.
        //  '.owlcarousel-next' - Scrolls left
        //  '.owlcarousel-prev' - Scrolls right
        //  '.owlcarousel-play' - Starts autoplay
        //  '.owlcarousel-stop' = Stops autoplay
        var uniqueId = attr.id ? attr.id : 'owl-carousel';
		var actions = function(){
			angular.element("." + uniqueId + "-next").click(function(){
				element.trigger('owl.next');
			})
			angular.element("." + uniqueId + "-prev").click(function(){
				element.trigger('owl.prev');
			})
			angular.element("." + uniqueId + "-play").click(function(){
				element.trigger('owl.play',1000);
			})
			angular.element("." + uniqueId + "-stop").click(function(){
				element.trigger('owl.stop');
			})
		}

		// Watch items in carousel to reload when items are added/removed.
		scope.$watch(uniqueId + "-items", function(value) {
			carousel(element);
		})

        // Load the triggers for carousel controls.
		actions();
	}

	return{
		restrict : "A",
		link: link
	}

});
