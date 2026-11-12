let sidebar = document.getElementById("sidebar");
let content = document.querySelector("#content");
let sidebar_toggle = document.querySelector("#sidebar-toggle");

sidebar_toggle.addEventListener("click", () => {
    let sidebarRight = window.getComputedStyle(sidebar).right;
    if (window.innerWidth > 767) {
        if (sidebarRight === '0px') {
            sidebar.style.right = "-250px";
            content.style.marginRight = "0"
        } else {
            sidebar.style.right = "0";
            content.style.marginRight = "250px"
        }
    } else {

        if (sidebarRight === '0px') {
            sidebar.style.right = "-250px";
        } else {

            sidebar.style.right = "0";
        }
    }


});


// sidebar using animation end
