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
<html lang="en">
<head>
<meta charset="utf-8">
<title>GitHub Users</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="josephj">
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="assets/demo.css" rel="stylesheet">
<link href="bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<link rel="shortcut icon" href="../assets/ico/favicon.ico">
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
<link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
<script type="text/javascript" src="http://yui.yahooapis.com/3.6.0/build/yui/yui-min.js"></script>
<script src="assets/demo.js"></script>
</head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <a class="brand" href="#">兩岸三地的 GitHub 開發者</a>
            </div>
        </div>
    </div>

    <div class="container">

        <!-- #filter (start) -->
        <div id="filter">
            <div class="bd">
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
          $selected = ($key === $value) ? " selected": "";
?>
                            <option<?php echo $selected;?>><?php echo $value; ?></option>

<?php endforeach; ?>
                        </select>
                    </span>
                    <button type="submit" value="Find" class="btn btn-primary">Find</button>
                </form>
            </div>
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
