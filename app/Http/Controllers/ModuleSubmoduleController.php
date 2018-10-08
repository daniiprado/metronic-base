<?php

namespace Logistic\Http\Controllers;

use Illuminate\Http\Request;
use Logistic\Http\Resources\SubmoduleResource;
use Logistic\Module;
use Logistic\Submodule;

class ModuleSubmoduleController extends ApiController
{
    public function index(Module $module)
    {
        return $this->collectionResponse(
          SubmoduleResource::collection( Submodule::query()->where('module_id', $module->id)->get() ),
          200
        );
    }
}
