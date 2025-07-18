import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, AlertTriangle, Shield, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiseaseResult {
  condition: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  precautions: string[];
  recommendations: string[];
}

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
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

  const analyzeDisease = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual AI service)
    setTimeout(() => {
      const mockResults: DiseaseResult[] = [
        {
          condition: "Healthy - No issues detected",
          confidence: 94,
          severity: "Low",
          precautions: [
            "Continue regular grooming",
            "Maintain healthy diet",
            "Keep up with regular vet checkups"
          ],
          recommendations: [
            "Great job! Your dog appears healthy",
            "Continue current care routine"
          ]
        },
        {
          condition: "Skin Irritation/Allergies",
          confidence: 87,
          severity: "Medium",
          precautions: [
            "Keep the affected area clean and dry",
            "Avoid scratching or licking",
            "Monitor for worsening symptoms",
            "Consider changing diet or environment"
          ],
          recommendations: [
            "Consult vet for proper diagnosis",
            "Use hypoallergenic shampoo",
            "Consider antihistamines (vet prescribed)",
            "Check for food allergies"
          ]
        },
        {
          condition: "Hot Spot/Bacterial Infection",
          confidence: 82,
          severity: "High",
          precautions: [
            "Clean with antiseptic solution",
            "Prevent licking with cone",
            "Keep area dry",
            "Monitor temperature"
          ],
          recommendations: [
            "⚠️ Seek immediate veterinary care",
            "May require antibiotics",
            "Professional cleaning needed",
            "Follow-up appointments important"
          ]
        }
      ];
      
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: "Health assessment ready",
      });
    }, 2500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          Dog Health & Disease Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            <strong>Disclaimer:</strong> This is for educational purposes only. Always consult a professional veterinarian for accurate diagnosis and treatment.
          </p>
        </div>

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
                alt="Dog health check" 
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
            
            <Button 
              onClick={analyzeDisease}
              disabled={isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? "Analyzing Health..." : "Analyze Health Condition"}
            </Button>
          </div>
        )}

        {result && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Health Assessment</h3>
                <Badge className={getSeverityColor(result.severity)}>
                  {result.severity} Risk
                </Badge>
              </div>
              <p className="text-lg mb-2">
                <strong>{result.condition}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Confidence: {result.confidence}%
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-500" />
                  Immediate Precautions
                </h4>
                <ul className="space-y-2">
                  {result.precautions.map((precaution, index) => (
                    <li key={index} className="text-sm p-2 bg-orange-50 dark:bg-orange-950 rounded">
                      • {precaution}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-500" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      • {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {result.severity === "High" && (
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-800 dark:text-red-200 font-medium">
                  ⚠️ High risk condition detected. Please contact your veterinarian immediately for professional evaluation and treatment.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}