<?php

namespace Logistic\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Logistic\Traits\ApiResponse;

class Authenticate extends Middleware
{
    use ApiResponse;

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        if ($request->ajax()) {
            return $this->errorResponse(__('validation.handler.unauthenticated'), 401);
        }
        return route('home');
    }
}
