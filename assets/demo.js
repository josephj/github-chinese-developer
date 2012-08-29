/*global YUI */
YUI().use("jsonp", "node", "event", "handlebars", function (Y) {

    var _listNode,
        _formNode,
        API_ENTRYPOINT = "https://api.github.com/legacy/user/search/",
        _handleCallback,
        _handleSubmit,
        _makeRequest;

    _handleCallback = function (o) {
        _listNode.removeClass("loading");
        var users = o.data.users,
            source = Y.one("#tpl-user").getHTML(),
            template = Y.Handlebars.compile(source),
            html = [];

        Y.each(users, function (user) {
            html.push(template(user));
        });
        _listNode.one(".bd").setContent("<ul>" + html.join("") + "</ul>");
    };

    _handleSubmit = function (e) {
        e.preventDefault();
        _listNode.one(".bd").setContent("");
        _makeRequest();
    };

    _makeRequest = function () {
        var where = _formNode.one("#location").get("value"),
            lang = _formNode.one("#language").get("value"),

            keyword;

        if (where.indexOf(",") !== -1) {
            Y.each(where.split(","), function (loc) {
                keyword += "location: " + loc + " ";
            });
            keyword = encodeURIComponent(Y.Lang.trim(keyword));
        } else {
            keyword = "location:" + encodeURIComponent(where);
        }
        keyword += (Y.Lang.trim(lang)) ? " language:" + lang : "";

        _listNode.addClass("loading");
        Y.jsonp(API_ENTRYPOINT + keyword + "?callback={callback}", _handleCallback);
    };

    Y.on("domready", function () {
        _listNode = Y.one("#list");
        _formNode = Y.one("#filter form");
        _formNode.on("submit", _handleSubmit);
        _formNode.one("#language").on("change", _handleSubmit);
        _formNode.one("#location").on("change", _handleSubmit);
        _makeRequest();
    });

});
