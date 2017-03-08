<!doctype html>
<html ng-app="app" ng-strict-di>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="img/icon.png" type="image/png">

    <title>Doremi</title>
    <base href="/">

    <meta name="theme-color" content="#0690B7">

    <link rel="manifest" href="manifest.json">

    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->
    
    <!-- For Material Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://material.angularjs.org/latest/angular-material.min.css" rel="stylesheet">
    
    <style><?php require(public_path("css/critical.css")) ?></style>

</head>
<body>

    <app-shell>
        <div id="app-shell-header">
            <!-- <img src="img/d.png" width="41" height="41"> -->
        </div>
        <div id="app-shell-content"></div>
    </app-shell>


    <app-root></app-root>


    <script>
    (function(){
        var link = document.createElement("link");
        link.href = "{!! elixir('css/final.css') !!}";
        link.type = "text/css";
        link.rel = "stylesheet";
        document.body.appendChild(link);
    })();
    </script>

    <script src="{!! elixir('js/final.js') !!}" async></script>

</body>
</html>
