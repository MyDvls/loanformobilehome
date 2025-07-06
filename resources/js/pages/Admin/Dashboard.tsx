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

export default function Dashboard({ chartData, customersThisMonth, conversionRate, latestCustomers }: any) {
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
                        {latestCustomers.map((customer) => (
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
