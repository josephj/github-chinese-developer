<!-- #tpl-user (start) -->
<script id="tpl-user" type="text/x-handlebars-template">
    <li id="{{element_id}}">
        <div class="user-card">
            <div class="main">
                <div class="name">
                    <a href="http://github.com/{{username}}" data-username="{{username}}" target="_blank" class="name-link">{{name}}</a>
                </div>
                <a href="http://github.com/{{username}}" data-username="{{username}}" target="_blank" class="img-link">
                    <img src="http://www.gravatar.com/avatar/{{gravatar_id}}?s=120">
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
