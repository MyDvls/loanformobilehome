<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request)
    {
        // Send email
        // Mail::to('arogyadhdl@gmail.com')->send(new ContactFormSubmitted($request->validated()));

        return redirect()->route('contact')->with('success', 'Your message has been sent successfully!');
    }
}
