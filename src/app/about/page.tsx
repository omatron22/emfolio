// src/app/about/page.tsx

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">About</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-6">
            Em Moore (they/them) is a queer, nonbinary lighting designer currently pursuing their MFA in Lighting Design for Theater and Live Events at UCLA. Based in Los Angeles and originally from the San Francisco Bay Area, Em has been designing lighting since high school.
          </p>
          
          <p className="text-lg mb-6">
            Their work spans theater, dance, and live music, with a particular interest in how light can shape movement, atmosphere, and emotional experience across performance disciplines.
          </p>
          
          <p className="text-lg mb-6">
            Em approaches lighting design with an emphasis on creating immersive environments that support storytelling and enhance the audience experience. Their design process balances technical precision with artistic intuition, drawing inspiration from visual art, architecture, and natural phenomena.
          </p>
          
          <p className="text-lg">
            When not in the theater, Em enjoys hiking in California&apos;s diverse landscapes, experimenting with photography, and attending live performances across Los Angeles.
          </p>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative aspect-[3/4] w-full max-w-lg">
            <div className="absolute inset-0 bg-black/10 dark:bg-white/10 -translate-x-4 translate-y-4"></div>
            {/* Note: Replace with actual profile image when available */}
            <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <p className="text-center p-8">Profile image will go here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Design Philosophy</h2>
        <div className="max-w-3xl">
          <p className="text-lg mb-6">
            &quot;I believe lighting design is about creating a visual language that speaks directly to the audience&apos;s emotions. Light has the unique ability to transform space, reveal truth, and evoke feeling without a single word.&quot; 
          </p>
          
          <p className="text-lg">
            &quot;Each production presents a new opportunity to discover how light can best serve the story and create moments of beauty, tension, or revelation. I&apos;m particularly drawn to designs that balance bold theatricality with nuanced environmental storytelling.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}