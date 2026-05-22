function loadPage(page) {
    $("#content").load(`pages/${page}.html`);
}

function updateSidebarActive() {

    const currentPage = location.hash.substring(1);
    const sidebarLinks = $("#sidebar .nav-link");

    if (currentPage) {

        sidebarLinks.each(function () {

            const linkPage =
                $(this).attr("href").substring(1);

            if (linkPage === currentPage) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }

        });

    } else {

        sidebarLinks.removeClass("active");

        $("#sidebar .nav-link[href='#home']")
            .addClass("active");
    }
}