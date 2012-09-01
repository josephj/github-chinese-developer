(function () {

    var API_ENTRYPOINT = "https://api.github.com/legacy/user/search/",
        _listNode,
        _handleCallback,
        _handleReady,
        _handleSubmit,
        _makeRequest;

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
            url: API_ENTRYPOINT + keyword + "?callback={callback}"
        }).done(_handleCallback);
    };

    _handleCallback = function (o) {
        _listNode.removeClass("loading");
        var users = o.data.users,
            source = $("#tpl-user").html();
            template = Handlebars.compile(source),
            html = [];

        jQuery.each(users, function (key, user) {
            html.push(template(user));
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

    $("ready", _handleReady);

})();
