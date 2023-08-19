<?php

namespace App\Http\Requests\Orders;

use App\Models\Blueprint;
use App\Models\Order;
use App\Models\Provider;
use App\Models\ShippingBook;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

//TODO FINISH THIS
class CreateOrder extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
//        $user = Auth::user();
//        if(!$user) return false;
//
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
            'blueprint_id' => ['required', 'exists:blueprints,bp_id'],
            'provider_id' => ['required', 'exists:providers,internal_id'],
            'variant_id' => ['required', 'numeric'],
            'shipping_id' => ['required', 'exists:address_books,id'],
            'billing_id' => ['required', 'exists:address_books,id'],
            'print_areas' => ['array', 'required'],
            'quantity' => ['required', 'numeric']
        ];
    }

    public function makeOrder()
    {
        $this->ensureIsNotRateLimited();
        $user = Auth::user();

        $shippingAddy = ShippingBook::where('id', $this->input("shipping_id"))->where("user_id", 1)->first();
        $billingAddy = ShippingBook::where('id', $this->input("billing_id"))->where("user_id", 1)->first();

        if(!$shippingAddy || !$billingAddy)
            throw ValidationException::withMessages([
                'error' => trans('orders.failed'),
            ]);

        $bp = Blueprint::where("bp_id", $this->input('blueprint_id'))->first();
        if(!$bp->isActive)
            throw ValidationException::withMessages([
                'error' => trans('orders.failed'),
            ]);

        $provider = Provider::where("internal_id", $this->input('provider_id'))->where("blueprint_id", $bp->id)->first();
        $variant = $provider->variant($this->input('variant_id'));

        if(!$provider || !$variant)
            throw ValidationException::withMessages([
                'error' => trans('orders.failed'),
            ]);

        $order = Order::create([
            'user_id' => 1,
            'bp_id' => $bp->bp_id,
            'provider_id' => $provider->id,
            'variant_id' => $variant['id'],
            'print_areas' => $this->input('print_areas'),
            'print_details' => $this->input('print_details'),
            'shipping_id' => $shippingAddy->id,
            'billing_id' => $billingAddy->id,
        ]);

        RateLimiter::hit($this->throttleKey());
        return $order;
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
