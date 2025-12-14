'use client';

import { useState } from 'react';
import { Building2, Globe, ShieldCheck, Rocket, Search } from 'lucide-react';

type SchemeType = 'government' | 'private' | 'angel' | 'vc' | 'incubator';

interface FundingScheme {
  id: string;
  name: string;
  description: string;
  type: SchemeType;
  logo: string;
  website: string;
  applyLink: string;
  eligibility: string[];
  benefits: string[];
  deadline?: string;
  minAmount?: number;
  maxAmount?: number;
  equityRequired?: boolean;
}

const fundingSchemes: FundingScheme[] = [
  {
    id: '1',
    name: 'Startup India Seed Fund Scheme',
    description: 'A government initiative providing financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.',
    type: 'government',
    logo: 'https://www.startupindia.gov.in/content/dam/invest-india/Logos/Scheme%20Logos/startup-india-logo.png',
    website: 'https://www.startupindia.gov.in',
    applyLink: 'https://www.startupindia.gov.in/content/sih/en/international/go-to-market-guide/indian-government-schemes/startup-india-seed-fund.html',
    eligibility: [
      'Startup recognized by DPIIT',
      'Not more than 2 years old',
      'Business idea with innovation, scalability, and economic value',
      'Preference to startups in agriculture, education, healthcare, etc.'
    ],
    benefits: [
      'Up to ₹20 Lakhs for proof of concept',
      'Up to ₹50 Lakhs for commercialization',
      'Mentorship and industry connections',
      'Networking opportunities'
    ],
    minAmount: 2000000,
    maxAmount: 5000000
  },
  {
    id: '2',
    name: 'MeitY Startup Hub',
    description: 'An accelerator program for tech startups supported by the Ministry of Electronics and Information Technology.',
    type: 'government',
    logo: 'https://meitystartuphub.in/images/msh-logo.png',
    website: 'https://meitystartuphub.in',
    applyLink: 'https://meitystartuphub.in/startup/apply',
    eligibility: [
      'Tech-enabled startups',
      'Seed to Series A stage',
      'Technical co-founder in the team',
      'Working product with market traction'
    ],
    benefits: [
      'Up to ₹25 Lakhs in equity-free grants',
      'Mentorship and technical support',
      'Cloud credits and tools',
      'Connections with potential investors'
    ],
    minAmount: 1000000,
    maxAmount: 2500000,
    equityRequired: false
  },
  {
    id: '3',
    name: 'Indian Angel Network',
    description: 'India\'s first and largest network of angel investors providing early-stage funding to startups with high growth potential.',
    type: 'angel',
    logo: 'https://indianangelnetwork.com/wp-content/uploads/2020/02/ian-logo.png',
    website: 'https://indianangelnetwork.com',
    applyLink: 'https://indianangelnetwork.com/submit-pitch/',
    eligibility: [
      'Innovative business model',
      'Strong founding team',
      'Market potential of ₹750+ Crores',
      'Scalable business model'
    ],
    benefits: [
      'Investment from ₹50 Lakhs to ₹50 Crores',
      'Mentorship from industry experts',
      'Access to IAN network',
      'Strategic guidance and support'
    ],
    minAmount: 5000000,
    maxAmount: 500000000,
    equityRequired: true
  },
  {
    id: '4',
    name: 'ATAL Innovation Mission',
    description: 'Government initiative to promote innovation and entrepreneurship across India through various programs and funding opportunities.',
    type: 'government',
    logo: 'https://aim.gov.in/images/logo.png',
    website: 'https://aim.gov.in',
    applyLink: 'https://aim.gov.in/arise-anusandhan.php',
    eligibility: [
      'Indian startups and entrepreneurs',
      'Focus on social impact',
      'Innovative solutions to societal problems',
      'Scalable business model'
    ],
    benefits: [
      'Grants up to ₹1 Crore',
      'Access to innovation labs',
      'Expert mentorship',
      'Networking opportunities'
    ],
    minAmount: 1000000,
    maxAmount: 10000000
  },
  {
    id: '5',
    name: 'Women Entrepreneurship Platform',
    description: 'Special initiative by the Government of India to support women entrepreneurs with financial assistance and training.',
    type: 'government',
    logo: 'https://www.india.gov.in/sites/upload_files/npi/image/emblem-dark.png',
    website: 'https://msme.gov.in/',
    applyLink: 'https://www.udyamregistration.gov.in/',
    eligibility: [
      'Women entrepreneurs or co-founders',
      'Registered as MSME',
      'Open to all sectors',
      'Innovative business model'
    ],
    benefits: [
      'Subsidy up to ₹10 Lakhs',
      'Interest-free loans',
      'Business training and mentorship',
      'Priority in government tenders'
    ],
    minAmount: 500000,
    maxAmount: 1000000,
    equityRequired: false
  },
  {
    id: '6',
    name: 'India Innovation Fund',
    description: 'A private equity fund supporting Indian startups with innovative ideas and scalable business models.',
    type: 'vc',
    logo: 'https://www.india.gov.in/sites/upload_files/npi/image/emblem-dark.png',
    website: 'https://www.startupindia.gov.in',
    applyLink: 'https://www.startupindia.gov.in/content/sih/en/fund-of-funds.html',
    eligibility: [
      'Startup registered in India',
      'Innovative and scalable model',
      'Proven market traction',
      'Strong founding team'
    ],
    benefits: [
      'Investment up to ₹5 Crores',
      'Strategic partnerships',
      'Global market access',
      'Business development support'
    ],
    minAmount: 10000000,
    maxAmount: 50000000,
    equityRequired: true
  }
];

