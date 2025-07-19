import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Upload, Dog, Heart, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BreedResult {
  breed: string;
  confidence: number;
  careTips: string[];
  products: string[];
}

export default function BreedDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<BreedResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeBreed = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual AI service)
    setTimeout(() => {
      const mockResults: BreedResult[] = [
        {
          breed: "Golden Retriever",
          confidence: 92,
          careTips: [
            "Regular brushing 2-3 times per week",
            "Daily exercise for 60-90 minutes",
            "Monitor for hip dysplasia",
            "High-quality protein diet"
          ],
          products: [
            "Slicker brush for grooming",
            "Joint support supplements",
            "Interactive puzzle toys",
            "Premium dog food for large breeds"
          ]
        },
        {
          breed: "German Shepherd",
          confidence: 88,
          careTips: [
            "Mental stimulation is crucial",
            "Regular exercise and training",
            "Watch for elbow/hip issues",
            "Consistent grooming routine"
          ],
          products: [
            "Training treats and clickers",
            "Puzzle feeders",
            "Orthopedic dog bed",
            "Professional grooming tools"
          ]
        }
      ];
      
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: "Breed detected successfully",
      });
    }, 2000);
  };

  return (
    <Card className="w-full h-full flex flex-col glass-card border-white/20">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Dog className="w-5 h-5 text-primary pulse-glow" />
          <span className="gradient-text">Dog Breed Detection & Care</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div className="space-y-4">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </div>

        {selectedImage && (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Dog to analyze" 
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
            
            <Button 
              onClick={analyzeBreed}
              disabled={isAnalyzing}
              className="w-full hero-button text-white border-0"
              size="lg"
            >
              {isAnalyzing ? "Analyzing..." : "Detect Breed & Get Care Tips"}
            </Button>
          </div>
        )}

        {result && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Detection Result</h3>
              <p className="text-lg">
                <strong>{result.breed}</strong> ({result.confidence}% confidence)
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Care Tips
                </h4>
                <ul className="space-y-2">
                  {result.careTips.map((tip, index) => (
                    <li key={index} className="text-sm p-2 bg-secondary rounded">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-500" />
                  Recommended Products
                </h4>
                <ul className="space-y-2">
                  {result.products.map((product, index) => (
                    <li key={index} className="text-sm p-2 bg-secondary rounded">
                      • {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}