import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black pt-32 px-8 pb-16" style={{ color: "#E8DCC4" }}>
            <div className="max-w-7xl mx-auto">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Photo - First on mobile, second on desktop */}
                    <div className="lg:order-2 lg:sticky lg:top-32">
                        <div className="relative w-full max-w-sm mx-auto lg:ml-auto aspect-square lg:aspect-[3/4]">
                            <Image
                                src="/about/em.jpg"
                                alt="Em Moore"
                                fill
                                className="object-cover"
                                priority
                                quality={90}
                                sizes="(max-width: 1024px) 384px, 448px"
                            />
                        </div>
                    </div>

                    {/* Text Content - Second on mobile, first on desktop */}
                    <div className="lg:order-1 space-y-12 text-center lg:text-left">
                        {/* Bio */}
                        <div>
                            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "#D4C5A9" }}>
                                Em Moore (they/them) is a queer, nonbinary lighting designer currently pursuing
                                their MFA in Lighting Design for Theater and Live Events at UCLA. Based in Los
                                Angeles and originally from the San Francisco Bay Area, Em has been designing
                                lighting since high school.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#D4C5A9" }}>
                                Their work spans theater, dance, and live music, and they are especially
                                interested in how light can shape movement, atmosphere, and emotional experience
                                across performance disciplines.
                            </p>
                        </div>

                        {/* Education */}
                        <div>
                            <h2 className="text-lg font-bold mb-4 italic" style={{ color: "#E8DCC4" }}>
                                M.F.A in Lighting Design for Theater and Live Events
                            </h2>
                            <p className="text-base" style={{ color: "#D4C5A9" }}>
                                University of California, Los Angeles (UCLA)
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="space-y-2">
                            <p className="text-base" style={{ color: "#D4C5A9" }}>
                                <span className="font-semibold" style={{ color: "#E8DCC4" }}>Cell:</span>{" "}
                                <a href="tel:415-450-5798" className="hover:brightness-110 transition-colors">
                                    415-450-5798
                                </a>
                            </p>
                            <p className="text-base" style={{ color: "#D4C5A9" }}>
                                <span className="font-semibold" style={{ color: "#E8DCC4" }}>Email:</span>{" "}
                                <a
                                    href="mailto:efmoore0610@gmail.com"
                                    className="hover:brightness-110 transition-colors underline"
                                >
                                    efmoore0610@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
