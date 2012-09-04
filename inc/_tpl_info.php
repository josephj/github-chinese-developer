<!-- #tpl-info (start) -->
<script id="tpl-info" type="text/x-handlebars-template">
    <img src="http://www.gravatar.com/avatar/{{gravatar_id}}?s=240" width="240" height="240" alt="{{name}} 的照片" class="img-rounded">
    <h2>{{name}} ({{login}})</h2>
    <div class="info">
        <ul>
            <li>地區: {{location}}</li>
            <li>郵件: <a href="mailto:{{email}}" target="_blank">{{email}}</a></li>
            <li>部落格: <a href="{{blog}}" target="_blank">{{blog}}</a></li>
            <li>Gist 數量: <a href="http://gist.github.com/{{login}}" target="_blank">{{public_gists}}</a></li>
            <li>Repo 數量: <a href="http://github.com/{{login}}" target="_blank">{{public_repos}}</a></li>
            <li>Following 數量: <a href="http://github.com/{{login}}/following" target="_blank">{{following}}</a></li>
            <li>Follower 數量: <a href="http://github.com/{{login}}/follower" target="_blank">{{followers}}</a></li>
            <li>啟用時間: {{created_at}}</li>
        </ul>
    </div>
    <div class="followers">
{{#each followers}}
        <li>
            <img src="http://www.gravatar.com/avatar/{{gravatar_id}}?s=50">
        </li>
{{/each}}
    </div>
</script>
<!-- #tpl-info (end) -->
