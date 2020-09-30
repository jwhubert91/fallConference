/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. IE Check
3. Set Header
4. Init Search
5. Init Menu


******************************/

$(document).ready(function () {
  "use strict";

  /* 

	1. Vars and Inits

	*/

  var menu = $(".menu");
  var menuActive = false;
  var header = $(".header");

  setHeader();

  $(window).on("resize", function () {
    setHeader();
  });

  $(document).on("scroll", function () {
    setHeader();
  });

  init_ie_check();
  setHeader();
  initSearch();
  initMenu();

  /* 

	2. IE Check

	*/

  function init_ie_check() {
    var version = detectIE();
    var logo = $(".logo_text");

    if (version === false) {
    } else if (version >= 12) {
    } else {
      logo.removeClass("logo_text_not_ie");
    }
  }

  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    var edge = ua.indexOf("Edge/");
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // other browser
    return false;
  }

  /* 

	3. Set Header

	*/

  function setHeader() {
    if ($(window).scrollTop() > 127) {
      header.addClass("scrolled");
    } else {
      header.removeClass("scrolled");
    }
  }

  /* 

	3. Init Search

	*/

  function initSearch() {
    if ($(".header_search").length) {
      var search = $(".header_search");
      var panel = $(".search_container");
      search.on("click", function () {
        panel.toggleClass("active");
      });
    }
  }

  /* 

	4. Init Menu

	*/

  function initMenu() {
    if ($(".hamburger").length && $(".menu").length) {
      var hamb = $(".hamburger");
      var close = $(".menu_close_container");

      hamb.on("click", function () {
        if (!menuActive) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      close.on("click", function () {
        if (!menuActive) {
          openMenu();
        } else {
          closeMenu();
        }
      });
    }
  }

  function openMenu() {
    menu.addClass("active");
    menuActive = true;
  }

  function closeMenu() {
    menu.removeClass("active");
    menuActive = false;
  }

  // Populate table
  const attendeesTableBody = document.querySelector(
    "table.attendees-list tbody"
  );

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((user) => {
        attendeesTableBody.innerHTML += `
			  <tr>
				 <td>
					<svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
						<path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
						<path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
					</svg>
				 </td> 
				 <td>${user.name}&nbsp;<a class="link" href="https://www.linkedin.com/in/shaquilleoneal/" target="_none">Linkedin</a></td>
				 <td><a class="link" href="https://www.ibm.org/" target="_none">${user.company.name}</a></td>
				 <td>
				 	<a class="btn btn-primary send-invite" role="button">Send Invite</a>
				 </td>
			  </tr>
		  `;
      });
      // Datatables
      $("table").DataTable({
        columnDefs: [{ orderable: false, targets: 0 }],
        columns: [
          { orderable: false },
          null,
          null,
          { orderable: false },
          { orderable: false },
        ],
      });
    });
});

const sendButtonEl = document.querySelector(".send-invite");
sendButtonEl.addEventListener(
  "click",
  alert("Are you sure you want to send an invite?")
);
