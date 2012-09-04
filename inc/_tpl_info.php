<!-- #tpl-info (start) -->
<!--
 },
  "data": {
    "html_url": "https://github.com/ihower",
    "type": "User",
    "public_gists": 45,
    "followers": 332,
    "blog": "http://ihower.tw",
    "company": "",
    "following": 72,
    "location": "Hsinchu - Taipei, Taiwan",
    "created_at": "2008-04-03T18:24:17Z",
    "login": "ihower",
    "avatar_url": "https://secure.gravatar.com/avatar/c38fd9074fb072551c0ff80ccd90d24e?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
    "public_repos": 27,
    "name": "Wen-Tien Chang",
    "email": "ihower@gmail.com",
    "hireable": true,
    "url": "https://api.github.com/users/ihower",
    "gravatar_id": "c38fd9074fb072551c0ff80ccd90d24e",
    "id": 4557,
    "bio": "See [http://tw.linkedin.com/in/ihower](http://tw.linkedin.com/in/ihower)"
  }
-->
<script id="tpl-info" type="text/x-handlebars-template">
    <img src="http://www.gravatar.com/avatar/{{gravatar_id}}?s=240">
    <h2>{{name}} ({login})</h2>
    <div class="info">
        <ul>
            <li>地區: {{location}}</li>
            <li>郵件: {{email}}</li>
            <li>部落格: {{blog}}</li>
            <li>Gist 數量: {{public_gists}}</li>
            <li>Repo 數量: {{public_repos}}</li>
            <li>Following 數量: {{following}}</li>
            <li>Follower 數量: {{followers}}</li>
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
