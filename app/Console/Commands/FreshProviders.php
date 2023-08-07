<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\MessageFormatter;
use GuzzleHttp\Middleware;
use GuzzleHttp\Promise\Utils;
use GuzzleHttp\Psr7\Request;
use Illuminate\Console\Command;
use App\Models\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use App\Models\Provider;
use Illuminate\Support\Facades\Log;
use Psr\Http\Message\ResponseInterface;

class FreshProviders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fresh-providers';

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
        $blueprints = Blueprint::all();
        $promises = [];
        $totalReq = 0;
        $sentRequests = 0;

        $this->info("Starting at: ". Carbon::now());

        if(count($blueprints) == 0) {
            $this->error("Please run app:fresh-blueprints first");
            return;
        }

        foreach ($blueprints as $bp) {
            $providers = $bp->fetchProviders();
            $sentRequests++;

            foreach ($providers as $p) {
                $promise = Http::withHeaders([
                    'Authorization' => 'Bearer ' . env('PRINTIFY_APIKEY'),
                ])->async()->get('https://api.printify.com/v1/catalog/blueprints/' . $bp->bp_id . '/print_providers/' . $p['id'] . '/variants.json');
                $sentRequests++;

                $promises[] = $promise->then(function ($response) use ($bp, $p, $sentRequests, $totalReq) {
                    if ($response->successful()) {
                        $variants = $response->json();
                        $provider = Provider::updateOrCreate([
                            'blueprint_id' => $bp->id,
                            'internal_id' => $p['id'],
                            'title' => $p['title'],
                            'variants' => json_encode($variants),
                        ]);

                        if (!$provider) {
                            $this->error("Couldn't fetch Provider #" . $p['id']);
                        } else {
                            $this->info("Currently at request: ".$sentRequests + $totalReq);
                            $provider->save();
                        }
                    } else {
                        $this->error("API request failed for Provider #" . $p['id']);
                    }
                },

                function($error) use ($p) {
                    $this->error("API request failed for Provider #" . $p['id']);
                });
            }

            if($sentRequests > 300) {
                $totalReq += $sentRequests;
                $sentRequests = 0;
                $this->info("Reached rate limit. Waiting 40 sec.");
                sleep(40);
            }

            Utils::unwrap($promises);
        }

        $this->info("Finished at: ". Carbon::now());
        $this->info("Fetched " . $sentRequests + $totalReq . " providers.");
    }
}
