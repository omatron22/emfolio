import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black pt-32 px-8 pb-16" style={{ color: "#E8DCC4" }}>
            <div className="max-w-7xl mx-auto">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Photo - First on mobile, first on desktop (left side) */}
                    <div className="lg:order-1 lg:pt-32">
                        <div className="relative w-full max-w-xs mx-auto lg:ml-12 lg:mr-0 aspect-square lg:aspect-[3/4]">
                            <Image
                                src="/about/em.jpg"
                                alt="Em Moore"
                                fill
                                className="object-cover"
                                priority
                                quality={90}
                                sizes="(max-width: 1024px) 320px, 320px"
                            />
                        </div>
                    </div>

                    {/* Text Content - Second on mobile, second on desktop (right side) */}
                    <div className="lg:order-2 space-y-8 text-center lg:text-left">
                        {/* Title */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#E8DCC4" }}>
                                About Em Moore
                            </h1>
                        </div>

                        {/* Bio */}
                        <div className="space-y-6">
                            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#D4C5A9" }}>
                                Em Moore (they/them) is a queer, nonbinary lighting designer based in Los Angeles 
                                and originally from the San Francisco Bay Area. They are currently completing their 
                                MFA in Lighting Design for Theatre and Live Events at UCLA. Em began designing 
                                lighting in high school, shaped by early and sustained exposure to theatre, music, 
                                dance, and visual art across the Bay Area and Los Angeles.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#D4C5A9" }}>
                                Em's work spans theatre, opera, dance, and live music, with a particular interest 
                                in how light shapes movement, time, and perception. They approach lighting as a 
                                system of ideas rather than a collection of tools, using structure, rhythm, and 
                                visual logic to support performance, clarify intention, and guide the audience's 
                                point of view.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#D4C5A9" }}>
                                Alongside their design practice, Em has served as a Teaching Assistant in UCLA's 
                                lighting program for three years, supporting undergraduate instruction and studio 
                                work. Teaching has sharpened their interest in how lighting ideas are communicated, 
                                translated, and sustained across different levels of experience and across 
                                disciplines. After participating in the ACT grandMA3 programming competition, Em 
                                built a dedicated previsualization studio at UCLA using Depence software, 
                                integrating it into both EOS-based theatrical workflows and emerging MA-based 
                                concert workflows.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#D4C5A9" }}>
                                Em has worked across a wide range of venues throughout Los Angeles, including 
                                academic and regional theatres, performance spaces, and live music environments. 
                                This breadth of experience has reinforced their interest in collaborative, 
                                process-driven work and in adapting lighting systems to the specific demands of 
                                each space.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#D4C5A9" }}>
                                At the core of Em's practice is a belief that lighting functions best as a 
                                conversation, responsive to music, movement, architecture, and the people 
                                inhabiting the space. They are drawn to environments where observation, care, and 
                                long-term thinking shape the work, and where lighting serves not as singular 
                                authorship, but as an integral part of a larger artistic system.
                            </p>
                        </div>

                        {/* Education */}
                        <div className="pt-4">
                            <h2 className="text-lg font-bold mb-4 italic" style={{ color: "#E8DCC4" }}>
                                M.F.A in Lighting Design for Theatre and Live Events
                            </h2>
                            <p className="text-base" style={{ color: "#D4C5A9" }}>
                                University of California, Los Angeles (UCLA)
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="space-y-2 pt-4">
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
