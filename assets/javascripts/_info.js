YUI.add("_info", function (Y) {

    var _api,
        _init,
        _node,
        _handleMessage,
        _handleViewload;

    _init = function (sandbox) {
        _api = sandbox;
    };

    _handleViewload = function () {
        _api.log("_handleViewload() is executed.");
    };

    _handleMessage = function () {
        _api.log("_handleMessage() is executed.");
    };

    _api = new Y.Module({
        selector: "#info",
        init: _init,
        on: {
           viewload: _handleViewload,
           message: _handleMessage
        }
    });

}, "0.0.1", {requires: ["module", "node-base", "cookie"]});
