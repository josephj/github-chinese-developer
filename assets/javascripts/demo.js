/*global YUI */
YUI().use("json", "cache", "jsonp", "node", "event", "handlebars", function (Y) {

    var _listNode,
        _formNode,
        _cache,     // The localStorage cache.
        _template,  // The compiled Handlebars template.
        _keyword,   // Current search keyword.
        //================
        // Constants
        //================
        API_ENTRYPOINT = "https://api.github.com/",
        //================
        // Event Handlers
        //================
        _handleCallback,
        _handleSubmit,
        _makeRequest;

    _handleCallback = function (o) {
        _listNode.removeClass("loading");
        var tasks = {},
            users = o.data.users,
            counter = 0,
            html = [];

        Y.each(users, function (user, key) {
            // Some users lack of gravatar_id for unknown reason,
            // save these data so we can check by another Github API.
            if (!user.gravatar_id) {
                user.element_id = "user-" + key;
                tasks[user.login] = "#" + user.element_id;
            }
            html.push(_template(user));
        });
        _listNode.one(".bd").setContent("<ul>" + html.join("") + "</ul>");

        Y.each(tasks, function (value, key) {
            Y.jsonp(API_ENTRYPOINT + "users/" + key + "?callback={callback}", {
                on: {
                    success: function (o, selector, key) {
                        Y.one(selector + " img").set("src", "http://www.gravatar.com/avatar/" + o.data.gravatar_id + "?s=120");
                        users[selector.split("-")[1]].gravatar_id = o.data.gravatar_id;
                        counter += 1;
                        // Save to cache.
                        if (counter === Y.Object.size(tasks)) {
                            Y.log(_cache.add(_keyword, Y.JSON.stringify(users)));
                        }
                    }
                },
                args: [value, key]
            });
        });
    };

    _handleSubmit = function (e) {
        e.preventDefault();
        _listNode.one(".bd").setContent("");
        _makeRequest();
    };

    _makeRequest = function () {
        var where = _formNode.one("#location").get("value"),
            lang = _formNode.one("#language").get("value"),
            users,
            cache,
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
        _keyword = keyword.replace(":", "_").toLowerCase();

        // Use cache if it has.
        cache = _cache.retrieve(_keyword);
        if (cache) {
            users = Y.JSON.parse(cache.response);
            html = [];
            Y.each(users, function (user, key) {
                html.push(_template(user));
            });
            _listNode.one(".bd").setContent("<ul>" + html.join("") + "</ul>");
            return;
        }

        _listNode.addClass("loading");
        Y.jsonp(API_ENTRYPOINT + "legacy/user/search/" + keyword + "?callback={callback}", _handleCallback);
    };

    _cache = new Y.CacheOffline();

    Y.on("domready", function () {
        _listNode = Y.one("#list");
        _formNode = Y.one("#filter form");
        _template = Y.Handlebars.compile(Y.one("#tpl-user").getHTML());
        _formNode.on("submit", _handleSubmit);
        _formNode.one("#language").on("change", _handleSubmit);
        _formNode.one("#location").on("change", _handleSubmit);
        _makeRequest();
    });

});
