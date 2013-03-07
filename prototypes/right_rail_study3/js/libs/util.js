$(document).ready(function () { 

		// Recenter dialog boxes if browser is resized
		$(window).bind('resize', function () {
				$('.ui-dialog :visible').dialog('option', 'position', 'center');
		});
		
		
		$('#nav-site').delegate('.collapsible-menu', 'click', function () {
				if ($(this).is('.closed')) {
						$(this).children('a').attr('title', 'Expanded. Click to collapse section.').children('span').replaceWith('<span class="visuallyhidden"> is expanded. Click to collapse.</span>');
						$(this).removeClass('closed').next('div').attr('aria-hidden', 'false').removeClass('collapsed');
				} else {
						$(this).children('a').attr('title', 'Collapsed. Click to expand section.').children('span').replaceWith('<span class="visuallyhidden"> is collapsed. Click to expand.</span>');
						$(this).addClass('closed').next('div').attr('aria-hidden', 'true').addClass('collapsed');
				}
				return false;
		});
		
		// Takes an input element and clears it's value on focus. If no change occurs to the value then the original one is put back
		function clearInputValue(input) {
				var originalValue = $(input).val();   
				$(input).blur(function () {
						if ($(this).val() == '') {
								$(this).val(originalValue);
						} else {
								$(this).unbind('blur');
						}
				});
		}
		
		$('.autoClear')
			.focus(function (){
				$(this).select();
				clearInputValue(this);
			});
		
		
		// Enable Skiplinks to work in WebKit browsers (e.g. Safari and Chrome) 
		// Ref: http://www.communis.co.uk/blog/2009-06-02-skip-links-chrome-safari-and-added-wai-aria
		var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
		var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
		if (is_webkit || is_opera) {
				// send users to main content, just before #content-main
				var target1 = document.getElementById('skiptarget1');
				target1.href = "#skiptarget1";
				target1.innerText = "Start of main content";
				target1.setAttribute("tabindex", "0");
				document.getElementById('skip-main').setAttribute("onclick", "document.getElementById('skiptarget1').focus();");
				// send users to sidebar (if exists), just before #resources
				if (document.getElementById('skiptarget2')){
					var target2 = document.getElementById('skiptarget2');
					target2.href = "#skiptarget2";
					target2.innerText = "Start of supporting content";
					target2.setAttribute("tabindex", "0");
					document.getElementById('skip-side').setAttribute("onclick", "document.getElementById('skiptarget2').focus();");
				} else {
					var el = document.getElementById('skip-side');
					el.parentNode.removeChild(el);	
				}
				if (document.getElementById('skip-side2')){
					document.getElementById('skip-side2').setAttribute("onclick", "document.getElementById('skiptarget2').focus();");
					document.getElementById('skip-side3').setAttribute("onclick", "document.getElementById('skiptarget2').focus();");    	
				}
				// send users to footer, just before #footer
				if (document.getElementById('skiptarget3')){
					var target3 = document.getElementById('skiptarget3');
					target3.href = "#skiptarget3";
					target3.innerText = "Start of site information";
					target3.setAttribute("tabindex", "0");
					document.getElementById('skip-foot').setAttribute("onclick", "document.getElementById('skiptarget3').focus();");
				} else {
					var el = document.getElementById('skip-foot');
					el.parentNode.removeChild(el);	
				}
				
				if (document.getElementById('skiptarget4')) {
					// send users to beginning of results list
					var target3 = document.getElementById('skiptarget4');
					target3.href = "#skiptarget4";
					target3.innerText = "Start of results list";
					target3.setAttribute("tabindex", "0");
					document.getElementById('skipTo_results').setAttribute("onclick", "document.getElementById('skiptarget4').focus();");
				}		
		}


		$('.help-tips').poshytip({className: 'tips-more-info',alignTo: 'target', alignX: 'center',alignY: 'bottom', offsetY: 7, slide: false, allowTipHover: true});
		$('.meta-notes').poshytip({className: 'tips-meta',offsetX: -16 ,offsetY: 10, allowTipHover: true});
		
		$('.tbl-stationResults tbody').delegate('tr', 'click', function () {
				var thisLink = $(this).find('a').attr('href');
				location.href = thisLink;
		});
		
		$('#from').datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 2,
			onSelect: function( selectedDate ) {
				$('#to').datepicker('option', 'minDate', selectedDate);
			}
		});
		
		$('#to').datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 2,
			onSelect: function( selectedDate ) {
				$('#from').datepicker('option', 'maxDate', selectedDate);
			}
		});
		
		$('.sel-dateCustom').change(function(){ 
			if ($(this).val() == 'custom') {
				$('.customDate').show();
			} else {
				$('.customDate').hide();
			}
		});
		
		$('.collapsible-section')
			.bind('expand',function () {
				$(this)							
					.removeClass('closed')
					.next()
					.css('display', 'block')
					.attr('aria-hidden', 'false')
					.end()
					.find('.visuallyhidden').text(' Section is expanded. Click to collapse.');
			})
			.bind('collapse',function () {
				$(this)							
					.addClass('closed')
					.next()
					.css('display', 'none')
					.attr('aria-hidden', 'true')
					.end()
					.find('.visuallyhidden').text(' Section is collapsed. Click to expand.');
			})
			.on('click', function(e){
				e.preventDefault();
				
				if ($(this).is('.closed')) { 
					$(this).trigger('expand');									
				} else {
					$(this).trigger('collapse');								
				}
			})
			.not(':first')
			.each(function(){
				$(this).trigger('collapse');
			});		
});

$(window).load(function(){
  	// add accessibility features to Tab navigation
		function selectNavTab(tabList){ 
				var numTabs = tabList.find('li').length;
				
				if (tabList.is('.pillButtons')) { 
					numTabs--;
				}
				
				tabList.find('li').each(function(index){
					var thisTab = $(this),
							thisTabTxt = thisTab.find('a').attr('title'),
							tabState = '';
					
					index++;
					thisTab.attr('aria-selected', 'false');
					tabState = '<span class="visuallyhidden"> tab ' + index + ' of ' + numTabs + '</span>';
					
					if (tabList.is('.pillButtons')) {						
						tabState = '<span class="visuallyhidden">' + thisTabTxt + ' tab ' + index + ' of ' + numTabs + '</span>';
						if (thisTab.is('.last')) { 
							thisTab.removeAttr('aria-selected');	
						}
					}
					
					thisTab.find('a').append(' ' + tabState);
					
					if ((thisTab.is('.current')) || (thisTab.is('.ui-tabs-selected'))) {						
						thisTab.attr('aria-selected', 'true');
						thisTab.find('span').append(' is active');
					}
					
					if (thisTab.find('a').is('.active')) {
						thisTab.attr('aria-selected', 'true');
						thisTab.find('span').not('.icon').append(' is active');
					}
					
				}) ;
		};
		
		selectNavTab($('#nav-main'));
		selectNavTab($('.ui-tabs-nav'));
		selectNavTab($('.pillButtons'));
		$('.ui-tabs').find('a').click(function(){
			$('.ui-tabs ul').find('span').not('.icon').remove();
			selectNavTab($('.ui-tabs-nav'));
		});
});
