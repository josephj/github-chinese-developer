/*global YUI */
YUI({
    logExclude: {
        "Y.ModuleManager": true,
        "Y.Module": true
    }
}).use("_info", "_filter", "_list", function (Y) {
    var _manager = new Y.ModuleManager();
    _manager.startAll();
});
