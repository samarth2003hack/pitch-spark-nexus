
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessDomains } from "@/lib/constants";

interface PitchFormData {
  title: string;
  domain: string;
  summary: string;
  problem: string;
  solution: string;
  marketSize: string;
  competitiveAdvantage: string;
  businessModel: string;
  fundingNeeds: string;
}

interface PitchFormProps {
  pitchData: PitchFormData;
  onPitchDataChange: (data: PitchFormData) => void;
}

export const PitchForm = ({ pitchData, onPitchDataChange }: PitchFormProps) => {
  const handleChange = (field: keyof PitchFormData, value: string) => {
    onPitchDataChange({
      ...pitchData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Pitch Title <span className="text-red-500">*</span></Label>
          <Input 
            id="title" 
            value={pitchData.title} 
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., EcoTech - Sustainable Energy Solution"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Business Domain <span className="text-red-500">*</span></Label>
          <Select 
            value={pitchData.domain}
            onValueChange={(value) => handleChange('domain', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a domain" />
            </SelectTrigger>
            <SelectContent>
              {businessDomains.map((domain) => (
                <SelectItem key={domain.value} value={domain.value}>
                  {domain.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Executive Summary <span className="text-red-500">*</span></Label>
        <Textarea 
          id="summary" 
          value={pitchData.summary} 
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Provide a brief summary of your startup and pitch (1-2 paragraphs)"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="problem">Problem</Label>
          <Textarea 
            id="problem" 
            value={pitchData.problem} 
            onChange={(e) => handleChange('problem', e.target.value)}
            placeholder="What problem are you solving?"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="solution">Solution</Label>
          <Textarea 
            id="solution" 
            value={pitchData.solution} 
            onChange={(e) => handleChange('solution', e.target.value)}
            placeholder="How does your product/service solve this problem?"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="marketSize">Market Size</Label>
          <Textarea 
            id="marketSize" 
            value={pitchData.marketSize} 
            onChange={(e) => handleChange('marketSize', e.target.value)}
            placeholder="What is the size of your target market?"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
          <Textarea 
            id="competitiveAdvantage" 
            value={pitchData.competitiveAdvantage} 
            onChange={(e) => handleChange('competitiveAdvantage', e.target.value)}
            placeholder="What sets you apart from competitors?"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessModel">Business Model</Label>
          <Textarea 
            id="businessModel" 
            value={pitchData.businessModel} 
            onChange={(e) => handleChange('businessModel', e.target.value)}
            placeholder="How will you generate revenue?"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fundingNeeds">Funding Needs</Label>
          <Textarea 
            id="fundingNeeds" 
            value={pitchData.fundingNeeds} 
            onChange={(e) => handleChange('fundingNeeds', e.target.value)}
            placeholder="How much funding are you seeking and how will you use it?"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
