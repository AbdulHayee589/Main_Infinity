<?php

namespace App\Console\Commands;

use App\Models\Provider;
use Exception;
use Illuminate\Console\Command;

class ExtractColors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:extract-colors';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $providers = Provider::all();
        $colors = [];

        if(count($providers) == 0) {
            $this->error("Please run 'app:fresh-blueprints' and 'app:fresh-providers' first.");
            return;
        }

        foreach($providers as $provider) {
            $variants = json_decode($provider->variants, true);
            foreach($variants['variants'] as $k => $variant) {
                try {
                    $color = $variant['options']['color'];
                } catch(Exception $ex) {
                    $color = 'unknown';
                }

                if(!array_search($color, $colors))
                    $colors[] = $color;
            }
        }

        $colorArray = [];
        foreach ($colors as $color) {
            $colorArray[$color] = "";
        }
        $jsonData = json_encode($colorArray, JSON_PRETTY_PRINT);
        $filePath = storage_path('colors.json');
        file_put_contents($filePath, $jsonData);


        dd(count($colors));
    }
}
