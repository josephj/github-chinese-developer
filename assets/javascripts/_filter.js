/*global YUI */
YUI.add("_filter", function (Y) {

    var _api,
        _init,
        _node,
        _handleSubmit,
        _handleViewload;

    _init = function (sandbox) {
        _api = sandbox;
    };

    _handleSubmit = function (e) {
        _api.log("_handleSubmit() is executed.");
        if (e) {
            e.preventDefault();
        }

        var where = _node.one("#location").get("value"),
            lang = _node.one("#language").get("value");

        Y.Cookie.set("location", where);
        Y.Cookie.set("language", lang);

        _api.broadcast("change-condition", {
            "location": where,
            "language": lang
        });
    };

    _handleViewload = function (e) {
        _api.log("_handleViewload() is executed.");
        var langNode,
            formNode,
            whereNode;

        _node = _api.get("node");
        formNode = _node.one("form");
        langNode  = formNode.one("#language");
        whereNode = formNode.one("#location");

        // Set for convenience.
        if (Y.Cookie.get("location")) {
            whereNode.set("value", Y.Cookie.get("location"));
        }
        if (Y.Cookie.get("language")) {
            langNode.set("value", Y.Cookie.get("language"));
        }

        // Bind events.
        whereNode.on("change", _handleSubmit);
        langNode.on("change", _handleSubmit);
        formNode.on("submit", _handleSubmit);

        // Trigger submit to get data.
        _handleSubmit();
    };

    _api = new Y.Module({
        selector: "#filter",
        init: _init,
        on: {
           viewload: _handleViewload
        }
    });

}, "0.0.1", {requires: ["module", "node-base", "cookie"]});
