import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Tooltip } from '@radix-ui/react-tooltip';
import { AlertCircle, Building, Calendar, CheckCircle, Clock, Mail, MapPin, User } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Customer {
    id: number;
    name: string;
    email: string;
    date: string;
    status: string;
    customer_type: string;
    location: string;
    employer_company_name: string;
    employer_title: string;
    employer_income: number;
    gender: string;
    age: number | null;
    avatar: string;
    created_at_formatted: string;
    is_recent: boolean;
}

interface CustomerStats {
    total_customers: number;
    active_customers: number;
    premium_customers: number;
    customers_this_week: number;
    customers_today: number;
    average_income: number;
    top_locations: Array<{ location: string; count: number }>;
    gender_distribution: Record<string, number>;
}

interface ChartData {
    date: string;
    customers: number;
}

interface DashboardProps {
    chartData: ChartData[];
    customersThisMonth: number;
    conversionRate: number;
    latestCustomers: Customer[];
    customerStats: CustomerStats;
}

export default function Dashboard({ chartData, customersThisMonth, conversionRate, latestCustomers, customerStats }: DashboardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'premium':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'standard':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'inactive':
                return <AlertCircle className="h-4 w-4 text-gray-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-600" />;
        }
    };

    const formatIncome = (income: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(income);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {/* Customer Registration Chart */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative col-span-2 aspect-video overflow-hidden rounded-xl border p-4">
                        <h3 className="mb-2 text-lg font-semibold">Customer Registrations</h3>
                        <div className="h-[calc(100%-2rem)]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={{ stroke: 'currentColor', strokeWidth: 1 }} />
                                    <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: 'currentColor', strokeWidth: 1 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="customers"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                                        activeDot={{ r: 7, fill: '#1d4ed8' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* New Customers Summary */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="mb-2 text-lg font-semibold">New Customers</h3>
                        <div className="flex h-[calc(100%-2rem)] flex-col items-center justify-center">
                            <p className="text-3xl font-bold">{customersThisMonth}</p>
                            <p className="text-sm text-neutral-500">This month</p>
                        </div>
                    </div>

                    {/* Conversion Rate */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="mb-2 text-lg font-semibold">Conversion Rate</h3>
                        <div className="flex h-[calc(100%-2rem)] flex-col items-center justify-center">
                            <p className="text-3xl font-bold">{conversionRate}%</p>
                            <p className="text-sm text-neutral-500">Visitor to customer</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Latest Registrations */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[60vh] flex-1 overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-gray-900">
                    {/* Header */}
                    <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="da rounded-lg p-2">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Latest Registrations</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Recent customer sign-ups and their details</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="space-y-4">
                            {latestCustomers.map((customer) => (
                                <div
                                    key={customer.id}
                                    className="group border-sidebar-border/70 dark:border-sidebar-border relative cursor-pointer rounded-lg bg-white p-4 transition-all duration-200 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                                >
                                    <div className="flex items-start justify-between">
                                        {/* Left side - Customer info */}
                                        <div className="flex flex-1 items-start space-x-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
                                                    {customer.avatar}
                                                </div>
                                            </div>

                                            {/* Customer details */}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center space-x-3">
                                                    <h4 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                                                        {customer.name}
                                                    </h4>
                                                    {customer.age && (
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">{customer.age} years old</span>
                                                    )}
                                                    <div className="flex items-center space-x-1">{getStatusIcon(customer.status)}</div>
                                                </div>

                                                <div className="mb-2 flex items-center space-x-2">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                    <span className="truncate text-sm text-gray-600 dark:text-gray-300">{customer.email}</span>
                                                </div>

                                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{customer.location}</span>
                                                    </div>
                                                    {customer.employer_company_name !== 'Not specified' && (
                                                        <div className="flex items-center space-x-1">
                                                            <Building className="h-4 w-4" />
                                                            <span>{customer.employer_company_name}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {customer.employer_title !== 'Not specified' && (
                                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="font-medium">{customer.employer_title}</span>
                                                        {customer.employer_income > 0 && (
                                                            <>
                                                                <span className="mx-2">•</span>
                                                                <span className="font-semibold text-green-600 dark:text-green-400">
                                                                    {formatIncome(customer.employer_income)}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right side - Status and time */}
                                        <div className="ml-4 flex flex-shrink-0 flex-col items-end space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                                </span>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(customer.customer_type)}`}
                                                >
                                                    {customer.customer_type.charAt(0).toUpperCase() + customer.customer_type.slice(1)}
                                                </span>
                                            </div>

                                            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="h-4 w-4" />
                                                <span>{customer.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover indicator */}
                                    <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-200 group-hover:border-blue-200 dark:group-hover:border-blue-700"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
