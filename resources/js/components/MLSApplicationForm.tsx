import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Libraries, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

// Define the Yup schema for validation
const formSchema = Yup.object({
    // Application State Selection
    applicationState: Yup.string().required('Please select a state where you want to apply for a mortgage'),

    // Personal Information
    firstName: Yup.string().required('First name is required').max(50, 'First name cannot exceed 50 characters'),
    middleName: Yup.string().optional(),
    lastName: Yup.string().required('Last name is required').max(50, 'Last name cannot exceed 50 characters'),
    generationCode: Yup.string().optional(),
    ssn: Yup.string()
        .required('SSN is required')
        .test('valid-ssn', 'SSN must be 9 digits (dashes optional)', (value) => {
            if (!value) return false;
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length !== 9) return false;
            // If dashes are present, they must be in ###-##-#### format
            if (value.includes('-')) {
                return /^\d{3}-\d{2}-\d{4}$/.test(value);
            }
            // Otherwise must be exactly 9 digits
            return /^\d{9}$/.test(value);
        }),
    driverLicense: Yup.string().required('Driver license is required').max(20, 'Driver license cannot exceed 20 characters'),
    dateOfBirth: Yup.string()
        .required('Date of birth is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
        .test('is-18', 'You must be at least 18 years old', (value) => {
            if (!value) return false;
            const dob = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            return dob <= today && age >= 18;
        }),
    gender: Yup.string().required('Gender is required'),

    // Contact Information
    email: Yup.string().required('Email is required').email('Invalid email address'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required').max(100, 'Address cannot exceed 100 characters'),
    city: Yup.string().required('City is required').max(50, 'City cannot exceed 50 characters'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
        .required('Zip code is required')
        .matches(/^\d{5}(-\d{4})?$/, 'Zip code must be 5 digits or 5+4 digits'),

    // Employment Information
    companyName: Yup.string().required('Company name is required').max(100, 'Company name cannot exceed 100 characters'),
    title: Yup.string().required('Title is required').max(50, 'Title cannot exceed 50 characters'),
    hireDate: Yup.string()
        .required('Hire date is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
        .test('not-future', 'Hire date cannot be in the future', (value) => {
            if (!value) return false;
            const hire = new Date(value);
            const today = new Date();
            return hire <= today;
        }),
    income: Yup.string()
        .required('Income is required')
        .matches(/^\d+(\.\d{1,2})?$/, 'Income must be a valid number')
        .test('positive', 'Income must be greater than 0', (value) => parseFloat(value) > 0),
    incomeFrequency: Yup.string().required('Income frequency is required'),
    empAddress: Yup.string().optional(),
    empCity: Yup.string().optional(),
    empState: Yup.string().optional(),
    empZipCode: Yup.string().optional(),

    // Collateral Information
    collateralAddress: Yup.string().optional(),
    collateralLotNumber: Yup.string()
        .optional()
        .test('valid-number', 'Lot number must be numeric', (value) => {
            if (!value || value === '') return true;
            return /^\d+$/.test(value);
        }),
    collateralCity: Yup.string().optional(),
    collateralState: Yup.string().optional(),
    collateralZipCode: Yup.string().optional(),
    collateralVin: Yup.string().optional(),
    collateralYear: Yup.string()
        .optional()
        .test('valid-year', 'Year must be a valid 4-digit number', (value) => {
            if (!value) return true;
            return /^\d{4}$/.test(value);
        }),
    collateralManufacturerName: Yup.string().optional(),
    collateralLength: Yup.string()
        .optional()
        .test('valid-number', 'Length must be a valid number', (value) => {
            if (!value || value === '') return true;
            return /^\d+(\.\d{1,2})?$/.test(value);
        }),
    collateralWidth: Yup.string()
        .optional()
        .test('valid-number', 'Width must be a valid number', (value) => {
            if (!value || value === '') return true;
            return /^\d+(\.\d{1,2})?$/.test(value);
        }),
    collateralLotRent: Yup.string()
        .optional()
        .test('valid-number', 'Lot rent must be a valid number', (value) => {
            if (!value || value === '') return true;
            return /^\d+(\.\d{1,2})?$/.test(value);
        }),

    // Additional fields
    vaLoanEligibleYes: Yup.boolean(),
    vaLoanEligibleNo: Yup.boolean(),
    workingWithRealtorYes: Yup.boolean(),
    workingWithRealtorNo: Yup.boolean(),

    termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    backgroundCheckAccepted: Yup.boolean().oneOf([true], 'You must accept the background check'),
    shareReport: Yup.boolean().oneOf([true], 'You must accept the sharing of report'),
    messageAccepted: Yup.boolean().oneOf([true], 'You must accept to receive messages'),
});

const states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
];

// Component for Google Places Autocomplete using @react-google-maps/api
const PlacesAutocompleteField = ({ onPlaceSelect, placeholder, value, onChange, ...props }) => {
    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autoC) => {
        setAutocomplete(autoC);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
                onPlaceSelect(place);
            }
        }
    };

    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
                types: ['address'],
                componentRestrictions: { country: 'us' },
            }}
        >
            <Input {...props} value={value} onChange={onChange} placeholder={placeholder} />
        </Autocomplete>
    );
};

