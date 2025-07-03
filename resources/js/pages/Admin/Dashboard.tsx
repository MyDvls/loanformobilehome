import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Tooltip } from '@radix-ui/react-tooltip';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // Example data - replace with actual API calls/data
    const customersThisMonth = 125;
    const conversionRate = 15.8; // percentage

    const chartData = [
        { date: 'Jul 1', customers: 5 },
        { date: 'Jul 2', customers: 8 },
        { date: 'Jul 3', customers: 12 },
        { date: 'Jul 4', customers: 7 },
        { date: 'Jul 5', customers: 15 },
        { date: 'Jul 6', customers: 18 },
        { date: 'Jul 7', customers: 20 },
    ];

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
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="customers" stroke="#8884d8" strokeWidth={2} dot />
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

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[60vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    <h3 className="mb-2 text-lg font-semibold">Latest Registrations</h3>
                    <div className="space-y-4">
                        {/* Example data - replace with actual customer data from API */}
                        {[
                            { id: 1, name: 'Jane Cooper', email: 'jane@example.com', date: '2 minutes ago' },
                            { id: 2, name: 'John Smith', email: 'john@example.com', date: '1 hour ago' },
                            { id: 3, name: 'Robert Johnson', email: 'robert@example.com', date: '3 hours ago' },
                            { id: 4, name: 'Emily Davis', email: 'emily@example.com', date: 'Yesterday' },
                            { id: 5, name: 'Michael Wilson', email: 'michael@example.com', date: '2 days ago' },
                        ].map((customer) => (
                            <div key={customer.id} className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                                <div>
                                    <p className="font-medium">{customer.name}</p>
                                    <p className="text-sm text-neutral-500">{customer.email}</p>
                                </div>
                                <div className="text-sm text-neutral-500">{customer.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
