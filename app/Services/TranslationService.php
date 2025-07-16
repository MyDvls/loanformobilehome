<?php

namespace App\Services;

use Aws\Translate\TranslateClient;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslationService
{
    protected string $provider;

    public function __construct()
    {
        $this->provider = config('services.translation.provider', 'google');
    }

    public function translate(string $text, string $targetLanguage, string $sourceLanguage = 'en'): string
    {
        if ($targetLanguage === 'en') {
            return $text;
        }

        // Cache translations to avoid repeated API calls
        $cacheKey = "translation." . md5($text . $targetLanguage . $sourceLanguage . $this->provider);

        return Cache::rememberForever($cacheKey, function () use ($text, $targetLanguage, $sourceLanguage) {
            return $this->callTranslationApi($text, $targetLanguage, $sourceLanguage);
        });
    }

    private function callTranslationApi(string $text, string $targetLanguage, string $sourceLanguage): string
    {
        try {
            return match ($this->provider) {
                'amazon' => $this->callAmazonTranslate($text, $targetLanguage, $sourceLanguage),
                'google' => $this->callGoogleTranslate($text, $targetLanguage, $sourceLanguage),
                default => $this->callGoogleTranslate($text, $targetLanguage, $sourceLanguage),
            };
        } catch (Exception $e) {
            Log::error('Translation error: ' . $e->getMessage());
            return $text; // Fallback to original text if translation fails
        }
    }

    private function callGoogleTranslate(string $text, string $targetLanguage, string $sourceLanguage): string
    {
        $response = Http::post('https://translation.googleapis.com/language/translate/v2?key=' . config('services.google_translate.key'), [
            'q' => $text,
            'source' => $sourceLanguage,
            'target' => $targetLanguage,
            'format' => 'text', // optional, but recommended
        ]);
        if ($response->successful()) {
            return $response->json()['data']['translations'][0]['translatedText'];
        }

        // Fallback to original text if translation fails
        return $text;
    }

    private function callAmazonTranslate(string $text, string $targetLanguage, string $sourceLanguage): string
    {
        $client = new TranslateClient([
            'version' => 'latest',
            'region' => config('services.aws.region'),
            'credentials' => [
                'key' => config('services.aws.key'),
                'secret' => config('services.aws.secret'),
            ]
        ]);

        $result = $client->translateText([
            'Text' => $text,
            'SourceLanguageCode' => $sourceLanguage,
            'TargetLanguageCode' => $targetLanguage,
        ]);

        return $result['TranslatedText'] ?? $text;
    }

    public function translateArray(array $data, string $targetLanguage): array
    {
        $translated = [];

        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $translated[$key] = $this->translate($value, $targetLanguage);
            } elseif (is_array($value)) {
                $translated[$key] = $this->translateArray($value, $targetLanguage);
            } else {
                $translated[$key] = $value;
            }
        }

        return $translated;
    }
}
