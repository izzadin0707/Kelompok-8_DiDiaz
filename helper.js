const Session = {

    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },

    remove(key) {
        sessionStorage.removeItem(key);
    },

    clear() {
        sessionStorage.clear();
    }

};

function logout() {
    Session.clear();
    localStorage.removeItem("login");
    location.href = "auth";
}

function isLoggedIn() {
    const user = Session.get("login");
    const userLocal = JSON.parse(localStorage.getItem("login"));
    return (user && user.isLogin) || (userLocal && userLocal.isLogin);
}

function navigate(path) {
    location.hash = `/${path}`;
}

function router() {
    const page = location.hash.substring(2);

    if (!page || page.trim() === "") {
        location.href = "";
        return;
    }

    loadPage(page);
    updateSidebarActive();
}

function loadPage(page) {
    $("#content").animate({ opacity: 0 }, 100, function () {
        $(this).load(`pages/${page}/index.html`, function (response, status) {
            if (status === "error") {
                $(this).load("pages/404/index.html");
            }
            $(this).delay(100).animate({ opacity: 1 }, 100);
        });
    });
}

function updateSidebarActive() {
    const currentPage = location.hash.substring(2);
    const sidebarLinks = $("#sidebar li");

    if (currentPage) {
        sidebarLinks.each(function () {
            const linkPage = $(this).attr("id");

            if (linkPage === currentPage) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    } else {
        sidebarLinks.removeClass("active");
        $("#sidebar #home").addClass("active");
    }
}