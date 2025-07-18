import WalkTracker from "@/components/WalkTracker";
import BreedDetection from "@/components/BreedDetection";
import DiseaseDetection from "@/components/DiseaseDetection";
import HelpSection from "@/components/HelpSection";
import { Dog, Heart, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Dog className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">DogCare Dashboard</h1>
              <p className="text-muted-foreground">Your complete dog health and care companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Live Walk Tracker */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Live Walk Tracking</h2>
            </div>
            <WalkTracker />
          </section>

          {/* Main Features Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Breed Detection */}
            <section>
              <BreedDetection />
            </section>

            {/* Disease Detection */}
            <section>
              <DiseaseDetection />
            </section>
          </div>

          {/* Help Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Get Expert Help</h2>
            </div>
            <HelpSection />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>🐕 DogCare Dashboard - Keeping your furry friend healthy and happy</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
