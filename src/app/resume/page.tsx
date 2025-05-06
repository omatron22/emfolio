import Link from 'next/link';

// Component for section headers
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4 mt-8">
    {children}
  </h2>
);

// Component for resume entries
const ResumeEntry = ({
  title,
  director,
  venue,
  year,
}: {
  title: string;
  director: string;
  venue: string;
  year: string;
}) => (
  <div className="mb-3 grid grid-cols-12 items-baseline">
    <div className="col-span-12 md:col-span-6">
      <h3 className="font-bold">{title}</h3>
    </div>
    <div className="col-span-12 md:col-span-3 text-sm md:text-base">
      {director}
    </div>
    <div className="col-span-8 md:col-span-2 text-sm md:text-base">
      {venue}
    </div>
    <div className="col-span-4 md:col-span-1 text-sm md:text-base text-right md:text-left">
      {year}
    </div>
  </div>
);

export default function Resume() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>
        <Link 
          href="/resume/EmMoore_Resume.pdf" 
          target="_blank"
          rel="noopener noreferrer" 
          className="mt-4 md:mt-0 px-4 py-2 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          Download PDF
        </Link>
      </div>
      
      <div className="mb-6">
        <p className="text-lg">
          <a href="mailto:efmoore0610@g.ucla.edu" className="hover:underline">
            efmoore0610@g.ucla.edu
          </a>
        </p>
        <p className="text-lg">415-450-5798</p>
      </div>
      
      <SectionHeader>Education</SectionHeader>
      <div className="mb-6">
        <p className="mb-1">
          <span className="font-bold">UCLA&apos;s School of Theater, Film and Television</span> MFA for Lighting Design (IP) 2023-2026
        </p>
        <p>
          <span className="font-bold">UCLA&apos;s School of Theater, Film and Television</span> BA 2019-2023
        </p>
      </div>
      
      <SectionHeader>Theatre & Dance Experience</SectionHeader>
      
      <h3 className="text-xl font-bold mb-4">Lighting Design</h3>
      <div className="space-y-1 mb-6">
        <ResumeEntry 
          title="Natasha, Pierre & The Great Comet of 1812" 
          director="J.ED Araiza" 
          venue="UCLA Freud Playhouse" 
          year="2025" 
        />
        <ResumeEntry 
          title="The Courage to Right a Woman's Wrongs" 
          director="Michael Hackett" 
          venue="UCLA 1340 Blackbox" 
          year="2024" 
        />
        <ResumeEntry 
          title="Boxes - The Academy NYLA Dance" 
          director="Michelle Stroolino" 
          venue="UCLA Little Theatre" 
          year="2024" 
        />
        <ResumeEntry 
          title="DayDreamer - Staged Reading" 
          director="Isaiah Mateas" 
          venue="UCLA 1340 Blackbox" 
          year="2024" 
        />
        <ResumeEntry 
          title="Fairview" 
          director="David H. Parker" 
          venue="UCLA Little Theatre" 
          year="2024" 
        />
        <ResumeEntry 
          title="Keyeh/Made In China" 
          director="Yuval Zehavi" 
          venue="UCLA 1340 Blackbox" 
          year="2023" 
        />
      </div>
      
      <h3 className="text-xl font-bold mb-4">Assistant Lighting Design</h3>
      <div className="space-y-1 mb-6">
        <ResumeEntry 
          title="The Grand Hotel Tartarus" 
          director="Peter Kazaras" 
          venue="UCLA Freud Playhouse" 
          year="2024" 
        />
        <ResumeEntry 
          title="The Time of Your Life" 
          director="Jennifer Chang" 
          venue="UCLA Little Theatre" 
          year="2023" 
        />
        <ResumeEntry 
          title="A List of Happenings" 
          director="Alana Dietze" 
          venue="UCLA 1340 Blackbox" 
          year="2023" 
        />
        <ResumeEntry 
          title="Antigone (Studio Assistant)" 
          director="Staci Mize" 
          venue="UCLA Little Theatre" 
          year="2022" 
        />
      </div>
      
      <SectionHeader>Related Work Experience</SectionHeader>
      
      <h3 className="text-xl font-bold mb-4">Show Lighting Design Internship</h3>
      <div className="space-y-1 mb-6">
        <ResumeEntry 
          title="Hamlet" 
          director="Robert O'Hara" 
          venue="Mark Taper Forum" 
          year="2025" 
        />
        <ResumeEntry 
          title="Power of Sail" 
          director="Mike Donahue" 
          venue="Geen Playhouse" 
          year="2022" 
        />
        <ResumeEntry 
          title="Trayf" 
          director="Maggie Burrows" 
          venue="Geen Playhouse" 
          year="2022" 
        />
      </div>
      
      <h3 className="text-xl font-bold mb-4">EOS Family Programmer</h3>
      <div className="space-y-1 mb-6">
        <ResumeEntry 
          title="Something Rotten" 
          director="Corey Wright" 
          venue="UCLA Freud Playhouse" 
          year="2024" 
        />
        <ResumeEntry 
          title="Every Brilliant Thing" 
          director="Colm Summers" 
          venue="Geen Playhouse" 
          year="2023" 
        />
        <ResumeEntry 
          title="Pippin" 
          director="Corey Wright" 
          venue="UCLA Freud Playhouse" 
          year="2022" 
        />
        <ResumeEntry 
          title="A Most Favored Nation" 
          director="Mira Winick" 
          venue="UCLA Freud Playhouse" 
          year="2022" 
        />
        <ResumeEntry 
          title="Lydia" 
          director="Mark Anthony Vallejo" 
          venue="UCLA Little Theatre" 
          year="2020" 
        />
      </div>
      
      <h3 className="text-xl font-bold mb-4">Teaching Assistant</h3>
      <p className="mb-6">Lighting Lab &nbsp;&nbsp; Intro to Lighting Design 14B Lecture</p>
      
      <SectionHeader>Skills</SectionHeader>
      <div className="mb-6">
        <p className="mb-2">
          <span className="font-bold">Drafting/Modeling:</span> Vectorworks, Cinema 4D, Maya Rendering, Adobe Photoshop, Adobe After Effects
        </p>
        <p className="mb-2">
          <span className="font-bold">Programming:</span> EOS Family (Certified Levels 1-4), GrandMA3 (Beg-Intermediate)
        </p>
        <p className="mb-2">
          <span className="font-bold">Paperwork:</span> Lightwright, Excel Spreadsheets, Powerpoint, Canva
        </p>
        <p>Basic Rigging & Valid Driver&apos;s License</p>
      </div>
    </div>
  );
}