<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <!-- begin::Head -->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!--begin::Web font -->
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
        <script>
            WebFont.load({
                google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},
                active: function() {
                    sessionStorage.fonts = true;
                }
            });
        </script>
        <!--end::Web font -->
        <!-- Styles -->
        <!--begin::Global Theme Styles -->
        <link href="{{ asset('css/vendors.bundle.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('css/fonts.bundle.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('css/style.bundle.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('css/jquery-ui.bundle.css') }}" rel="stylesheet" type="text/css" />
        <!--end::Global Theme Styles -->
        <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}" />
    </head>
    <!-- end::Head -->
    <!-- begin::Body -->
    <body class="m-page--loading m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
        <!-- begin::Page loader -->
        <div class="m-page-loader m-page-loader--base">
            <div class="m-spinner m-spinner--brand"></div>
        </div>
        <!-- end::Page Loader -->


        <div id="app">
            <app></app>

            <quick-sidebar></quick-sidebar>

            <!-- end:: Page -->
        </div>

        <!--begin::Global Theme Bundle -->
            <script src="{{ asset('js/vendors.bundle.js') }}" ></script>
            <script src="{{ asset('js/jquery-ui.bundle.js') }}" defer></script>
            <script src="{{ asset('js/scripts.bundle.js') }}" defer></script>
            <script src="{{ mix('js/app.js') }}"></script>
        <!--end::Global Theme Bundle -->
        <!-- begin::Page Loader -->
        <script>
            $(window).on('load', function () {
                $('body').removeClass('m-page--loading');
            });
        </script>
        <!-- end::Page Loader -->
    </body>
</html>
