<!-- #filter (start) -->
<div id="filter" class="navbar navbar-inverse">
    <div class="navbar-inner">
        <div class="container">
            <a class="brand" href="#">兩岸三地的 GitHub 開發者</a>
            <form method="get" class="form-inline">
                <span class="field">
                    <label class="control-label" for="location">地區：</label>
                    <select id="location" name="location">
                        <option value="China">中國大陸</option>
                        <option value="Taiwan">台灣</option>
                        <option value="Hong Kong">香港</option>
                        <option value="China,Taiwan,Hong Kong">兩岸三地</option>
                    </select>
                </span>
                <span class="field">
                    <label class="control-label" for="language">語言：</label>
                    <select id="language" name="language">
                        <option value="">全部</option>
                        <option>PHP</option>
                        <option>Ruby</option>
                        <option>Python</option>
                        <option>JavaScript</option>
                        <option>Perl</option>
                    </select>
                </span>
                <button type="submit" value="Find" class="btn btn-primary">Find</button>
            </form>
        </div>
    </div>
</div>
<!-- #filter (end) -->
