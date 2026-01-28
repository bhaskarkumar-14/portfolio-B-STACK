import React from 'react';
import { Shield, Lock, Eye, Server, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-24 pb-16 px-6 lg:px-20 max-w-5xl mx-auto text-gray-600 dark:text-gray-300">

            {/* Header */}
            <div className="mb-12 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                        <Shield className="w-10 h-10 text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Content Container */}
            <div className="space-y-12">

                {/* Introduction */}
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-primary" />
                        Introduction
                    </h2>
                    <p className="leading-relaxed">
                        Welcome to B-STACK. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                {/* Data Collection */}
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <Eye className="w-6 h-6 text-primary" />
                        Information We Collect
                    </h2>
                    <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                    <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                        <li><strong className="text-foreground">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong className="text-foreground">Contact Data:</strong> includes email address and telephone numbers.</li>
                        <li><strong className="text-foreground">Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                        <li><strong className="text-foreground">Usage Data:</strong> includes information about how you use our website and services.</li>
                    </ul>
                </section>

                {/* How We Use Data */}
                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <Server className="w-6 h-6 text-primary" />
                        How We Use Your Data
                    </h2>
                    <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/10 hover:border-primary/30 transition-colors">
                            <h3 className="text-lg font-semibold text-foreground mb-2">Service Delivery</h3>
                            <p className="text-sm">To provide and maintain our Service, including to monitor the usage of our Service.</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/10 hover:border-primary/30 transition-colors">
                            <h3 className="text-lg font-semibold text-foreground mb-2">Communication</h3>
                            <p className="text-sm">To contact you by email, telephone calls, SMS, or other equivalent forms of electronic communication.</p>
                        </div>
                    </div>
                </section>

                {/* Data Security */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <Lock className="w-6 h-6 text-primary" />
                        Data Security
                    </h2>
                    <p className="leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                {/* Contact Section */}
                <section className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border-l-4 border-primary">
                    <h3 className="text-xl font-bold text-white mb-2">Have Questions?</h3>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        <a href="mailto:support@devagency.com" className="text-primary hover:underline ml-1">support@devagency.com</a>
                    </p>
                </section>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
