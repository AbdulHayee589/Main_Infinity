<?php

namespace App\Console\Commands;

use App\Models\Blueprint;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FreshBlueprints extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fresh-blueprints';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetches all blueprints from Printify';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('PRINTIFY_APIKEY'),
        ])->get('https://api.printify.com//v1/catalog/blueprints.json');

        if (!$response->successful()) {
            $this->error("Couldn't fetch blueprints from the server. Trying again in 1 hour.");
            return;
        }

        $blueprints = $response->json();
        foreach ($blueprints as $bp) {
            $dbbp = Blueprint::updateOrCreate([
                'bp_id' => $bp['id']
                ],
                [
                    'bp_id' => $bp['id'],
                    'title' => $bp['title'],
                    'description' => $bp['description'],
                    'brand' => $bp['brand'],
                    'model' => $bp['model'],
                    'images' => $bp['images'],
                ]);
            if (!$dbbp) {
                $this->error("Couldn't fetch Blueprint #" . $bp['id']);
                return;
            }

            $dbbp->save();
        }

        $this->info("Loaded ".count($blueprints)." blueprints.");
    }
}
