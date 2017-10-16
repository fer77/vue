<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
            <div class="content">
              <div id="app">
                @if (session()->has('status'))
                <alert>{{ session('status') }}</alert>
                @endif
              </div>
                <div class="title m-b-md">
                    Laravel
                </div>
            </div>
        </div>

        <script src="/js/manifest.js"></script>
        <script src="/js/vendor.js"></script>
        <script src="/js/app.js"></script>
    </body>
</html>
