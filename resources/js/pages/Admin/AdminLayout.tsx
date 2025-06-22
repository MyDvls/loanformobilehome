import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface AdminLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

const navItems = [
    { name: 'Homepage', href: '/admin/pages/home' },
    { name: 'Services', href: '/admin/pages/services' },
    { name: 'Get a loan', href: '/admin/pages/get-a-loan' },
    { name: 'Teams', href: '/admin/pages/team' },
    { name: 'Contact', href: '/admin/pages/contact' },
];

export default function AdminLayout({ title, subtitle, children }: AdminLayoutProps) {
    const { url } = usePage();
    return (
        <div className="min-h-screen">
            <Head title={title} />
            <main className="w-full">
                <div className="rounded-lg border px-10 py-10 shadow-md">
                    <h2 className="mb-6 text-xl font-semibold">{subtitle}</h2>

                    {/* Navigation Buttons */}
                    <div className="mb-6 inline-flex rounded-lg bg-gray-200 p-1 dark:bg-white/10">
                        {navItems.map((item) => {
                            const isActive = url.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-white text-black shadow dark:bg-gray-100 dark:text-black'
                                            : 'text-black hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Dynamic Content */}
                    <div className="space-y-6">{children}</div>
                </div>
            </main>
        </div>
    );
}
