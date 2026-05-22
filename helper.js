function navigate(path) {
    location.hash = `/${path}`;
}

function router() {
    const page = location.hash.substring(2);
    console.log(page);
    loadPage(page);
    updateSidebarActive();
}

function loadPage(page) {
    $("#content").load(`pages/${page}/index.html`, function (response, status) {
        if (status === "error") {
            $("#content").load("pages/404/index.html");
        }
    });
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