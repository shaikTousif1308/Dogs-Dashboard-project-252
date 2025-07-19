import { useEffect } from "react";
import WalkTracker from "@/components/WalkTracker";
import BreedDetection from "@/components/BreedDetection";
import DiseaseDetection from "@/components/DiseaseDetection";
import HelpSection from "@/components/HelpSection";
import { Dog, Heart, Activity, Sparkles } from "lucide-react";
import AOS from 'aos';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    // Create random floating paws
    const createFloatingPaw = () => {
      const pawsContainer = document.querySelector('.floating-paws');
      if (!pawsContainer) return;

      const paw = document.createElement('div');
      paw.innerHTML = '🐾';
      paw.className = 'paw-print';
      
      // Random horizontal position
      paw.style.left = Math.random() * 100 + '%';
      
      // Random animation delay
      paw.style.animationDelay = Math.random() * 5 + 's';
      
      // Random animation duration
      paw.style.animationDuration = (8 + Math.random() * 8) + 's';
      
      pawsContainer.appendChild(paw);
      
      // Remove after animation
      setTimeout(() => {
        if (paw.parentNode) {
          paw.parentNode.removeChild(paw);
        }
      }, 16000);
    };

    // Create paws at random intervals
    const pawInterval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to create a paw
        createFloatingPaw();
      }
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => {
      clearInterval(pawInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-paws"></div>
      </div>
      {/* Header */}
      <header className="glass-card border-b border-white/20 relative z-10" data-aos="fade-down">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center pulse-glow">
              <Dog className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">DogCare Dashboard</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Your complete dog health and care companion
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="space-y-8">
          {/* Live Walk Tracker */}
          <section data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6 text-primary pulse-glow" />
              <h2 className="text-2xl font-bold gradient-text">Live Walk Tracking</h2>
            </div>
            <div className="hover-lift">
              <WalkTracker />
            </div>
          </section>

          {/* Main Features Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Breed Detection */}
            <section className="h-full" data-aos="fade-up" data-aos-delay="200">
              <div className="h-full hover-lift">
                <BreedDetection />
              </div>
            </section>

            {/* Disease Detection */}
            <section className="h-full" data-aos="fade-up" data-aos-delay="300">
              <div className="h-full hover-lift">
                <DiseaseDetection />
              </div>
            </section>
          </div>

          {/* Help Section */}
          <section data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-primary pulse-glow" />
              <h2 className="text-2xl font-bold gradient-text">Get Expert Help</h2>
            </div>
            <div className="hover-lift">
              <HelpSection />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-white/20 mt-16 relative z-10" data-aos="fade-up" data-aos-delay="500">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <span>🐕</span> 
            <span className="gradient-text font-semibold">DogCare Dashboard</span> 
            <span>- Keeping your furry friend healthy and happy</span>
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
