$(document).ready(function () {

	$("#sandwich").on("click", function(){
	$(this).toggleClass("active");
	$("body").toggleClass("menubar-dashboard");
	$("html").toggleClass("o-hidden");
	$(".form-search").toggleClass("form-transform");
	$(".form-search-2").toggleClass("form-transform");
	window.dispatchEvent(new Event('resize'));
	});

	$("#sandwich-2").on("click", function() { 
		$(this).toggleClass("active");
		$("body").toggleClass("menubar-dashboard-2");
	  $("html").toggleClass("o-hidden");
	});

	$(".close-box").on("click", function(){
	  $(this).closest(".box-hide").hide();
	});

  Waves.attach('.new-lead, .avatar');
  Waves.attach('.btn',  ['waves-light']);
  Waves.init();

  $('.select-beast').selectize({});

 // SELECT2

(function($) {
  var Defaults = $.fn.select2.amd.require('select2/defaults');
  $.extend(Defaults.defaults, {
    dropdownPosition: 'auto'
  });
  var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');
  var _positionDropdown = AttachBody.prototype._positionDropdown;
  AttachBody.prototype._positionDropdown = function() {
    var $window = $(window);
    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');
    var newDirection = null;
    var offset = this.$container.offset();
    offset.bottom = offset.top + this.$container.outerHeight(false);
    var container = {
        height: this.$container.outerHeight(false)
    };
    container.top = offset.top;
    container.bottom = offset.top + container.height;
    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };
    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };
    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);
    var css = {
      left: offset.left,
      top: container.bottom
    };
    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;
    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }
    var parentOffset = $offsetParent.offset();
    css.top -= parentOffset.top
    css.left -= parentOffset.left;
    var dropdownPositionOption = this.options.get('dropdownPosition');
    if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {
      newDirection = dropdownPositionOption;
    } else {
      if (!isCurrentlyAbove && !isCurrentlyBelow) {
        newDirection = 'below';
      }
      if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
        newDirection = 'above';
      } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
        newDirection = 'below';
      }
    }
    if (newDirection == 'above' ||
    (isCurrentlyAbove && newDirection !== 'below')) {
        css.top = container.top - parentOffset.top - dropdown.height;
    }
    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }
    this.$dropdownContainer.css(css);
  };
})(window.jQuery);

    $("select.select2").select2({
      dropdownPosition: 'below',
      allowClear: true
    });

});

	var timer=null;
	var timerrun=false;
	function stoptime() {
		if(timerrun)
		clearTimeout(timer);
		timerrun=false;
	}
	function starttime() {
		stoptime();
		showtime();
	}
	function showtime() {
	var all=new Date();
	var hours=all.getHours();
	var minutes=all.getMinutes();
	var seconds=all.getSeconds();
	var timevalue= " " +((hours>12) ? hours-12 : hours) 
	timevalue += ((minutes<10) ? ":0" : ":") + minutes
	timevalue += ((seconds<10) ? ":0" : ":") + seconds
	document.clock.next.value=timevalue;
	timer=setTimeout('showtime()',1000);
	timerrun=true;
	}

// DRAG-N-DROP

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}
