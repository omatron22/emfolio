"use client";

import { useState } from "react";

const drafts = [
    { 
        number: 1, 
        name: "Groundplan", 
        file: "/drafting/1_Emma_Groundplan_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 2, 
        name: "Electric Groundplan", 
        file: "/drafting/2_Emma_ElectricGroundplan_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 3, 
        name: "FOH Groundplan", 
        file: "/drafting/3_Emma_FOHGroundplan_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 4, 
        name: "Deck Groundplan", 
        file: "/drafting/4_Emma_DeckGroundplan_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 5, 
        name: "Added Positions", 
        file: "/drafting/5_Emma_AddedPositions_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 6, 
        name: "Set Electrics", 
        file: "/drafting/6_Emma_SetElectrics_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 7, 
        name: "Set Electrics (Alt)", 
        file: "/drafting/7_Emma_SetElectrics_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 8, 
        name: "SR Section", 
        file: "/drafting/8_Emma_SRSection_24x36_260130_Final_EFM.pdf" 
    },
    { 
        number: 9, 
        name: "SR Section Detailed", 
        file: "/drafting/9_Emma_SRSectionDetailed_24x36_260130_Final_EFM.pdf" 
    },
];

export default function DraftingPage() {
    const [selectedDraft, setSelectedDraft] = useState<number>(1);

    const currentDraft = drafts.find(d => d.number === selectedDraft);

    return (
        <div className="bg-black lg:pt-32 pt-24 lg:px-8 px-4 lg:pb-8 pb-4" style={{ color: "#E8DCC4" }}>
            <div className="max-w-7xl mx-auto">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:pb-8 pb-2">
                    {/* Desktop: Left Sidebar - Draft List */}
                    <div className="lg:col-span-3 hidden lg:block">
                        <div className="space-y-2 lg:sticky lg:top-32">
                            {drafts.map((draft) => (
                                <button
                                    key={draft.number}
                                    onClick={() => setSelectedDraft(draft.number)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                                        selectedDraft === draft.number
                                            ? 'bg-neutral-800 border border-neutral-700'
                                            : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800'
                                    }`}
                                >
                                    <div 
                                        className="text-xs font-semibold mb-1 uppercase tracking-wider"
                                        style={{ 
                                            color: selectedDraft === draft.number ? "#E8DCC4" : "#D4C5A9",
                                            opacity: selectedDraft === draft.number ? 1 : 0.7
                                        }}
                                    >
                                        {String(draft.number).padStart(2, '0')}
                                    </div>
                                    <div 
                                        className="text-sm font-bold"
                                        style={{ 
                                            color: selectedDraft === draft.number ? "#E8DCC4" : "#D4C5A9"
                                        }}
                                    >
                                        {draft.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - PDF Viewer */}
                    <div className="lg:col-span-9">
                        {currentDraft && (
                            <div>
                                {/* Header Row */}
                                <div className="mb-4 lg:mb-6">
                                    {/* Project Title */}
                                    <div className="mb-3 lg:mb-4">
                                        <h1 className="text-xl lg:text-3xl font-bold" style={{ color: "#E8DCC4" }}>
                                            EMMA: NO ONE BUT HERSELF
                                        </h1>
                                    </div>
                                    
                                    {/* Mobile: Dropdown Selector */}
                                    <div className="lg:hidden mb-4 relative">
                                        <select
                                            value={selectedDraft}
                                            onChange={(e) => setSelectedDraft(Number(e.target.value))}
                                            className="w-full px-4 py-3 pr-10 rounded-lg bg-neutral-800 border border-neutral-700 text-sm font-semibold appearance-none"
                                            style={{ 
                                                color: "#E8DCC4",
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='%23E8DCC4'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 0.75rem center',
                                                backgroundSize: '1.5em 1.5em'
                                            }}
                                        >
                                            {drafts.map((draft) => (
                                                <option key={draft.number} value={draft.number}>
                                                    {String(draft.number).padStart(2, '0')} - {draft.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Desktop: Drawing Info + Download Button */}
                                    <div className="hidden lg:flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold" style={{ color: "#E8DCC4" }}>
                                                {currentDraft.name}
                                            </h2>
                                            <p className="text-sm" style={{ color: "#D4C5A9", opacity: 0.7 }}>
                                                Drawing {currentDraft.number} of {drafts.length}
                                            </p>
                                        </div>
                                        <a
                                            href={currentDraft.file}
                                            download
                                            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-semibold transition-colors border border-neutral-700 whitespace-nowrap"
                                            style={{ color: "#E8DCC4" }}
                                        >
                                            Download PDF
                                        </a>
                                    </div>

                                    {/* Mobile: Simplified Info + Download */}
                                    <div className="lg:hidden flex items-center justify-between">
                                        <p className="text-xs" style={{ color: "#D4C5A9", opacity: 0.7 }}>
                                            Drawing {currentDraft.number} of {drafts.length}
                                        </p>
                                        <a
                                            href={currentDraft.file}
                                            download
                                            className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-semibold transition-colors border border-neutral-700"
                                            style={{ color: "#E8DCC4" }}
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>

                                {/* PDF Viewer - No grey space */}
                                <div className="w-full bg-black rounded-lg overflow-hidden border border-neutral-800 mb-3 lg:mb-6">
                                    <iframe
                                        src={`${currentDraft.file}#view=FitH&toolbar=1&navpanes=0`}
                                        className="w-full h-[65vh] lg:h-[70vh]"
                                        title={`${currentDraft.name} - EMMA: NO ONE BUT HERSELF`}
                                    />
                                </div>

                                {/* Navigation Arrows */}
                                <div className="flex justify-between gap-4">
                                    <button
                                        onClick={() => setSelectedDraft(Math.max(1, selectedDraft - 1))}
                                        disabled={selectedDraft === 1}
                                        className={`px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all ${
                                            selectedDraft === 1
                                                ? 'bg-neutral-900 opacity-50 cursor-not-allowed'
                                                : 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700'
                                        }`}
                                        style={{ color: "#E8DCC4" }}
                                    >
                                        ← Previous
                                    </button>
                                    <button
                                        onClick={() => setSelectedDraft(Math.min(drafts.length, selectedDraft + 1))}
                                        disabled={selectedDraft === drafts.length}
                                        className={`px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-semibold transition-all ${
                                            selectedDraft === drafts.length
                                                ? 'bg-neutral-900 opacity-50 cursor-not-allowed'
                                                : 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700'
                                        }`}
                                        style={{ color: "#E8DCC4" }}
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
