
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShowcaseIdeaButton } from '@/components/shared/ShowcaseIdeaButton';
import { Navbar } from '@/components/Navbar';

// Mock data for pitches (replace with real data later)
const mockPitches = [
  {
    id: 1,
    title: 'EcoTech Solutions',
    description: 'Sustainable energy solutions for urban environments',
    status: 'Under Review',
    createdAt: '2024-04-15',
    popularity: 85
  },
  {
    id: 2,
    title: 'HealthAI Assistant',
    description: 'AI-powered personal health monitoring system',
    status: 'Pending',
    createdAt: '2024-04-16',
    popularity: 92
  },
  {
    id: 3,
    title: 'SmartFarm',
    description: 'IoT solutions for modern agriculture',
    status: 'Under Review',
    createdAt: '2024-04-17',
    popularity: 78
  },
];

const PitchesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter and sort pitches
  const filteredPitches = mockPitches
    .filter(pitch => {
      const matchesSearch = pitch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pitch.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : pitch.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.popularity - a.popularity;
    });

  return (
    <>
    
      <Navbar></Navbar>

    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col space-y-8">
        {/* Header Section with added CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Explore Pitches</h1>
            <p className="text-muted-foreground">
              Discover innovative startup ideas and provide valuable feedback
            </p>
          </div>
          <ShowcaseIdeaButton />
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pitches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pitch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPitches.map((pitch) => (
            <Card key={pitch.id} className="flex flex-col hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{pitch.title}</CardTitle>
                <CardDescription>{pitch.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {pitch.status}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  onClick={() => navigate(`/pitch/${pitch.id}`)}
                  className="w-full"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
    
  );
};

export default PitchesPage;
