<?php

namespace App\Http\Requests\Addresses;

use App\Models\ShippingBook;
use App\Models\User;
use Exception;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CreateAddress extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //TODO: REMOVE IN PRODUCTION
        return true;

//       $user = Auth::user();
//       if(!$user) return false;
//
//       return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'phone_number' => ['required', 'string'],
            'address' => ['required', 'string'],
            'city' => ['required', 'string'],
            'country' => ['required', 'string'],
            'zip_code' => ['required', 'string'],
            'is_company' => ['required', 'boolean'],
            'EIK' => ['required_if:is_company,true'],
            'DDS' => ['required_if:is_company,true'],
            'MOL' => ['required_if:is_company,true'],
        ];
    }

    protected function failedValidation(Validator|\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

    public function createAddy()
    {
        //TODO: REMOVE IN PRODUCTION
        $user = User::find(1);
        //$user = Auth::user();

        if(count($user->addresses) >= 5)
            return throw new Exception(trans("addresses.too_many_addresses"));

        $addy = ShippingBook::create([
            'first_name' => $this->input("first_name"),
            'last_name' => $this->input("last_name"),
            'phone_number' => $this->input("phone_number"),
            'address' => $this->input("address"),
            'city' => $this->input("city"),
            'country' => $this->input("country"),
            'zip_code' => $this->input("zip_code"),
            'is_company' => $this->input("is_company"),
            'EIK' => $this->input("EIK"),
            'DDS' => $this->input("DDS"),
            'MOL' => $this->input("MOL"),
            'user_id' => $user->id
        ]);

        if(!$addy)
            return throw new Exception(trans("addresses.creation_failed"));

        return response()->json($addy);
    }
}
