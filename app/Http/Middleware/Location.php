<?php

namespace Logistic\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;

class Location
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $lang = Cookie::get('lang');
        $timezone = Cookie::get('timezone');
        $locale = isset( $lang ) ? $lang : 'es';
        $time = isset( $timezone ) ? $timezone : 'America/Bogota';
        Config::set('app.timezone', $time);
        app()->setLocale( $locale );
        return $next($request);
    }
}
