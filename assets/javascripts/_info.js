YUI.add("_info", function (Y) {

    var _api,
        _init,
        _node,
        _handleMessage,
        _handleViewload;

    _init = function (sandbox) {
        _api = sandbox;
        _api.listen("show-user");
    };

    _handleMessage = function (e) {
        if (e.name === "show-user") {
            _node.setContent(_template(e.data));
        }
    };

    _handleViewload = function () {
        _api.log("_handleViewload() is executed.");
        _node = _api.get("node");
        _template = Y.Handlebars.compile(Y.one("#tpl-info").getHTML());
    };

    _api = new Y.Module({
        selector: "#info",
        init: _init,
        on: {
           viewload: _handleViewload,
           message: _handleMessage
        }
    });

}, "0.0.1", {requires: ["module", "node-base", "handlebars"]});
