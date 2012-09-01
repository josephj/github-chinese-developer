<?php
$location = (isset($_REQUEST["location"]) && $_REQUEST["location"] !== "") ? htmlspecialchars($_REQUEST["location"]) : "China";
$language = (isset($_REQUEST["language"]) && $_REQUEST["language"] !== "") ? htmlspecialchars($_REQUEST["language"]) : "JavaScript";
$locations = array(
    "China" => "中國大陸",
    "Taiwan" => "台灣",
    "Hong Kong" => "香港",
    "China,Taiwan" => "兩岸三地",
);
$languages = array("", "PHP", "Ruby", "Python", "JavaScript", "Perl");
?><!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<title>兩岸三地的 Github 開發者</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="josephj">
<link href="assets/stylesheets/bootstrap.min.css" rel="stylesheet">
<link href="assets/stylesheets/bootstrap-responsive.css" rel="stylesheet">
<link href="assets/stylesheets/demo.css" rel="stylesheet">
<script src="http://yui.yahooapis.com/3.6.0/build/yui/yui-min.js"></script>
<script src="assets/javascripts/demo.js"></script>
</head>

  <body>

    <div id="filter" class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <a class="brand" href="#">兩岸三地的 GitHub 開發者</a>
                <form method="get" class="form-inline">
                    <span class="field">
                        <label class="control-label" for="location">地區：</label>
                        <select id="location" name="location">
<?php
      foreach ($locations as $key=>$value) :
          $selected = ($key === $location) ? " selected": "";
?>
                            <option value="<?php echo $key; ?>" <?php echo $selected;?>><?php echo $value; ?></option>

<?php endforeach; ?>
                        </select>
                    </span>
                    <span class="field">
                        <label class="control-label" for="language">語言：</label>
                        <select id="language" name="language">
<?php
      foreach ($languages as $value) :
          $selected = ($value === $language) ? " selected": "";
?>
                            <option<?php echo $selected;?>><?php echo $value; ?></option>

<?php endforeach; ?>
                        </select>
                    </span>
                    <button type="submit" value="Find" class="btn btn-primary">Find</button>
                </form>
            </div>
        </div>
    </div>

    <div class="container">

        <!-- #filter (start) -->
        <div id="filter">
        </div>
        <!-- #filter (end) -->

        <!-- #list (start) -->
        <div id="list">
            <div class="bd">

            </div>
        </div>
        <!-- #list (end) -->

        <!-- #info (start) -->
        <div id="info">
            <div class="bd">
            </div>
        </div>
        <!-- #info (end) -->

        <!-- #tpl-user (start) -->
        <script id="tpl-user" type="text/x-handlebars-template">
            <li>
                <div class="user-card">
                    <div class="main">
                        <div class="name">
                            <a href="http://github.com/{{username}}" data-username="{{username}}" target="_blank" class="name-link">{{name}}</a>
                        </div>
                        <a href="http://github.com/{{username}}" data-username="{{username}}" target="_blank" class="img-link">
                            <img src="http://www.gravatar.com/avatar/{{gravatar_id}}?s=180">
                        </a>
                    </div>
                    <div class="info">
                        <span class="repos"><strong>{{repos}}</strong> repos / </span>
                        <span class="followers"><strong>{{followers}}</strong> followers</span>
                    </div>
                </div>
            </li>
        </script>
        <!-- #tpl-user (end) -->

    </div> <!-- /container -->

</body>
</html>
