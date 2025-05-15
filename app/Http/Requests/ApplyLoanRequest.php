<?php

namespace App\Http\Requests;

use App\Http\Traits\ApiResponseTrait;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ApplyLoanRequest extends FormRequest
{
    use ApiResponseTrait;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Customer validation
            'customer.firstName' => 'required|string|max:255',
            'customer.middleName' => 'nullable|string|max:255',
            'customer.lastName' => 'required|string|max:255',
            'customer.generationCode' => 'nullable|string|in:customer.generationCode.ii,customer.generationCode.iii,customer.generationCode.iv,customer.generationCode.v,customer.generationCode.vi,customer.generationCode.vii,customer.generationCode.viii,customer.generationCode.ix,customer.generationCode.sr,customer.generationCode.jr,customer.generationCode.none',
            'customer.ssn' => 'required|string',
            'customer.driverLicense' => 'required|string',
            'customer.birthDate' => 'required|date',
            'customer.gender' => 'required|string|in:customer.gender.male,customer.gender.female,customer.gender.unknown',
            'customer.email' => 'required|email',
            'customer.customerType' => 'required|string|in:customer.type.individual',
            'customer.status' => 'required|string|in:Lead,Active',
            'customer.Phones' => 'required|array',
            'customer.Phones.results' => 'required|array|min:1',
            'customer.Phones.results.*.type' => 'required|string|in:customer.phoneType.cell,customer.phoneType.home',
            'customer.Phones.results.*.phone' => 'required|string',
            'customer.Phones.results.*.isPrimary' => 'required|in:0,1',
            'customer.Phones.results.*.isSecondary' => 'required|in:0,1',
            'customer.PrimaryAddress' => 'required|array',
            'customer.PrimaryAddress.address1' => 'required|string',
            'customer.PrimaryAddress.city' => 'required|string',
            'customer.PrimaryAddress.state' => 'required|string',
            'customer.PrimaryAddress.zipcode' => 'required|string',
            'customer.PrimaryAddress.country' => 'required|string|in:company.country.usa',
            'customer.MailAddress' => 'required|array',
            'customer.MailAddress.address1' => 'required|string',
            'customer.MailAddress.city' => 'required|string',
            'customer.MailAddress.state' => 'required|string',
            'customer.MailAddress.zipcode' => 'required|string',
            'customer.MailAddress.country' => 'required|string|in:company.country.usa',
            'customer.Employer' => 'required|array',
            'customer.Employer.companyName' => 'required|string',
            'customer.Employer.title' => 'required|string',
            'customer.Employer.hireDate' => 'required|date',
            'customer.Employer.income' => 'required|numeric|min:0',
            'customer.Employer.incomeFrequency' => 'required|string|in:customerEmployer.incomeFrequency.monthly,customerEmployer.incomeFrequency.weekly,customerEmployer.incomeFrequency.biWeekly,customerEmployer.incomeFrequency.semiMonthly,customerEmployer.incomeFrequency.annually',
            'customer.Employer.Address' => 'required|array',
            'customer.Employer.Address.address1' => 'nullable|string',
            'customer.Employer.Address.city' => 'nullable|string',
            'customer.Employer.Address.state' => 'nullable|string',
            'customer.Employer.Address.zipcode' => 'nullable|string',
            'customer.Employer.Address.country' => 'nullable|string|in:company.country.usa',

            // Loan validation
            'loan.displayId' => 'required|string',
            'loan.LoanSetup' => 'required|array',
            'loan.LoanSetup.loanAmount' => 'required|numeric|min:0',
            'loan.LoanSetup.loanRate' => 'required|numeric|min:0',
            'loan.LoanSetup.contractDate' => 'required|date',
            'loan.LoanSetup.loanClass' => 'required|string|in:loan.class.consumer',
            'loan.LoanSetup.loanType' => 'required|string|in:loan.type.installment',
            'loan.LoanSetup.firstPaymentDate' => 'required|date',
            'loan.Collateral' => 'required|array',
            'loan.Collateral.results' => 'nullable|array|min:1',
            'loan.Collateral.results.*.a' => 'nullable|string',
            'loan.Collateral.results.*.b' => 'nullable|string',
            'loan.Collateral.results.*.c' => 'nullable|string',
            'loan.Collateral.results.*.d' => 'nullable|string',
            'loan.Collateral.results.*.collateralType' => 'nullable|string|in:collateral.type.consumer',

            // Collateral custom fields validation
            'collateralCustomFields' => 'required|array',
            'collateralCustomFields.*.customFieldId' => 'required|integer',
            'collateralCustomFields.*.customFieldValue' => 'required|string',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @return void
     */
    protected function failedValidation(Validator $validator)
    {
        // Use your trait's method to construct the error response
        $response = $this->errorResponse('Validation error', $validator->errors()->toArray(), 422);

        throw new HttpResponseException($response);
    }
}
