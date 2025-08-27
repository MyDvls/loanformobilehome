<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Customer;
use App\Models\CustomerPhone;

class SaveCustomerDetails implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $customerData;

    public function __construct(array $customerData)
    {
        $this->customerData = $customerData;
    }

    public function handle(): void
    {
        \Log::info('Saving Customer Details', $this->customerData);
        $customer = Customer::create([
            'first_name' => $this->customerData['firstName'],
            'middle_name' => $this->customerData['middleName'] ?? null,
            'last_name' => $this->customerData['lastName'],
            'birth_date' => $this->customerData['birthDate'] ?? null,
            'gender' => $this->customerData['gender'] ?? null,
            'email' => $this->customerData['email'],
            'customer_type' => $this->customerData['customerType'] ?? 'customer.type.individual',
            'status' => $this->customerData['status'] ?? 'Lead',
            'primary_address1' => $this->customerData['PrimaryAddress']['address1'] ?? null,
            'primary_city' => $this->customerData['PrimaryAddress']['city'] ?? null,
            'primary_state' => $this->customerData['PrimaryAddress']['state'] ?? null,
            'primary_zipcode' => $this->customerData['PrimaryAddress']['zipcode'] ?? null,
            'primary_country' => $this->customerData['PrimaryAddress']['country'] ?? null,
            'employer_company_name' => $this->customerData['Employer']['companyName'] ?? null,
            'employer_title' => $this->customerData['Employer']['title'] ?? null,
            'employer_hire_date' => $this->customerData['Employer']['hireDate'] ?? null,
            'employer_income' => $this->customerData['Employer']['income'] ?? null,
            'employer_income_frequency' => $this->customerData['Employer']['incomeFrequency'] ?? null,
            'primary_phone' => $this->customerData['Phones']['results'][0]['phone'] ?? null,
        ]);
    }
}
