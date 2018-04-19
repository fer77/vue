<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSS -->
        <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">

        <title>Laravel</title>
    </head>
    <body>

        <carousel>
            <img src="https://placeimg.com/640/480/any">
            <img src="https://placeimg.com/640/480/any?2">
            <img src="https://placeimg.com/640/480/any?3">
            <img src="https://placeimg.com/640/480/any?4">
            <img src="https://placeimg.com/640/480/any?5">
        </carousel>

        {{-- <div class="main-carousel" data-flickity='{ "cellAlign": "left", "contain": true, "wrapAround": true }'>
            
        </div> --}}

        <!-- JavaScript -->
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
    </body>
</html>