const typeConfig = {
  government: {
    label: 'Government',
    icon: <ShieldCheck className="h-4 w-4" />,
    color: 'bg-blue-100 text-blue-800',
  },
  private: {
    label: 'Private',
    icon: <Building2 className="h-4 w-4" />,
    color: 'bg-purple-100 text-purple-800',
  },
  angel: {
    label: 'Angel',
    icon: <Rocket className="h-4 w-4" />,
    color: 'bg-green-100 text-green-800',
  },
  vc: {
    label: 'VC',
    icon: <Building2 className="h-4 w-4" />,
    color: 'bg-yellow-100 text-yellow-800',
  },
  incubator: {
    label: 'Incubator',
    icon: <Building2 className="h-4 w-4" />,
    color: 'bg-pink-100 text-pink-800',
  },
};

export default function FundRaiserPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<SchemeType[]>([]);

  const toggleType = (type: SchemeType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredSchemes = fundingSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(scheme.type);
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Funding Schemes & Programs</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover government and private funding opportunities to fuel your startup's growth
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search funding schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(typeConfig).map(([type, config]) => (
            <button
              key={type}
              onClick={() => toggleType(type as SchemeType)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                selectedTypes.includes(type as SchemeType)
                  ? `${config.color} ring-2 ring-offset-1 ring-opacity-50`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.icon}
              <span className="ml-1.5">{config.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 bg-gray-100">
              <img
                src={scheme.logo}
                alt={scheme.name}
                className="w-full h-full object-contain p-6"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x200?text=Logo+Not+Available';
                }}
              />
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeConfig[scheme.type].color}`}>
                  {typeConfig[scheme.type].icon}
                  <span className="ml-1">{typeConfig[scheme.type].label}</span>
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{scheme.name}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{scheme.description}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-1">Funding Range:</h3>
                <p className="text-sm text-gray-600">
                  {scheme.minAmount && scheme.maxAmount 
                    ? `₹${(scheme.minAmount / 100000).toFixed(1)}L - ₹${(scheme.maxAmount / 10000000).toFixed(1)} Cr`
                    : scheme.minAmount 
                      ? `From ₹${(scheme.minAmount / 100000).toFixed(1)}L`
                      : scheme.maxAmount 
                        ? `Up to ₹${(scheme.maxAmount / 10000000).toFixed(1)} Cr`
                        : 'Varies'}
                </p>
              </div>
              
              {scheme.equityRequired !== undefined && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-900">Equity: </span>
                  <span className="text-sm text-gray-600">
                    {scheme.equityRequired ? 'Equity-based' : 'Non-dilutive'}
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-1">Eligibility:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scheme.eligibility.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-1.5">•</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                  {scheme.eligibility.length > 3 && (
                    <li className="text-primary-600 text-sm">+{scheme.eligibility.length - 3} more</li>
                  )}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={scheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
                <a
                  href={scheme.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No funding schemes match your search criteria.</p>
        </div>
      )}
    </div>
  );
}
