<?php
namespace dowlatow\assets;


use yii\web\AssetBundle;
use yii\web\JqueryAsset;

class WidgetGeneratorAsset extends AssetBundle
{
    public $js = [
        'js' . DIRECTORY_SEPARATOR . 'widget-generator.js',
    ];

    public function init()
    {
        parent::init();
        $this->sourcePath = __DIR__ . DIRECTORY_SEPARATOR . 'source';
        $this->depends[]  = JqueryAsset::className();
    }
}