YUI.add("_list", function (Y) {

    var _api,
        _template,
        _node,
        _keyword,
        _users,
        //================
        // Constants
        //================
        API_ENTRYPOINT = "https://api.github.com/",
        MODULE_ID = "#list",
        //================
        // Methods
        //================
        _init,
        //================
        // Event Handlers
        //================
        _handleCallback,
        _handleResize,
        _handleSubmit,
        _handleMessage,
        _handleViewload;

    _init = function (sandbox) {
        _api = sandbox;
        _api.listen("change-condition");
        _cache = new Y.CacheOffline();
    };

    _handleCallback = function (o) {
        _api.log("_handleCallback() is executed.");
        var tasks = {},
            users = o.data.users,
            counter = 0,
            html = [];

        // Remove the activator indicator.
        _node.removeClass("loading");

        Y.each(users, function (user, key) {
            // Some users lack of gravatar_id for unknown reason,
            // save these data so we can check by another Github API.
            if (!user.gravatar_id) {
                user.element_id = "user-" + key;
                tasks[user.login] = "#" + user.element_id;
            }
            html.push(_template(user));
        });

        // Output the HTML.
        _node.one(".bd").setContent("<ul>" + html.join("") + "</ul>");

        // Make extra requests to get G-Avatar Icons.
        Y.each(tasks, function (value, key) {
            Y.jsonp(API_ENTRYPOINT + "users/" + key + "?callback={callback}", {
                on: {
                    success: function (o, selector, key) {
                        Y.one(selector + " img").set("src", "http://www.gravatar.com/avatar/" + o.data.gravatar_id + "?s=120");
                        var key = selector.split("-")[1];
                        users[key] = Y.mix(users[key], o.data);
                        counter += 1;

                        // Save to cache.
                        if (counter === Y.Object.size(tasks)) {
                            _cache.add(_keyword, Y.JSON.stringify(users));
                            _api.log("The user data has been saved to cache.");
                            _api.broadcast("show-user", users[0]);
                            _users = users;
                        }
                    }
                },
                args: [value, key]
            });
        });
    };

    _handleMessage = function (e) {
        _api.log("_handleMessage() is executed.");
        var data  = e.data,
            where = data.location,
            lang  = data.language,
            users,
            cache,
            keyword;

        if (e.name !== "change-condition") {
            return;
        }

        // Clear existing content.
        _node.one(".bd").setContent("");

        // Get the search keyword.
        if (where.indexOf(",") !== -1) {
            Y.each(where.split(","), function (loc) {
                keyword += "location: " + loc + " ";
            });
            keyword = encodeURIComponent(Y.Lang.trim(keyword));
        } else {
            keyword = "location:" + encodeURIComponent(where);
        }
        keyword += (Y.Lang.trim(lang)) ? " language:" + lang : "";
        _api.get("The search keyword for GitHub API is '" + keyword + "'")

        // Use cache if it has.
        _keyword = keyword.replace(/:/g, "_").replace(/ /g, "_").toLowerCase();
        cache = _cache.retrieve(_keyword);
        if (cache) {
            _api.log("Use cache in local storage.")
            users = Y.JSON.parse(cache.response);
            html = [];
            Y.each(users, function (user, key) {
                html.push(_template(user));
            });
            _users = users;
            _node.one(".bd").setContent("<ul>" + html.join("") + "</ul>");
            _api.broadcast("show-user", users[0]);
            return;
        }

        _api.log("No cache exists, make request to GitHub API.")

        // Show activity indicator.
        _node.addClass("loading");

        Y.jsonp(API_ENTRYPOINT + "legacy/user/search/" + keyword + "?callback={callback}", _handleCallback);
    };

    _handleViewload = function (e) {
        _api.log("_handleViewload() is executed.");
        _template = Y.Handlebars.compile(Y.one("#tpl-user").getHTML());
        _node = _api.get("node");
        _node.setStyle("height", (_node.get("winHeight") - _node.getY() - 10) + "px");
        Y.on("windowresize", _handleResize);
    };

    _handleResize = function () {
        _api.log("_handleResize() is executed.");
        _node.setStyle("height", (_node.get("winHeight") - _node.getY() - 10) + "px");
    };

    _api = new Y.Module({
        selector: MODULE_ID,
        init: _init,
        on: {
           viewload: _handleViewload,
           message: _handleMessage
        }
    });

}, "0.0.1", {requires: ["module", "handlebars", "cache", "jsonp", "node-style", "node-screen", "event-resize"]});
