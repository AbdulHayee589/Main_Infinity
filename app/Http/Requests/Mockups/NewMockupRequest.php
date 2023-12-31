<?php

namespace App\Http\Requests\Mockups;

use App\Models\Mockup;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class NewMockupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        if(!$user) return false;

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['string', 'required', 'min:6'],
            'description' => ['string'],
            'print_provider_id' => ['required'],
            'print_areas' => ['array', 'required'],
            'blueprint_id' => ['required', 'exists:blueprints,bp_id'],
            'variant_id' => ['required'],
            'isShared' => ['required', 'boolean']
        ];
    }

    public function createMockup()
    {
        $this->ensureIsNotRateLimited();

        $mockup = Mockup::create([
            "title" => $this->input('title'),
            "description" => $this->input("description"),
            "pp_id" => $this->input('print_provider_id'),
            "bp_id" => $this->input('blueprint_id'),
            "v_id" => $this->input('variant_id'),
            "user_id" => $user->id,
            "print_areas" => $this->input('print_areas'),
            "isShared" => $this->input('isShared')
        ]);

        $mockup->save();
        RateLimiter::hit($this->throttleKey());

        return $mockup;
    }

    protected function failedValidation(Validator|\Illuminate\Contracts\Validation\Validator $validator)
    {
        RateLimiter::hit($this->throttleKey());
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

    public function ensureIsNotRateLimited()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 200)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey()
    {
        return Str::transliterate(Str::lower($this->input('email')) . '|' . $this->ip());
    }


}