const libraries: Libraries = ['places'];

const MLSApplicationForm = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showStateModal, setShowStateModal] = useState(false);
    const [selectedStateName, setSelectedStateName] = useState('');
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const { toast } = useToast();

    // Load Google Places API using @react-google-maps/api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries,
    });

    useEffect(() => {
        if (!isSubmitted) return;
        const timer = setTimeout(() => {
            window.location.href = 'https://manufacturedmls.com';
        }, 30000);
        return () => clearTimeout(timer);
    }, [isSubmitted]);

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            applicationState: '',
            firstName: '',
            middleName: '',
            lastName: '',
            generationCode: '',
            ssn: '',
            driverLicense: '',
            dateOfBirth: '',
            gender: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            companyName: '',
            title: '',
            hireDate: '',
            income: '',
            incomeFrequency: '',
            empAddress: '',
            empCity: '',
            empState: '',
            empZipCode: '',
            collateralAddress: '',
            collateralLotNumber: '',
            collateralCity: '',
            collateralState: '',
            collateralZipCode: '',
            collateralVin: '',
            collateralYear: '',
            collateralManufacturerName: '',
            collateralLength: '',
            collateralWidth: '',
            collateralLotRent: '',
            vaLoanEligibleYes: false,
            vaLoanEligibleNo: false,
            workingWithRealtorYes: false,
            workingWithRealtorNo: false,
            termsAccepted: false,
            backgroundCheckAccepted: false,
            shareReport: false,
            messageAccepted: false,
        },
    });

    // Auto-detect user's state based on IP address
    useEffect(() => {
        const detectUserLocation = async () => {
            setIsDetectingLocation(true);
            try {
                const response = await axios.get('/api/geolocation');
                if (response.data.success && response.data.state) {
                    // Auto-select the detected state
                    form.setValue('applicationState', response.data.state);
                    toast({
                        title: 'Location Detected',
                        description: `We've automatically selected ${response.data.state} based on your location.`,
                    });
                }
            } catch (error) {
                console.log('Could not detect location:', error);
                // Silently fail - user can still manually select state
            } finally {
                setIsDetectingLocation(false);
            }
        };

        // Only detect location when component first loads and no state is selected
        if (!form.getValues('applicationState')) {
            detectUserLocation();
        }
    }, [form, toast]);

    // Helper function to extract address components
    const extractAddressComponents = (place) => {
        const components = place.address_components || [];
        const result = {
            address: place.formatted_address || '',
            street1: '',
            city: '',
            state: '',
            zipCode: '',
        };

        components.forEach((component) => {
            const types = component.types;
            if (types.includes('street_number')) {
                result.street1 = component.long_name;
            } else if (types.includes('route')) {
                result.street1 = result.street1 ? `${result.street1} ${component.long_name}` : component.long_name;
            } else if (types.includes('locality')) {
                result.city = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
                result.state = component.long_name;
            } else if (types.includes('postal_code')) {
                result.zipCode = component.long_name;
            }
        });

        return result;
    };

    // Handlers for different autocomplete fields
    const handleAddressSelect = (place) => {
        const addressData = extractAddressComponents(place);
        form.setValue('address', addressData.address);
        form.setValue('city', addressData.city);
        form.setValue('state', addressData.state);
        form.setValue('zipCode', addressData.zipCode);
    };

    const handleEmpAddressSelect = (place) => {
        const addressData = extractAddressComponents(place);
        form.setValue('empAddress', addressData.address);
        form.setValue('empCity', addressData.city);
        form.setValue('empState', addressData.state);
        form.setValue('empZipCode', addressData.zipCode);
    };

    const handleCollateralAddressSelect = (place) => {
        const addressData = extractAddressComponents(place);
        form.setValue('collateralAddress', addressData.address);
        form.setValue('collateralCity', addressData.city);
        form.setValue('collateralState', addressData.state);
        form.setValue('collateralZipCode', addressData.zipCode);
    };

    const renderThankYouPage = () => {
        return (
            <div className="mx-auto max-w-3xl space-y-8 text-center">
                <div className="space-y-4">
                    <img src="/images/thank-you.svg" alt="Brand logo" className="mx-auto h-40 w-auto" />
                    <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                        Thank you for submitting an application for your mobile home! We will be in touch with you shortly. Please feel free to browse
                        to search for homes and valuations.
                    </p>
                </div>

                <div className="flex gap-x-2">
                    {/* ManufacturedMLS Card */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-[#57B8A6]/30 dark:bg-[#0A2A22]">
                        <h3 className="text-md mb-2 font-semibold text-[#57B8A6] dark:text-[#57B8A6]">Find Mobile Home Valuations and Listings</h3>
                        <p className="mb-4 text-sm text-black dark:text-white">Find mobile home valuations and listings at manufacturedmls.com</p>
                        <a
                            href="https://manufacturedmls.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-lg bg-[#57B8A6] px-6 py-3 font-medium text-white transition-colors hover:bg-[#4CAE9B] dark:bg-[#57B8A6] dark:hover:bg-[#4CAE9B]"
                        >
                            Visit ManufacturedMLS.com
                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Loan For Mobile Home Card */}
                    <div className="rounded-lg border border-purple-200 bg-purple-50 p-6 dark:border-[#49274A]/50 dark:bg-[#1A0D1A]">
                        <h3 className="text-md mb-2 font-semibold text-purple-800 dark:text-[#D0A9D0]">Learn More About Our Services</h3>
                        <p className="mb-4 text-sm text-black dark:text-white">Learn more about Mobile Fund Services at loanformobilehome.com</p>
                        <a
                            href="https://loanformobilehome.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-lg bg-[#49274A] px-6 py-3 font-medium text-white transition-colors hover:bg-[#3A1F3A] dark:bg-[#5B3D5C] dark:hover:bg-[#4A2E4B]"
                        >
                            Visit LoanForMobileHome.com
                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="space-y-6">
                        <h2 className="text-center text-2xl font-semibold">Select Application State</h2>
                        <p className="mb-6 text-center text-gray-600">Please select the state where you want to apply for a mobile home mortgage.</p>

                        {isDetectingLocation && (
                            <div className="mb-4 flex items-center justify-center space-x-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm text-gray-600">Detecting your location...</span>
                            </div>
                        )}

                        <div className="mx-auto max-w-md">
                            <FormField
                                control={form.control}
                                name="applicationState"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center justify-center">
                                            State <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger disabled={isDetectingLocation}>
                                                    <SelectValue placeholder={isDetectingLocation ? 'Detecting location...' : 'Select a state'} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {states.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">{t('apply.form.step1.title')}</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center">
                                            {t('apply.form.step1.firstName')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step1.middleName')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step1.lastName')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                translate="no"
                                className="notranslate"
                                control={form.control}
                                name="generationCode"
                                render={({ field }) => (
                                    <FormItem translate="no" className="notranslate">
                                        <FormLabel translate="no" className="notranslate">
                                            {t('apply.form.step1.generationCode')}
                                        </FormLabel>
                                        <Select
                                            translate="no"
                                            className="notranslate"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value || 'customer.generationCode.none'}
                                        >
                                            <SelectTrigger translate="no" className="notranslate">
                                                <SelectValue placeholder={t('apply.form.step1.selectGeneration')} />
                                            </SelectTrigger>
                                            <SelectContent translate="no" className="notranslate">
                                                <SelectItem value="customer.generationCode.none">{t('apply.form.step1.generation.none')}</SelectItem>
                                                <SelectItem value="customer.generationCode.jr">{t('apply.form.step1.generation.jr')}</SelectItem>
                                                <SelectItem value="customer.generationCode.sr">{t('apply.form.step1.generation.sr')}</SelectItem>
                                                <SelectItem value="customer.generationCode.ii">{t('apply.form.step1.generation.ii')}</SelectItem>
                                                <SelectItem value="customer.generationCode.iii">{t('apply.form.step1.generation.iii')}</SelectItem>
                                                <SelectItem value="customer.generationCode.iv">{t('apply.form.step1.generation.iv')}</SelectItem>
                                                <SelectItem value="customer.generationCode.v">{t('apply.form.step1.generation.v')}</SelectItem>
                                                <SelectItem value="customer.generationCode.vi">{t('apply.form.step1.generation.vi')}</SelectItem>
                                                <SelectItem value="customer.generationCode.vii">{t('apply.form.step1.generation.vii')}</SelectItem>
                                                <SelectItem value="customer.generationCode.viii">{t('apply.form.step1.generation.viii')}</SelectItem>
                                                <SelectItem value="customer.generationCode.ix">{t('apply.form.step1.generation.ix')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ssn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step1.ssn')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="XXX-XX-XXXX"
                                                inputMode="numeric"
                                                maxLength={field.value?.includes('-') ? 11 : 9}
                                                onChange={(e) => {
                                                    // Allow only digits and dashes while typing
                                                    const val = e.target.value.replace(/[^\d-]/g, '');
                                                    const maxLen = val.includes('-') ? 11 : 9;
                                                    field.onChange(val.slice(0, maxLen));
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="driverLicense"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step1.driverLicense')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step1.dateOfBirth')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="date" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step1.gender')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="customer.gender.female" id="female" />
                                                <Label htmlFor="female">{t('apply.form.step1.gender.female')}</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="customer.gender.male" id="male" />
                                                <Label htmlFor="male">{t('apply.form.step1.gender.male')}</Label>
                                            </div>
                                        </RadioGroup>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">{t('apply.form.step2.title')}</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step2.address')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            {isLoaded && !loadError ? (
                                                <PlacesAutocompleteField
                                                    {...field}
                                                    onPlaceSelect={handleAddressSelect}
                                                    placeholder="Start typing your address..."
                                                />
                                            ) : (
                                                <Input {...field} placeholder="Loading autocomplete..." disabled={!isLoaded} />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step2.city')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                translate="no"
                                className="notranslate"
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem translate="no" className="notranslate">
                                        <FormLabel translate="no" className="notranslate">
                                            {t('apply.form.step2.state')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <Select translate="no" className="notranslate" onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger translate="no" className="notranslate">
                                                <SelectValue placeholder={t('apply.form.step2.selectState')} />
                                            </SelectTrigger>
                                            <SelectContent translate="no" className="notranslate">
                                                {states.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step2.zipCode')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step2.phone')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="tel" placeholder="1234567890" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step2.email')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">{t('apply.form.step3.title')}</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step3.companyName')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step3.personalTitle')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hireDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step3.hireDate')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="date" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="income"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('apply.form.step3.income')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" step="0.01" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                translate="no"
                                className="notranslate"
                                control={form.control}
                                name="incomeFrequency"
                                render={({ field }) => (
                                    <FormItem translate="no" className="notranslate">
                                        <FormLabel translate="no" className="notranslate">
                                            {t('apply.form.step3.incomeFrequency')} <span className="ml-1 text-red-500">*</span>
                                        </FormLabel>
                                        <Select translate="no" className="notranslate" onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger translate="no" className="notranslate">
                                                <SelectValue placeholder={t('apply.form.step3.selectFrequency')} />
                                            </SelectTrigger>
                                            <SelectContent translate="no" className="notranslate">
                                                <SelectItem value="customerEmployer.incomeFrequency.weekly">
                                                    {t('apply.form.step3.frequency.weekly')}
                                                </SelectItem>
                                                <SelectItem value="customerEmployer.incomeFrequency.biWeekly">
                                                    {t('apply.form.step3.frequency.biWeekly')}
                                                </SelectItem>
                                                <SelectItem value="customerEmployer.incomeFrequency.monthly">
                                                    {t('apply.form.step3.frequency.monthly')}
                                                </SelectItem>
                                                <SelectItem value="customerEmployer.incomeFrequency.annually">
                                                    {t('apply.form.step3.frequency.annually')}
                                                </SelectItem>
                                                <SelectItem value="customerEmployer.incomeFrequency.semiMonthly">
                                                    {t('apply.form.step3.frequency.semiMonthly')}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="empAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step3.empAddress')}</FormLabel>
                                        <FormControl>
                                            {isLoaded && !loadError ? (
                                                <PlacesAutocompleteField
                                                    {...field}
                                                    onPlaceSelect={handleEmpAddressSelect}
                                                    placeholder="Start typing company address..."
                                                />
                                            ) : (
                                                <Input {...field} placeholder="Loading autocomplete..." disabled={!isLoaded} />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="empCity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step3.empCity')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                translate="no"
                                className="notranslate"
                                control={form.control}
                                name="empState"
                                render={({ field }) => (
                                    <FormItem translate="no" className="notranslate">
                                        <FormLabel translate="no" className="notranslate">
                                            {t('apply.form.step3.empState')}
                                        </FormLabel>
                                        <Select translate="no" className="notranslate" onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger translate="no" className="notranslate">
                                                <SelectValue placeholder={t('apply.form.step3.selectState')} />
                                            </SelectTrigger>
                                            <SelectContent translate="no" className="notranslate">
                                                {states.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="empZipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step3.empZipCode')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">{t('apply.form.step4.title')}</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="collateralAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralAddress')}</FormLabel>
                                        <FormControl>
                                            {isLoaded && !loadError ? (
                                                <PlacesAutocompleteField
                                                    {...field}
                                                    onPlaceSelect={handleCollateralAddressSelect}
                                                    placeholder="Start typing mobile home address..."
                                                />
                                            ) : (
                                                <Input {...field} placeholder="Loading autocomplete..." disabled={!isLoaded} />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collateralLotNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralLotNumber')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collateralCity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralCity')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                translate="no"
                                className="notranslate"
                                control={form.control}
                                name="collateralState"
                                render={({ field }) => (
                                    <FormItem translate="no" className="notranslate">
                                        <FormLabel translate="no" className="notranslate">
                                            {t('apply.form.step4.collateralState')}
                                        </FormLabel>
                                        <Select translate="no" className="notranslate" onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger translate="no" className="notranslate">
                                                <SelectValue placeholder={t('apply.form.step4.selectState')} />
                                            </SelectTrigger>
                                            <SelectContent translate="no" className="notranslate">
                                                {states.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collateralZipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralZipCode')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collateralVin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralVin')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collateralYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralYear')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collateralManufacturerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralManufacturerName')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="collateralLotRent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('apply.form.step4.collateralLotRent')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Mobile Home Dimensions Section */}
                        <div className="mt-6">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Mobile Home Dimensions</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="collateralLength"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('apply.form.step4.collateralLength')} (in ft)</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., 60" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="collateralWidth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('apply.form.step4.collateralWidth')} (in ft)</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., 14" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"></div>

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <h3 className="font-medium">Are you (or your spouse) eligible for a VA home loan?</h3>
                                <FormField
                                    control={form.control}
                                    name="vaLoanEligibleYes"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            form.setValue('vaLoanEligibleNo', false);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Yes</FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="vaLoanEligibleNo"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            form.setValue('vaLoanEligibleYes', false);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>No</FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-medium">Are you currently working with a realtor or sales agent?</h3>
                                <FormField
                                    control={form.control}
                                    name="workingWithRealtorYes"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            form.setValue('workingWithRealtorNo', false);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Yes</FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="workingWithRealtorNo"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            form.setValue('workingWithRealtorYes', false);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>No</FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="termsAccepted"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>{t('apply.form.step4.termsAccepted')}</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="backgroundCheckAccepted"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>{t('apply.form.step4.backgroundCheckAccepted')}</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shareReport"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>{t('apply.form.step4.shareReport')}</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="messageAccepted"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>{t('apply.form.step4.messageAccepted')}</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        toast({
            title: 'Please wait',
            description: 'This can take some time',
        });

        const payload = {
            customer: {
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                generationCode: data.generationCode === 'customer.generationCode.none' ? '' : data.generationCode,
                ssn: data.ssn,
                driverLicense: data.driverLicense,
                birthDate: data.dateOfBirth,
                gender: data.gender,
                email: data.email,
                customerType: 'customer.type.individual',
                status: 'Lead',
                Phones: {
                    results: [
                        {
                            type: 'customer.phoneType.cell',
                            phone: data.phone,
                            isPrimary: '1',
                            isSecondary: '0',
                        },
                    ],
                },
                PrimaryAddress: {
                    address1: data.address,
                    city: data.city,
                    state: `geo.state.${data.state.slice(0, 2).toUpperCase()}`,
                    zipcode: data.zipCode,
                    country: 'company.country.usa',
                },
                MailAddress: {
                    address1: data.address,
                    city: data.city,
                    state: `geo.state.${data.state.slice(0, 2).toUpperCase()}`,
                    zipcode: data.zipCode,
                    country: 'company.country.usa',
                },
                Employer: {
                    companyName: data.companyName,
                    title: data.title,
                    hireDate: data.hireDate,
                    income: parseFloat(data.income),
                    incomeFrequency: data.incomeFrequency,
                    Address: {
                        address1: data.empAddress,
                        city: data.empCity,
                        state: data.empState ? `geo.state.${data.empState.slice(0, 2).toUpperCase()}` : '',
                        zipcode: data.empZipCode,
                        country: 'company.country.usa',
                    },
                },
            },
            loan: {
                displayId: `MMLS Application - ${Date.now()}`,
                LoanSetup: {
                    loanAmount: '0.00',
                    loanRate: '0.00',
                    contractDate: '2025-01-01',
                    loanClass: 'loan.class.consumer',
                    loanType: 'loan.type.installment',
                    firstPaymentDate: '2025-01-01',
                },
                Collateral: {
                    results: [
                        {
                            a: data.collateralAddress,
                            b: data.collateralCity,
                            c: data.collateralState,
                            d: data.collateralZipCode,
                            collateralType: 'collateral.type.consumer',
                        },
                    ],
                },
            },
            collateralCustomFields: [
                {
                    customFieldId: 9,
                    customFieldValue: data.collateralYear,
                },
                {
                    customFieldId: 10,
                    customFieldValue: data.collateralVin,
                },
                {
                    customFieldId: 11,
                    customFieldValue: data.collateralManufacturerName,
                },
                {
                    customFieldId: 21,
                    customFieldValue: data.collateralLength,
                },
                {
                    customFieldId: 22,
                    customFieldValue: data.collateralWidth,
                },
                {
                    customFieldId: 20,
                    customFieldValue: data.collateralLotRent,
                },
                {
                    customFieldId: 23,
                    customFieldValue: data.vaLoanEligibleYes ? true : data.vaLoanEligibleNo ? false : false,
                },
                {
                    customFieldId: 24,
                    customFieldValue: data.workingWithRealtorYes ? true : data.workingWithRealtorNo ? false : false,
                },
                {
                    customFieldId: 25,
                    customFieldValue: data.termsAccepted,
                },
                {
                    customFieldId: 26,
                    customFieldValue: data.backgroundCheckAccepted,
                },
                {
                    customFieldId: 27,
                    customFieldValue: data.shareReport,
                },
                {
                    customFieldId: 28,
                    customFieldValue: data.messageAccepted,
                },
                {
                    customFieldId: 29,
                    customFieldValue: data.collateralLotNumber,
                },
            ],
        };

        try {
            const response = await axios.post('/apply', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            toast({
                title: t('apply.form.submitSuccess'),
                description: t('apply.form.submitSuccessDescription'),
            });
            console.log('Success:', response.data);
            setIsSubmitted(true);
        } catch (error) {
            toast({
                title: t('apply.form.submitError'),
                description: error.message,
            });
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show thank you page if form was successfully submitted
    if (isSubmitted) {
        return renderThankYouPage();
    }

    return (
        <>
            <h1 className="transform-thanks pb-10 text-center text-3xl font-bold text-gray-900 dark:text-white">Application Form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="mb-8">
                        <div className="h-2 rounded bg-gray-200">
                            <div className="h-full rounded bg-blue-600 transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
                        </div>
                        <p className="mt-2 text-center text-gray-600">{step === 0 ? 'State Selection' : `Step ${step} of 4`}</p>
                    </div>

                    <div key={step}>{renderStep()}</div>

                    <div className="mt-8 flex justify-between">
                        {step > 0 && (
                            <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
                                {t('apply.form.previous')}
                            </Button>
                        )}
                        <Button
                            type="button"
                            className="ml-auto"
                            disabled={isSubmitting}
                            onClick={async () => {
                                if (step === 4) {
                                    form.handleSubmit(onSubmit)();
                                } else {
                                    // Trigger validation for the current step's fields before proceeding
                                    const fieldsToValidate = {
                                        0: ['applicationState'],
                                        1: ['firstName', 'lastName', 'ssn', 'driverLicense', 'dateOfBirth', 'gender'],
                                        2: ['email', 'phone', 'address', 'city', 'state', 'zipCode'],
                                        3: ['companyName', 'title', 'hireDate', 'income', 'incomeFrequency'],
                                    }[step];
                                    const isValid = await form.trigger(fieldsToValidate);
                                    if (isValid) {
                                        // Check for non-Colorado states on step 0
                                        if (step === 0) {
                                            const selectedState = form.getValues('applicationState');
                                            if (selectedState !== 'Colorado') {
                                                // For non-Colorado states, show a modal message
                                                setSelectedStateName(selectedState);
                                                setShowStateModal(true);
                                                return;
                                            }
                                        }
                                        setStep(step + 1);
                                    }
                                }
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {'Submitting...'}
                                </>
                            ) : step === 4 ? (
                                t('apply.form.submit')
                            ) : (
                                t('apply.form.next')
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            {/* State Modal */}
            <Dialog open={showStateModal} onOpenChange={setShowStateModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Application Notice</DialogTitle>
                        <DialogDescription>
                            Applications for {selectedStateName} will be handled through a specialized process. This feature will be available soon.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setShowStateModal(false)} className="w-full">
                            Understood
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MLSApplicationForm;
