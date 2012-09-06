<?php
/**
 * Use this configuration file to make relationship
 * between modules and static (CSS/JavaScript) files.
 * You must also specify module dependencies here.
 *
 * The static_loader library will transform this configuration file
 * to an YUI config.
 */
$config = array();
//=================
// Seed
//=================
/**
 * The external CSS/JS seed URLs.
 */
$config["seed"] = array(
    "css" => "/combo/?g=css",
    "js"  => "/combo/?g=js",
);
//=================
// Base
//=================
/**
 * The basis configuration for YUI.
 */
$config["base"] = array(
    "filter"     => "raw",
    "combine"    => TRUE,
    "comboBase"  => "/combo/?f=",
    "comboSep"   => ",",
    "logExclude" => array(
        "Y.Module" => TRUE,
        "Y.ModuleManager" => TRUE,
    ),
    "root"       => "javascripts/yui3/build/",
    "langs"      => "en-US,zh-TW",
    "jsCallback" => "(new Y.ModuleManager()).startAll();",
);
//=================
// Groups
//=================
/**
 * Before setting this, you should understand the group attribute in YUI config.
 * * Reference: http://yuilibrary.com/yui/docs/api/classes/config.html#property_groups *
 * NOTE - We add a magic 'serverComboCSS' attribute.
 *        Set it to true if you want all belonging CSS files
 *        being combined and loaded with traditional link tag approach,
 *        instead of using dynamic scripting.
 */
$config["groups"] = array(
    // For miiiCasa customized libraries.
    "demo" => array(
        "combine"        => TRUE,
        "serverComboCSS" => TRUE, // Load CSS by combo.
        "root"           => "",
    ),
    "module" => array(
        "combine"        => TRUE,
        "serverComboCSS" => FALSE, // Load CSS on-the-fly.
        "root"           => "javascripts/module/",
    )
);
//=================
// Modules
//=================
/**
 * Individual module setting.
 * You should specify its belonging group, related CSS & JS files,
 * and dependent modules.
 */
$config["modules"] = array(
    "module" => array(
        "group" => "module",
        "js"    => "module.js",
        "requires" => array(
            "base", "node-base", "event-base",
            "module-manager",
        ),
    ),
    "module-manager" => array(
        "group" => "module",
        "js"    => "module-manager.js",
        "requires" => array(
            "base",
        ),
    ),
    "_filter" => array(
        "group" => "demo",
        "js"    => "javascripts/_filter.js",
        "css"   => "stylesheets/_filter.css",
        "requires" => array(
            "module", "node-base", "cookie",
        ),
    ),
    "_list" => array(
        "group" => "demo",
        "js"    => "javascripts/_list.js",
        "css"   => "stylesheets/_list.css",
        "requires" => array(
            "node-event-delegate", "module",
            "handlebars", "cache", "jsonp",
            "node-style", "node-screen", "event-resize",
            "module", "node-base", "cookie",
        ),
    ),
    "_info" => array(
        "group" => "demo",
        "js"    => "javascripts/_info.js",
        "css"   => "stylesheets/_info.css",
        "requires" => array(
            "module", "node-base", "handlebars",
        ),
    ),
);
return $config;
?>
