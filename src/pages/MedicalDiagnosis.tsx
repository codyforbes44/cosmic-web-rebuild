import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertTriangle, Heart, Stethoscope } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';
interface MedicalCondition {
  condition: string;
  likelihood: string;
  description: string;
  urgency: string;
}
interface DiagnosisResult {
  possibleConditions: MedicalCondition[];
  recommendations: string[];
  disclaimer: string;
}
const MedicalDiagnosis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const {
    toast
  } = useToast();
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'emergency':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'urgent':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'routine':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'monitor':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };
  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Symptoms Required",
        description: "Please describe your symptoms before analyzing.",
        variant: "destructive"
      });
      return;
    }
    setIsAnalyzing(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('medical-diagnosis', {
        body: {
          symptoms,
          age,
          gender,
          medicalHistory
        }
      });
      if (error) throw error;
      setResult(data);
      toast({
        title: "Analysis Complete",
        description: "Medical condition analysis has been generated."
      });
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze symptoms. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  return <>
      <Helmet>
        <title>Medical Diagnosis Assistant | AI-Powered Symptom Analysis</title>
        <meta name="description" content="Get AI-powered medical condition suggestions based on your symptoms." />
      </Helmet>
      
      <div className="min-h-screen bg-space-dark-blue">
        <Navbar />
        
        <QueryErrorBoundary
          fallbackTitle="Medical Diagnosis Unavailable"
          fallbackDescription="Unable to load the medical diagnosis assistant. Please try again."
        >
        
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="bg-accent/20 p-4 rounded-full">
                  <Stethoscope className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Medical Diagnosis Assistant
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                AI-powered symptom analysis to help you understand potential medical conditions. </p>
            </div>

            {/* Important Disclaimer */}
            

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Symptom Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="symptoms" className="text-white mb-2 block">
                      Describe Your Symptoms *
                    </Label>
                    <Textarea id="symptoms" placeholder="Please describe your symptoms in detail (e.g., headache for 3 days, fever, nausea...)" value={symptoms} onChange={e => setSymptoms(e.target.value)} className="min-h-32 bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age" className="text-white mb-2 block">Age</Label>
                      <Input id="age" type="number" placeholder="Your age" value={age} onChange={e => setAge(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                    </div>

                    <div>
                      <Label htmlFor="gender" className="text-white mb-2 block">Gender</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="history" className="text-white mb-2 block">
                      Medical History (Optional)
                    </Label>
                    <Textarea id="history" placeholder="Any relevant medical history, current medications, allergies..." value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                  </div>

                  <Button onClick={handleAnalyze} disabled={isAnalyzing || !symptoms.trim()} className="w-full bg-accent hover:bg-accent/80 text-white">
                    {isAnalyzing ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Symptoms...
                      </> : 'Analyze Symptoms'}
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {!result ? <div className="text-center text-gray-400 py-8">
                      <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter your symptoms and click "Analyze Symptoms" to get started.</p>
                    </div> : <div className="space-y-6">
                      {/* Possible Conditions */}
                      {result.possibleConditions?.length > 0 && <div>
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-accent" />
                            Possible Conditions
                          </h3>
                          <div className="space-y-4">
                            {result.possibleConditions.map((condition, index) => <div key={index} className={`p-4 rounded-lg border-l-4 bg-white/5 backdrop-blur-sm ${condition.urgency?.toLowerCase() === 'emergency' ? 'border-l-red-500' : condition.urgency?.toLowerCase() === 'urgent' ? 'border-l-orange-500' : condition.urgency?.toLowerCase() === 'routine' ? 'border-l-blue-500' : 'border-l-green-500'}`}>
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-semibold text-white text-lg">{condition.condition}</h4>
                                  <div className="flex gap-2">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${condition.likelihood?.toLowerCase() === 'high' ? 'bg-red-100 text-red-800' : condition.likelihood?.toLowerCase() === 'medium' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                                      {condition.likelihood} Likelihood
                                    </span>
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${condition.urgency?.toLowerCase() === 'emergency' ? 'bg-red-500 text-white' : condition.urgency?.toLowerCase() === 'urgent' ? 'bg-orange-500 text-white' : condition.urgency?.toLowerCase() === 'routine' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                                      {condition.urgency}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed">{condition.description}</p>
                              </div>)}
                          </div>
                        </div>}

                      {/* Recommendations */}
                      {result.recommendations?.length > 0 && <div>
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Stethoscope className="w-5 h-5 text-accent" />
                            Medical Recommendations
                          </h3>
                          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                            <ul className="space-y-3">
                              {result.recommendations.map((rec, index) => <li key={index} className="text-gray-300 flex items-start gap-3 leading-relaxed">
                                  <span className="text-accent mt-1 font-bold">•</span>
                                  <span>{rec}</span>
                                </li>)}
                            </ul>
                          </div>
                        </div>}

                      {/* Disclaimer */}
                      {result.disclaimer}
                    </div>}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </QueryErrorBoundary>
        
        <Footer />
      </div>
    </>;
};
export default MedicalDiagnosis;