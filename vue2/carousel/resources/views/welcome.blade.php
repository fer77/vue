<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSS -->
        {{-- <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css"> --}}

        <title>Laravel</title>
    </head>
    <body>

        <div id="app">
            <carousel>
                <img src="https://placeimg.com/640/480/any">
                <img src="https://placeimg.com/640/480/any?2">
                <img src="https://placeimg.com/640/480/any?3">
                <img src="https://placeimg.com/640/480/any?4">
                <img src="https://placeimg.com/640/480/any?5">
            </carousel>

            <h2>Another Carousel</h2>

            <div style="width: 300px; height: 150px;">
                <carousel :autoplay="true">
                    <img src="https://placeimg.com/300/150/any">
                    <img src="https://placeimg.com/300/150/any?2">
                    <img src="https://placeimg.com/300/150/any?3">
                    <img src="https://placeimg.com/300/150/any?4">
                    <img src="https://placeimg.com/300/150/any?5">
                </carousel>
            </div>
        </div>

        <!-- JavaScript -->
        {{-- <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script> --}}

        <script src="/js/app.js"></script>
    </body>
</html>
