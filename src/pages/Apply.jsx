import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, User, Send, CheckCircle, Loader2 } from 'lucide-react';
import { db, auth } from '../auth/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../auth/useAuth';
import { useData } from '../context/DataContext';

const Apply = () => {
    const { user, loginWithGoogle } = useAuth();
    const { addApplication } = useData();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        destination: '',
        course: '',
        academicLevel: '',
        details: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const steps = [
        { title: 'Personal Info', icon: User },
        { title: 'Destination', icon: MapPin },
        { title: 'Education', icon: GraduationCap },
        { title: 'Finish', icon: Send }
    ];

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Attempt Firebase save if available, otherwise just use Local Storage
            const newApp = {
                ...formData,
                userId: user?.uid || 'guest',
                userEmail: user?.email || formData.email,
                status: 'Pending',
                createdAt: new Date()
            };

            // Save to Local Data Store (Primary for this request)
            addApplication(newApp);

            // Optional: Try Firebase if configured (Silent fail if not)
            if (db && auth) {
                try {
                    await addDoc(collection(db, "applications"), {
                        ...newApp,
                        createdAt: serverTimestamp()
                    });
                } catch (fbError) {
                    console.warn("Firebase save failed, but saved locally:", fbError);
                }
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error("Submission Error:", error);
            // We'll let the user see a more subtle error if we had an error state, 
            // but for now let's just log it and not show a disruptive alert.
        } finally {
            setLoading(false);
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-md"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-navy mb-4">Application Sent!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for applying with Blessings EduVisa. Our consultants will review your profile and contact you within 24-48 hours.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="btn-primary w-full"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="section-padding bg-lightgray min-h-screen">
            <div className="container-custom max-w-3xl">
                <div className="mb-8 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-navy mb-3 md:mb-4">Apply Online</h1>
                    <p className="text-gray-600 font-medium">Take the first step towards your international career</p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between mb-8 md:mb-12 relative px-2">
                    <div className="absolute top-[22px] md:top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                    <div
                        className="absolute top-[22px] md:top-1/2 left-0 h-1 bg-brandgreen -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: `${(step - 1) * 33.33}%` }}
                    ></div>
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = step > i;
                        const isCurrent = step === i + 1;
                        return (
                            <div key={i} className="relative z-10 flex flex-col items-center">
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCurrent ? 'bg-navy text-brandgreen ring-4 ring-brandgreen/20' :
                                    isActive ? 'bg-brandgreen text-white' : 'bg-white text-gray-400 border-2'
                                    }`}>
                                    {(() => {
                                        const StepIcon = s.icon;
                                        return <StepIcon size={18} md:size={20} />;
                                    })()}
                                </div>
                                <span className={`text-[9px] md:text-xs font-black mt-2 uppercase tracking-tight md:tracking-tighter ${isCurrent ? 'text-navy' : isActive ? 'text-brandgreen' : 'text-gray-400'
                                    }`}>
                                    {s.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Form Container */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative min-h-[400px]">
                    <AnimatePresence mode="wait" custom={step}>
                        <motion.div
                            key={step}
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-navy">Personal Details</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                            placeholder="03247569469"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-navy">Choose Destination</h3>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Study Destination</label>
                                        <select
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all appearance-none bg-white"
                                        >
                                            <option value="">Select a country</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="canada">Canada</option>
                                            <option value="australia">Australia</option>
                                            <option value="usa">USA</option>
                                            <option value="europe">Europe</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Why this country?</label>
                                        <textarea
                                            name="details"
                                            value={formData.details}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                            placeholder="Share your primary interest..."
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-navy">Educational Background</h3>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Highest Academic Qualification</label>
                                        <select
                                            name="academicLevel"
                                            value={formData.academicLevel}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Select Level</option>
                                            <option value="highschool">High School</option>
                                            <option value="bachelors">Bachelor's Degree</option>
                                            <option value="masters">Master's Degree</option>
                                            <option value="phd">PhD</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Interested Course / Program</label>
                                        <input
                                            type="text"
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. Computer Science, MBA"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6 text-center">
                                    <h3 className="text-2xl font-bold text-navy">Ready to Submit?</h3>
                                    <p className="text-gray-600">
                                        Please review your information before submitting. One of our senior consultants will reach out to you within 24 hours.
                                    </p>
                                    <div className="bg-lightgray p-6 rounded-2xl text-left space-y-2">
                                        <p><span className="font-bold text-navy">Name:</span> {formData.fullName || 'Not provided'}</p>
                                        <p><span className="font-bold text-navy">Email:</span> {formData.email || 'Not provided'}</p>
                                        <p><span className="font-bold text-navy">Destination:</span> {formData.destination.toUpperCase() || 'Not selected'}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="mt-8 md:mt-12 flex justify-between gap-3 md:gap-4">
                        <button
                            onClick={prevStep}
                            className={`px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-bold transition-all text-sm md:text-base ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-navy border-2 border-navy hover:bg-navy hover:text-white'
                                }`}
                        >
                            Previous
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                className="btn-secondary px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="btn-primary px-6 md:px-8 py-3 md:py-3.5 bg-navy hover:bg-navy-dark flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} md:size={20} /> : 'Submit Now'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apply;
