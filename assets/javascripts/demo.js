(function () {

    var API_ENTRYPOINT = "https://api.github.com/",
        //================
        // Attributes
        //================
        _listNode,
        //================
        // Event Handler
        //================
        _handleCallback,
        _handleReady,
        _handleSubmit,
        //================
        // Methods
        //================
        _makeRequest;

    _handleCallback = function (o) {
        _listNode.removeClass("loading");
        var tasks = {},
            users = o.data.users,
            source = $("#tpl-user").html();
            template = Handlebars.compile(source),
            html = [];

        jQuery.each(users, function (key, user) {
            // Some users lack of gravatar_id for unknown reason,
            // save these data so we can check by another Github API.
            if (!user.gravatar_id) {
                user.element_id = "user-" + key;
                tasks[user.login] = "#" + user.element_id;
            }
            html.push(template(user));
        });

        jQuery.each(tasks, function (key, value) {
            $.ajax({
                dataType: "jsonp",
                url: API_ENTRYPOINT + "users/" + key + "?callback={callback}",
                context: {selector: value}
            }).done(function (o) {
                $(this.selector + " img").attr("src", "http://www.gravatar.com/avatar/" + o.data.gravatar_id + "?s=120");
            });
        });

        _listNode.first(".bd").html("<ul>" + html.join("") + "</ul>");
    };

    _handleReady = function () {
        _listNode = $("#list");
        _formNode = $("#filter form");
        _formNode.submit(_handleSubmit);
        _formNode.one("#language").change(_handleSubmit);
        _formNode.one("#location").change(_handleSubmit);
        _makeRequest();
    };

    _handleSubmit = function (e) {
        e.preventDefault();
        _listNode.first(".bd").html("");
        _makeRequest();
    };

    _makeRequest = function () {
        var where = $("#location").val(),
            lang = $("#language").val(),
            keyword;
        if (where.indexOf(",") !== -1) {
            jQuery.each(where.split(","), function (index, value) {
                keyword += "location: " + value + " ";
            });
            keyword = encodeURIComponent(jQuery.trim(keyword));
        } else {
            keyword = "location:" + encodeURIComponent(where);
        }
        keyword += (jQuery.trim(lang)) ? " language:" + lang : "";

        _listNode.addClass("loading");

        $.ajax({
            dataType: "jsonp",
            url: API_ENTRYPOINT + "legacy/user/search/" + keyword + "?callback={callback}"
        }).done(_handleCallback);
    };

    $("ready", _handleReady);

})();
