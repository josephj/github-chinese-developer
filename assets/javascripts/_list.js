/*global YUI */
YUI.add("_list", function (Y) {

    var _api,
        _activeNode,
        _bodyNode,
        _cache,
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
        _fillHeight,
        _init,
        //================
        // Event Handlers
        //================
        _handleCallback,
        _handleClick,
        _handleResize,
        _handleSubmit,
        _handleMessage,
        _handleViewload;

    _fillHeight = function () {
        _api.log("_fillHeight() is executed.");
        _node.setStyle("height", (_node.get("winHeight") - _node.getY() - 10) + "px");
    };

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
        _bodyNode.setContent("<ul>" + html.join("") + "</ul>");

        if (!Y.Object.size(tasks)) {
            // Save to cache.
            Y.log(_keyword);
            _cache.add(_keyword, Y.JSON.stringify(users));
            _api.log("The user data has been saved to cache.");
            Y.one("#user-0").addClass("selected");
            _activeNode = Y.one("#user-0");
            _api.broadcast("show-user", users[0]);
            _users = users;
            return;
        }

        // Make extra requests to get G-Avatar Icons.
        Y.each(tasks, function (value, key) {
            Y.jsonp(API_ENTRYPOINT + "users/" + key + "?callback={callback}", {
                on: {
                    success: function (o, selector) {
                        Y.one(selector + " img").set("src", "http://www.gravatar.com/avatar/" + o.data.gravatar_id + "?s=120");
                        var key = selector.split("-")[1];
                        users[key] = Y.mix(users[key], o.data);
                        counter += 1;

                        // Save to cache.
                        if (counter === Y.Object.size(tasks)) {
                            _cache.add(_keyword, Y.JSON.stringify(users));
                            _api.log("The user data has been saved to cache.");
                            _node.one("#user-0").addClass("selected");
                            _activeNode = Y.one("#user-0");
                            _users = users;
                            _api.broadcast("show-user", users[0]);
                        }
                    }
                },
                args: [value]
            });
        });
    };

    _handleClick = function (e) {
        e.halt();
        if (!_users) {
            return;
        }
        var node = e.currentTarget,
            key = node.get("id").split("-")[1];

        if (_activeNode) {
            _activeNode.removeClass("selected");
        }
        node.addClass("selected");
        _activeNode = node;
        _api.broadcast("show-user", _users[key]);
    };

    _handleMessage = function (e) {
        _api.log("_handleMessage() is executed.");
        var data  = e.data,
            where = data.location,
            lang  = data.language,
            html = [],
            users,
            cache,
            keyword,
            url;

        if (e.name !== "change-condition") {
            return;
        }

        _users = null;

        // Clear existing content.
        _bodyNode.setContent("");

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
        _api.get("The search keyword for GitHub API is '" + keyword + "'");

        // Use cache if it has.
        _keyword = keyword.replace(/:/g, "_").replace(/ /g, "_").toLowerCase();
        cache = _cache.retrieve(_keyword);
        if (cache) {
            _api.log("Use cache in local storage.");
            users = Y.JSON.parse(cache.response);
            Y.each(users, function (user, key) {
                html.push(_template(user));
            });
            _users = users;
            _bodyNode.setContent("<ul>" + html.join("") + "</ul>");
            _api.broadcast("show-user", users[0]);
            return;
        }

        _api.log("No cache exists, make request to GitHub API.");

        // Show activity indicator.
        _node.addClass("loading");

        url = API_ENTRYPOINT + "legacy/user/search/" + keyword +
              "?sort=followers&callback={callback}";
        Y.jsonp(url, {
            on: {
                success: _handleCallback,
                failure: function () {
                    _api.log("The GitHub API is currently unavailable." +
                             "Please check your internet connection.", "error");

                    // Remove the activator indicator.
                    _node.removeClass("loading");
                    _bodyNode.setContent('<p class="msg">無法存取 GitHub API</p>');

                },
                timeout: function () {
                    _api.log("It takes too much time connecting to GitHub API." +
                             "Please try again later", "error");

                    // Remove the activator indicator.
                    _node.removeClass("loading");
                    _bodyNode.setContent('<p class="msg">連線時間過久、請稍後再試！</p>');
                }
            }
        })
    };

    _handleViewload = function (e) {
        _api.log("_handleViewload() is executed.");
        _node = _api.get("node");
        _bodyNode = _node.one(".bd");

        // Compile the handlebar template.
        _template = Y.Handlebars.compile(Y.one("#tpl-user").getHTML());

        // Adjust height of this module.
        _fillHeight();

        // Bind events.
        Y.on("windowresize", _handleResize);
        _node.delegate("click", _handleClick, "li");
    };

    _handleResize = function () {
        _api.log("_handleResize() is executed.");
        _fillHeight();
    };

    _api = new Y.Module({
        selector: MODULE_ID,
        init: _init,
        on: {
           viewload: _handleViewload,
           message: _handleMessage
        }
    });

}, "0.0.1", {requires: ["node-event-delegate", "module", "handlebars", "cache", "jsonp", "node-style", "node-screen", "event-resize"]});
