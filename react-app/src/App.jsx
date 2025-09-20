<<<<<<< Updated upstream
import React, { useState } from 'react';
import { Search, FileText, CheckSquare, BookOpen, Info, ExternalLink, Download } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('models');
  const [selectedModels, setSelectedModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Animal models data - directly in component for simplicity
  const animalModels = [
    {
      id: 'ts65dn',
      name: 'Ts65Dn',
      species: 'Mouse',
      background: 'B6EiC3Sn',
      trisomy: 'Partial (MMU16)',
      genes: '104 genes',
      phenotypes: ['Cognitive deficits', 'Craniofacial abnormalities', 'Heart defects', 'Cerebellar hypoplasia'],
      advantages: ['Well-characterized', 'Cognitive phenotype', 'Available colonies', 'Extensive literature'],
      limitations: ['Partial trisomy', 'Extra genes from MMU17', 'Fertility issues', 'Not complete DS model'],
      applications: ['Cognitive studies', 'Therapeutics testing', 'Pathophysiology', 'Behavioral analysis'],
      jackson_link: 'https://www.jax.org/strain/001924',
      rrid: 'IMSR_JAX:001924'
    },
    {
      id: 'tc1',
      name: 'Tc1',
      species: 'Mouse',
      background: 'Mixed',
      trisomy: 'Complete HSA21',
      genes: 'Most HSA21 genes',
      phenotypes: ['Learning deficits', 'Synaptic dysfunction', 'Neurodegeneration', 'Memory impairment'],
      advantages: ['Complete human chr21', 'Human-relevant genetics', 'All DS genes present'],
      limitations: ['Poor breeding', 'High mortality', 'Genomic instability', 'Limited availability'],
      applications: ['Genetic studies', 'Molecular mechanisms', 'Human relevance studies', 'Gene dosage effects'],
      jackson_link: 'https://www.jax.org/strain/004924',
      rrid: 'IMSR_JAX:004924'
    },
    {
      id: 'dp16',
      name: 'Dp(16)1Yey',
      species: 'Mouse',
      background: 'C57BL/6J',
      trisomy: 'Partial (MMU16)',
      genes: '33 genes',
      phenotypes: ['Motor deficits', 'Hyperactivity', 'Memory defects', 'Interferon dysregulation'],
      advantages: ['Defined gene set', 'Good breeding', 'Interferon studies', 'JAK pathway research'],
      limitations: ['Smaller gene set', 'Limited cognitive phenotype', 'Newer model'],
      applications: ['Interferon pathway', 'Specific gene studies', 'Immunotherapy', 'JAK inhibitor studies'],
      jackson_link: 'https://www.jax.org/strain/013530',
      rrid: 'IMSR_JAX:013530'
    },
    {
      id: 'dp17',
      name: 'Dp(17)1Yey',
      species: 'Mouse', 
      background: 'C57BL/6J',
      trisomy: 'Partial (MMU17)',
      genes: '24 genes',
      phenotypes: ['Mild cognitive deficits', 'Motor learning defects'],
      advantages: ['Smaller gene set', 'Good breeding', 'Controls for Ts65Dn'],
      limitations: ['Mild phenotype', 'Limited applications'],
      applications: ['Control studies', 'Gene mapping', 'Complementation analysis'],
      jackson_link: 'https://www.jax.org/strain/013529',
      rrid: 'IMSR_JAX:013529'
    }
  ];

  // ARRIVE guidelines data
  const guidelines = [
    { id: 1, category: 'Study Design', item: 'Provide precise details of study design including primary research question', checked: false },
    { id: 2, category: 'Study Design', item: 'Explain how sample size was determined', checked: false },
    { id: 3, category: 'Animals', item: 'Provide details of animals used including species, strain, sex, age', checked: false },
    { id: 4, category: 'Animals', item: 'Explain housing and husbandry conditions', checked: false },
    { id: 5, category: 'Procedures', item: 'Describe procedures in detail for each experimental group', checked: false },
    { id: 6, category: 'Procedures', item: 'Describe experimental outcomes and how they were assessed', checked: false },
    { id: 7, category: 'Statistics', item: 'Describe statistical methods for each analysis', checked: false },
    { id: 8, category: 'Statistics', item: 'Report exact P values and effect sizes where possible', checked: false },
    { id: 9, category: 'Results', item: 'Report study timeline and actual sample sizes', checked: false },
    { id: 10, category: 'Results', item: 'Present results with appropriate statistics', checked: false }
  ];

  const [guidelineChecks, setGuidelineChecks] = useState(guidelines);

  const simulateLLMResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('ts65dn') || lowerQuery.includes('cognitive')) {
      return 'For cognitive studies, Ts65Dn is the gold standard DS mouse model (RRID: IMSR_JAX:001924). It shows robust learning and memory deficits similar to DS. Recommended tests: Morris Water Maze, Novel Object Recognition, Y-maze. Consider n≥10 per group and account for sex differences.';
    }
    
    if (lowerQuery.includes('tc1') || lowerQuery.includes('human')) {
      return 'Tc1 mice (RRID: IMSR_JAX:004924) carry the complete human chromosome 21, making them genetically most similar to DS. However, they have breeding difficulties and high mortality. Best for molecular studies.';
    }
    
    if (lowerQuery.includes('dp16') || lowerQuery.includes('interferon')) {
      return 'Dp(16)1Yey mice (RRID: IMSR_JAX:013530) are excellent for interferon pathway and immunotherapy studies. Perfect for JAK inhibitor studies, cytokine analysis, and neuroinflammation research.';
    }
    
    if (lowerQuery.includes('sample size') || lowerQuery.includes('power')) {
      return 'Sample size depends on effect size and variability. For behavioral studies: n=8-12 per group (80% power, α=0.05). For molecular studies: n=6-8 may suffice. Use G*Power calculator and account for 10-20% attrition.';
    }
    
    if (lowerQuery.includes('rrid')) {
      return 'RRIDs are required for proper scientific reporting. DS models: Ts65Dn (IMSR_JAX:001924), Tc1 (IMSR_JAX:004924), Dp16 (IMSR_JAX:013530), Dp17 (IMSR_JAX:013529). Include in methods section for reproducibility.';
    }

    return 'I can help with DS animal model selection, experimental design, sample size calculations, ARRIVE compliance, and RRID identification. Ask me about specific models or research guidelines!';
  };

  const handleChat = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { type: 'user', content: chatInput };
    const llmResponse = { type: 'assistant', content: simulateLLMResponse(chatInput) };
    
    setChatMessages(prev => [...prev, userMessage, llmResponse]);
    setChatInput('');
  };

  const handleModelSelect = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleGuidelineCheck = (id) => {
    setGuidelineChecks(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const filteredModels = animalModels.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.phenotypes.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
    model.applications.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">DS Research Assistant</h1>
          <p className="text-gray-600">Down syndrome animal model comparison and experimental design guidance</p>
          <div className="text-sm text-gray-500 mt-2 bg-white/50 rounded-lg p-2 inline-block">
            💡 100% Open Source • Free GitHub Hosting • ARRIVE/FAIR compliant
          </div>
        </header>

        <nav className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'models', label: 'Animal Models', icon: Search },
              { id: 'compare', label: 'Compare', icon: FileText },
              { id: 'design', label: 'Study Design', icon: Info },
              { id: 'guidelines', label: 'ARRIVE Check', icon: CheckSquare },
              { id: 'chat', label: 'AI Assistant', icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'models' && (
            <div>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search models by name, phenotype, or application..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredModels.map(model => (
                  <div 
                    key={model.id} 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedModels.includes(model.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleModelSelect(model.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{model.name}</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{model.species}</span>
                        <a 
                          href={model.jackson_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-3">
                      <div><span className="font-medium">Background:</span> {model.background}</div>
                      <div><span className="font-medium">Trisomy:</span> {model.trisomy}</div>
                      <div><span className="font-medium">Genes:</span> {model.genes}</div>
                      <div>
                        <span className="font-medium">RRID:</span>{' '}
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {model.rrid}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="font-medium text-sm">Key Phenotypes:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {model.phenotypes.slice(0, 3).map((phenotype, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {phenotype}
                          </span>
                        ))}
                        {model.phenotypes.length > 3 && (
                          <span className="text-xs text-gray-500">+{model.phenotypes.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="font-medium text-sm">Best Applications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {model.applications.slice(0, 2).map((app, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {app}
                          </span>
                        ))}
                        {model.applications.length > 2 && (
                          <span className="text-xs text-gray-500">+{model.applications.length - 2} more</span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Click to select for comparison • External link to Jackson Lab
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compare' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Model Comparison</h2>
              {selectedModels.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Select models from the Animal Models tab to compare them here</p>
                </div>
              ) : (
                <div>
=======
import React, { useState } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState } from 'react';import React, { useState, useEffect } from 'react';

import { Search, FileText, CheckSquare, BookOpen, Info, ExternalLink, Download } from 'lucide-react';

import { Search, FileText, CheckSquare, BookOpen, Info, ExternalLink, Download } from 'lucide-react';

const DSResearchTool = () => {

  const [activeTab, setActiveTab] = useState('models');import { Search, FileText, CheckSquare, BookOpen, Info, ExternalLink, Download } from 'lucide-react';

  const [selectedModels, setSelectedModels] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');const DSResearchTool = () => {



  // Mock data  const [activeTab, setActiveTab] = useState('models');import { Search, FileText, CheckSquare, BookOpen, Info, ExternalLink, Download } from 'lucide-react';import { Search, FileText, CheckSquare, BookOpen, Info, ExternalLink, Download } from 'lucide-react';

  const animalModels = [

    {  const [selectedModels, setSelectedModels] = useState([]);

      id: 'ts65dn',

      name: 'Ts65Dn',  const [searchQuery, setSearchQuery] = useState('');const DSResearchTool = () => {

      species: 'Mouse',

      background: 'B6EiC3Sn',  const [chatInput, setChatInput] = useState('');

      trisomy: 'Partial (MMU16)',

      genes: '104 genes',  const [chatMessages, setChatMessages] = useState([]);  const [activeTab, setActiveTab] = useState('models');

      phenotypes: ['Cognitive deficits', 'Craniofacial abnormalities', 'Heart defects'],

      applications: ['Cognitive studies', 'Therapeutics testing', 'Behavioral analysis'],  const [animalModels, setAnimalModels] = useState([]);

      rrid: 'IMSR_JAX:001924'

    },  const [guidelines, setGuidelines] = useState([]);  const [selectedModels, setSelectedModels] = useState([]);

    {

      id: 'tc1',  const [loading, setLoading] = useState(true);

      name: 'Tc1',

      species: 'Mouse',  const [searchQuery, setSearchQuery] = useState('');const DSResearchTool = () => {const DSResearchTool = () => {

      background: 'Mixed',

      trisomy: 'Complete HSA21',  // Mock animal models data with RRID

      genes: 'Most HSA21 genes',

      phenotypes: ['Learning deficits', 'Synaptic dysfunction', 'Memory impairment'],  const mockAnimalModels = [  const [chatInput, setChatInput] = useState('');

      applications: ['Genetic studies', 'Molecular mechanisms', 'Human relevance studies'],

      rrid: 'IMSR_JAX:004924'    {

    }

  ];      id: 'ts65dn',  const [chatMessages, setChatMessages] = useState([]);  const [activeTab, setActiveTab] = useState('models');  const [activeTab, setActiveTab] = useState('models');



  const filteredModels = animalModels.filter(model =>      name: 'Ts65Dn',

    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

    model.phenotypes.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))      species: 'Mouse',  const [animalModels, setAnimalModels] = useState([]);

  );

      background: 'B6EiC3Sn',

  const handleModelSelect = (modelId) => {

    setSelectedModels(prev =>       trisomy: 'Partial (MMU16)',  const [guidelines, setGuidelines] = useState([]);  const [selectedModels, setSelectedModels] = useState([]);  const [selectedModels, setSelectedModels] = useState([]);

      prev.includes(modelId) 

        ? prev.filter(id => id !== modelId)      genes: '104 genes',

        : [...prev, modelId]

    );      phenotypes: ['Cognitive deficits', 'Craniofacial abnormalities', 'Heart defects', 'Cerebellar hypoplasia'],  const [loading, setLoading] = useState(true);

  };

      advantages: ['Well-characterized', 'Cognitive phenotype', 'Available colonies', 'Extensive literature'],

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">      limitations: ['Partial trisomy', 'Extra genes from MMU17', 'Fertility issues', 'Not complete DS model'],  const [searchQuery, setSearchQuery] = useState('');  const [searchQuery, setSearchQuery] = useState('');

      <div className="max-w-7xl mx-auto">

        <header className="text-center mb-8">      applications: ['Cognitive studies', 'Therapeutics testing', 'Pathophysiology', 'Behavioral analysis'],

          <h1 className="text-4xl font-bold text-gray-800 mb-2">DS Research Assistant</h1>

          <p className="text-gray-600">Down syndrome animal model comparison and experimental design guidance</p>      jackson_link: 'https://www.jax.org/strain/001924',  // Load data from JSON files

        </header>

      rrid: 'IMSR_JAX:001924'

        <nav className="flex justify-center mb-8">

          <div className="bg-white rounded-lg p-1 shadow-lg">    },  useEffect(() => {  const [chatInput, setChatInput] = useState('');  const [chatInput, setChatInput] = useState('');

            {[

              { id: 'models', label: 'Animal Models', icon: Search },    {

              { id: 'compare', label: 'Compare', icon: FileText },

              { id: 'design', label: 'Study Design', icon: Info },      id: 'tc1',    const loadData = async () => {

              { id: 'guidelines', label: 'ARRIVE Check', icon: CheckSquare },

              { id: 'chat', label: 'AI Assistant', icon: BookOpen }      name: 'Tc1',

            ].map(tab => (

              <button      species: 'Mouse',      try {  const [chatMessages, setChatMessages] = useState([]);  const [chatMessages, setChatMessages] = useState([]);

                key={tab.id}

                onClick={() => setActiveTab(tab.id)}      background: 'Mixed',

                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${

                  activeTab === tab.id      trisomy: 'Complete HSA21',        const [modelsResponse, guidelinesResponse] = await Promise.all([

                    ? 'bg-blue-500 text-white shadow-md'

                    : 'text-gray-600 hover:bg-gray-100'      genes: 'Most HSA21 genes',

                }`}

              >      phenotypes: ['Learning deficits', 'Synaptic dysfunction', 'Neurodegeneration', 'Memory impairment'],          fetch('./data/animal-models.json'),  const [loading, setLoading] = useState(false);

                <tab.icon size={16} />

                {tab.label}      advantages: ['Complete human chr21', 'Human-relevant genetics', 'All DS genes present'],

              </button>

            ))}      limitations: ['Poor breeding', 'High mortality', 'Genomic instability', 'Limited availability'],          fetch('./data/arrive-guidelines.json')

          </div>

        </nav>      applications: ['Genetic studies', 'Molecular mechanisms', 'Human relevance studies', 'Gene dosage effects'],



        <div className="bg-white rounded-xl shadow-lg p-6">      jackson_link: 'https://www.jax.org/strain/004924',        ]);  // Mock animal models data with RRID

          {activeTab === 'models' && (

            <div>      rrid: 'IMSR_JAX:004924'

              <div className="mb-6">

                <div className="relative">    },

                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />

                  <input    {

                    type="text"

                    placeholder="Search models..."      id: 'dp16',        const modelsData = await modelsResponse.json();  const animalModels = [  // Mock animal models data with RRID

                    value={searchQuery}

                    onChange={(e) => setSearchQuery(e.target.value)}      name: 'Dp(16)1Yey',

                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"

                  />      species: 'Mouse',        const guidelinesData = await guidelinesResponse.json();

                </div>

              </div>      background: 'C57BL/6J',



              <div className="grid gap-4 md:grid-cols-2">      trisomy: 'Partial (MMU16)',    {  const animalModels = [

                {filteredModels.map(model => (

                  <div       genes: '33 genes',

                    key={model.id} 

                    className={`border-2 rounded-lg p-4 cursor-pointer ${      phenotypes: ['Motor deficits', 'Hyperactivity', 'Memory defects', 'Interferon dysregulation'],        setAnimalModels(modelsData);

                      selectedModels.includes(model.id)

                        ? 'border-blue-500 bg-blue-50'      advantages: ['Defined gene set', 'Good breeding', 'Interferon studies', 'JAK pathway research'],

                        : 'border-gray-200 hover:border-gray-300'

                    }`}      limitations: ['Smaller gene set', 'Limited cognitive phenotype', 'Newer model'],              id: 'ts65dn',    {

                    onClick={() => handleModelSelect(model.id)}

                  >      applications: ['Interferon pathway', 'Specific gene studies', 'Immunotherapy', 'JAK inhibitor studies'],

                    <h3 className="text-lg font-semibold mb-2">{model.name}</h3>

                    <p className="text-sm text-gray-600 mb-2">RRID: {model.rrid}</p>      jackson_link: 'https://www.jax.org/strain/013530',        // Flatten guidelines for checklist

                    <p className="text-sm">{model.trisomy} • {model.genes}</p>

                    <div className="mt-2">      rrid: 'IMSR_JAX:013530'

                      {model.phenotypes.slice(0, 2).map((phenotype, idx) => (

                        <span key={idx} className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded mr-1">    },        const flatGuidelines = guidelinesData.flatMap((category) =>       name: 'Ts65Dn',      id: 'ts65dn',

                          {phenotype}

                        </span>    {

                      ))}

                    </div>      id: 'dp17',          category.items.map((item) => ({

                  </div>

                ))}      name: 'Dp(17)1Yey',

              </div>

            </div>      species: 'Mouse',             category: category.category,      species: 'Mouse',      name: 'Ts65Dn',

          )}

      background: 'C57BL/6J',

          {activeTab === 'compare' && (

            <div>      trisomy: 'Partial (MMU17)',            ...item,

              <h2 className="text-2xl font-semibold mb-4">Model Comparison</h2>

              {selectedModels.length === 0 ? (      genes: '24 genes',

                <p className="text-gray-500 text-center py-8">Select models to compare</p>

              ) : (      phenotypes: ['Mild cognitive deficits', 'Motor learning defects'],            checked: false      background: 'B6EiC3Sn',      species: 'Mouse',

                <div className="overflow-x-auto">

                  <table className="w-full border-collapse">      advantages: ['Smaller gene set', 'Good breeding', 'Controls for Ts65Dn'],

                    <thead>

                      <tr className="bg-gray-50">      limitations: ['Mild phenotype', 'Limited applications'],          }))

                        <th className="border p-3 text-left">Feature</th>

                        {selectedModels.map(modelId => {      applications: ['Control studies', 'Gene mapping', 'Complementation analysis'],

                          const model = animalModels.find(m => m.id === modelId);

                          return <th key={modelId} className="border p-3">{model.name}</th>;      jackson_link: 'https://www.jax.org/strain/013529',        );      trisomy: 'Partial (MMU16)',      background: 'B6EiC3Sn',

                        })}

                      </tr>      rrid: 'IMSR_JAX:013529'

                    </thead>

                    <tbody>    }        setGuidelines(flatGuidelines);

                      <tr>

                        <td className="border p-3 font-medium">RRID</td>  ];

                        {selectedModels.map(modelId => {

                          const model = animalModels.find(m => m.id === modelId);        setLoading(false);      genes: '104 genes',      trisomy: 'Partial (MMU16)',

                          return <td key={modelId} className="border p-3 font-mono text-sm">{model.rrid}</td>;

                        })}  const mockGuidelines = [

                      </tr>

                      <tr>    {      } catch (error) {

                        <td className="border p-3 font-medium">Trisomy</td>

                        {selectedModels.map(modelId => {      category: 'Study Design',

                          const model = animalModels.find(m => m.id === modelId);

                          return <td key={modelId} className="border p-3">{model.trisomy}</td>;      item: 'Provide precise details of study design including primary research question',        console.error('Error loading data:', error);      phenotypes: ['Cognitive deficits', 'Craniofacial abnormalities', 'Heart defects', 'Cerebellar hypoplasia'],      genes: '104 genes',

                        })}

                      </tr>      details: 'Include timeline, variables, and experimental unit',

                    </tbody>

                  </table>      checked: false        // Fallback to mock data if files don't exist

                </div>

              )}    },

            </div>

          )}    {        setAnimalModels(mockAnimalModels);      advantages: ['Well-characterized', 'Cognitive phenotype', 'Available colonies', 'Extensive literature'],      phenotypes: ['Cognitive deficits', 'Craniofacial abnormalities', 'Heart defects', 'Cerebellar hypoplasia'],



          {activeTab === 'design' && (      category: 'Study Design',

            <div>

              <h2 className="text-2xl font-semibold mb-4">Study Design Wizard</h2>      item: 'Explain how sample size was determined',        setGuidelines(mockGuidelines);

              <div className="grid md:grid-cols-2 gap-6">

                <div>      details: 'Power analysis calculations, effect size estimates',

                  <label className="block text-sm font-medium mb-2">Research Question</label>

                  <textarea      checked: false        setLoading(false);      limitations: ['Partial trisomy', 'Extra genes from MMU17', 'Fertility issues', 'Not complete DS model'],      advantages: ['Well-characterized', 'Cognitive phenotype', 'Available colonies', 'Extensive literature'],

                    placeholder="What is your main research question?"

                    className="w-full p-3 border border-gray-300 rounded-lg"    },

                    rows="3"

                  />    {      }

                </div>

                <div className="bg-blue-50 p-4 rounded-lg">      category: 'Animals',

                  <h3 className="font-medium text-blue-800 mb-2">💡 Design Tips</h3>

                  <ul className="text-sm text-blue-700 list-disc list-inside">      item: 'Provide details of animals used',    };      applications: ['Cognitive studies', 'Therapeutics testing', 'Pathophysiology', 'Behavioral analysis'],      limitations: ['Partial trisomy', 'Extra genes from MMU17', 'Fertility issues', 'Not complete DS model'],

                    <li>Use n≥10 per group for behavioral studies</li>

                    <li>Include both sexes as biological variable</li>      details: 'Species, strain, sex, age, source, health status',

                    <li>Always include RRIDs in methods section</li>

                  </ul>      checked: false

                </div>

              </div>    },

            </div>

          )}    {    loadData();      jackson_link: 'https://www.jax.org/strain/001924',      applications: ['Cognitive studies', 'Therapeutics testing', 'Pathophysiology', 'Behavioral analysis'],



          {activeTab === 'guidelines' && (      category: 'Procedures',

            <div>

              <h2 className="text-2xl font-semibold mb-4">ARRIVE Guidelines Checklist</h2>      item: 'Describe experimental outcomes',  }, []);

              <div className="space-y-3">

                <div className="p-3 border rounded-lg">      details: 'Primary and secondary outcome measures',

                  <label className="flex items-center">

                    <input type="checkbox" className="mr-2" />      checked: false      rrid: 'IMSR_JAX:001924',      jackson_link: 'https://www.jax.org/strain/001924',

                    <span>Provide precise details of study design</span>

                  </label>    },

                </div>

                <div className="p-3 border rounded-lg">    {  // Mock data for development

                  <label className="flex items-center">

                    <input type="checkbox" className="mr-2" />      category: 'Statistics',

                    <span>Explain how sample size was determined</span>

                  </label>      item: 'Describe statistical methods',  const mockAnimalModels = [      references: ['PMC3174970', 'PMC2921762', 'PMC4104169'],      rrid: 'IMSR_JAX:001924',

                </div>

              </div>      details: 'Statistical tests used and rationale',

            </div>

          )}      checked: false    {



          {activeTab === 'chat' && (    }

            <div>

              <h2 className="text-2xl font-semibold mb-4">AI Research Assistant</h2>  ];      id: 'ts65dn',      key_papers: [      references: ['PMC3174970', 'PMC2921762', 'PMC4104169'],

              <div className="border rounded-lg h-64 p-4">

                <p className="text-gray-500 text-center mt-8">

                  Ask about DS animal models, experimental design, or research guidance!

                </p>  // Load data from JSON files or use mock data      name: 'Ts65Dn',

              </div>

            </div>  useEffect(() => {

          )}

        </div>    const loadData = async () => {      species: 'Mouse',        {      key_papers: [

      </div>

    </div>      try {

  );

};        const [modelsResponse, guidelinesResponse] = await Promise.all([      background: 'B6EiC3Sn',



export default DSResearchTool;          fetch('./data/animal-models.json'),

          fetch('./data/arrive-guidelines.json')      trisomy: 'Partial (MMU16)',          title: 'Ts65Dn mouse model for Down syndrome',        {

        ]);

      genes: '104 genes',

        const modelsData = await modelsResponse.json();

        const guidelinesData = await guidelinesResponse.json();      phenotypes: ['Cognitive deficits', 'Craniofacial abnormalities', 'Heart defects', 'Cerebellar hypoplasia'],          authors: 'Reeves et al.',          title: 'Ts65Dn mouse model for Down syndrome',



        setAnimalModels(modelsData);      advantages: ['Well-characterized', 'Cognitive phenotype', 'Available colonies', 'Extensive literature'],

        

        // Flatten guidelines for checklist      limitations: ['Partial trisomy', 'Extra genes from MMU17', 'Fertility issues', 'Not complete DS model'],          year: '1995',          authors: 'Reeves et al.',

        const flatGuidelines = guidelinesData.flatMap((category) => 

          category.items.map((item) => ({      applications: ['Cognitive studies', 'Therapeutics testing', 'Pathophysiology', 'Behavioral analysis'],

            category: category.category,

            ...item,      jackson_link: 'https://www.jax.org/strain/001924',          pmid: '7493025'          year: '1995',

            checked: false

          }))      rrid: 'IMSR_JAX:001924'

        );

        setGuidelines(flatGuidelines);    },        }          pmid: '7493025'

        setLoading(false);

      } catch (error) {    {

        console.error('Error loading data:', error);

        // Fallback to mock data if files don't exist      id: 'tc1',      ]        }

        setAnimalModels(mockAnimalModels);

        setGuidelines(mockGuidelines);      name: 'Tc1',

        setLoading(false);

      }      species: 'Mouse',    },      ]

    };

      background: 'Mixed',

    loadData();

  }, []);      trisomy: 'Complete HSA21',    {    },



  const simulateLLMResponse = (query) => {      genes: 'Most HSA21 genes',

    const lowerQuery = query.toLowerCase();

          phenotypes: ['Learning deficits', 'Synaptic dysfunction', 'Neurodegeneration', 'Memory impairment'],      id: 'tc1',    {

    if (lowerQuery.includes('ts65dn') || lowerQuery.includes('cognitive')) {

      return 'For cognitive studies, Ts65Dn is the gold standard DS mouse model (RRID: IMSR_JAX:001924). It shows robust learning and memory deficits similar to DS. Recommended tests: Morris Water Maze (spatial learning), Novel Object Recognition (episodic memory), Y-maze (working memory). Consider n≥10 per group, account for sex differences, and control for motor deficits.';      advantages: ['Complete human chr21', 'Human-relevant genetics', 'All DS genes present'],

    }

          limitations: ['Poor breeding', 'High mortality', 'Genomic instability', 'Limited availability'],      name: 'Tc1',      id: 'tc1',

    if (lowerQuery.includes('rrid')) {

      return 'RRIDs (Research Resource Identifiers) are required for proper scientific reporting. For DS models: Ts65Dn (IMSR_JAX:001924), Tc1 (IMSR_JAX:004924), Dp16 (IMSR_JAX:013530), Dp17 (IMSR_JAX:013529). Include RRIDs in your methods section for reproducibility and journal compliance.';      applications: ['Genetic studies', 'Molecular mechanisms', 'Human relevance studies', 'Gene dosage effects'],

    }

      jackson_link: 'https://www.jax.org/strain/004924',      species: 'Mouse',      name: 'Tc1',

    return 'I can help with DS animal model selection, experimental design, sample size calculations, ARRIVE compliance, and RRID identification. Ask me about specific models, study types, or research guidelines.';

  };      rrid: 'IMSR_JAX:004924'



  const handleChat = () => {    },      background: 'Mixed',      species: 'Mouse',

    if (!chatInput.trim()) return;

        {

    const userMessage = { type: 'user', content: chatInput };

    const llmResponse = { type: 'assistant', content: simulateLLMResponse(chatInput) };      id: 'dp16',      trisomy: 'Complete HSA21',      background: 'Mixed',

    

    setChatMessages(prev => [...prev, userMessage, llmResponse]);      name: 'Dp(16)1Yey',

    setChatInput('');

  };      species: 'Mouse',      genes: 'Most HSA21 genes',      trisomy: 'Complete HSA21',



  const handleModelSelect = (modelId) => {      background: 'C57BL/6J',

    setSelectedModels(prev => 

      prev.includes(modelId)       trisomy: 'Partial (MMU16)',      phenotypes: ['Learning deficits', 'Synaptic dysfunction', 'Neurodegeneration', 'Memory impairment'],      genes: 'Most HSA21 genes',

        ? prev.filter(id => id !== modelId)

        : [...prev, modelId]      genes: '33 genes',

    );

  };      phenotypes: ['Motor deficits', 'Hyperactivity', 'Memory defects', 'Interferon dysregulation'],      advantages: ['Complete human chr21', 'Human-relevant genetics', 'All DS genes present'],      phenotypes: ['Learning deficits', 'Synaptic dysfunction', 'Neurodegeneration', 'Memory impairment'],



  const handleGuidelineCheck = (index) => {      advantages: ['Defined gene set', 'Good breeding', 'Interferon studies', 'JAK pathway research'],

    setGuidelines(prev => prev.map((item, i) => 

      i === index ? { ...item, checked: !item.checked } : item      limitations: ['Smaller gene set', 'Limited cognitive phenotype', 'Newer model'],      limitations: ['Poor breeding', 'High mortality', 'Genomic instability', 'Limited availability'],      advantages: ['Complete human chr21', 'Human-relevant genetics', 'All DS genes present'],

    ));

  };      applications: ['Interferon pathway', 'Specific gene studies', 'Immunotherapy', 'JAK inhibitor studies'],



  const exportChecklist = () => {      jackson_link: 'https://www.jax.org/strain/013530',      applications: ['Genetic studies', 'Molecular mechanisms', 'Human relevance studies', 'Gene dosage effects'],      limitations: ['Poor breeding', 'High mortality', 'Genomic instability', 'Limited availability'],

    const completedItems = guidelines.filter(g => g.checked);

    const totalItems = guidelines.length;      rrid: 'IMSR_JAX:013530'

    const completionRate = Math.round((completedItems.length / totalItems) * 100);

        },      jackson_link: 'https://www.jax.org/strain/004924',      applications: ['Genetic studies', 'Molecular mechanisms', 'Human relevance studies', 'Gene dosage effects'],

    const exportText = `ARRIVE Guidelines Checklist Export

Generated: ${new Date().toLocaleDateString()}    {

Completion: ${completedItems.length}/${totalItems} items (${completionRate}%)

      id: 'dp17',      rrid: 'IMSR_JAX:004924',      jackson_link: 'https://www.jax.org/strain/004924',

COMPLETED ITEMS:

${completedItems.map(item => `✓ ${item.category}: ${item.item}`).join('\n')}      name: 'Dp(17)1Yey',



REMAINING ITEMS:      species: 'Mouse',       references: ['PMC2921762', 'PMC3174970'],      rrid: 'IMSR_JAX:004924',

${guidelines.filter(g => !g.checked).map(item => `☐ ${item.category}: ${item.item}`).join('\n')}

`;      background: 'C57BL/6J',



    const blob = new Blob([exportText], { type: 'text/plain' });      trisomy: 'Partial (MMU17)',      key_papers: [      references: ['PMC2921762', 'PMC3174970'],

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');      genes: '24 genes',

    a.href = url;

    a.download = 'arrive-checklist.txt';      phenotypes: ['Mild cognitive deficits', 'Motor learning defects'],        {      key_papers: [

    a.click();

    URL.revokeObjectURL(url);      advantages: ['Smaller gene set', 'Good breeding', 'Controls for Ts65Dn'],

  };

      limitations: ['Mild phenotype', 'Limited applications'],          title: 'Tc1 mouse carrying a freely segregating human chromosome 21',        {

  const filteredModels = animalModels.filter(model =>

    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||      applications: ['Control studies', 'Gene mapping', 'Complementation analysis'],

    model.phenotypes.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||

    model.applications.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))      jackson_link: 'https://www.jax.org/strain/013529',          authors: 'O\'Doherty et al.',          title: 'Tc1 mouse carrying a freely segregating human chromosome 21',

  );

      rrid: 'IMSR_JAX:013529'

  if (loading) {

    return (    }          year: '2005',          authors: 'O\'Doherty et al.',

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">

        <div className="text-center">  ];

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>

          <p className="text-gray-600">Loading DS research data...</p>          pmid: '15958422'          year: '2005',

        </div>

      </div>  const mockGuidelines = [

    );

  }    {        }          pmid: '15958422'



  return (      category: 'Study Design',

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">

      <div className="max-w-7xl mx-auto">      item: 'Provide precise details of study design including primary research question',      ]        }

        <header className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800 mb-2">DS Research Assistant</h1>      details: 'Include timeline, variables, and experimental unit',

          <p className="text-gray-600">Down syndrome animal model comparison and experimental design guidance</p>

          <div className="text-sm text-gray-500 mt-2 bg-white/50 rounded-lg p-2 inline-block">      checked: false    },      ]

            💡 100% Open Source • Free GitHub Hosting • ARRIVE/FAIR compliant

          </div>    },

        </header>

    {    {    },

        <nav className="flex justify-center mb-8">

          <div className="bg-white rounded-lg p-1 shadow-lg">      category: 'Study Design',

            {[

              { id: 'models', label: 'Animal Models', icon: Search },      item: 'Explain how sample size was determined',      id: 'dp16',    {

              { id: 'compare', label: 'Compare', icon: FileText },

              { id: 'design', label: 'Study Design', icon: Info },      details: 'Power analysis calculations, effect size estimates',

              { id: 'guidelines', label: 'ARRIVE Check', icon: CheckSquare },

              { id: 'chat', label: 'AI Assistant', icon: BookOpen }      checked: false      name: 'Dp(16)1Yey',      id: 'dp16',

            ].map(tab => (

              <button    },

                key={tab.id}

                onClick={() => setActiveTab(tab.id)}    {      species: 'Mouse',      name: 'Dp(16)1Yey',

                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${

                  activeTab === tab.id      category: 'Animals',

                    ? 'bg-blue-500 text-white shadow-md'

                    : 'text-gray-600 hover:bg-gray-100'      item: 'Provide details of animals used',      background: 'C57BL/6J',      species: 'Mouse',

                }`}

              >      details: 'Species, strain, sex, age, source, health status',

                <tab.icon size={16} />

                {tab.label}      checked: false      trisomy: 'Partial (MMU16)',      background: 'C57BL/6J',

              </button>

            ))}    },

          </div>

        </nav>    {      genes: '33 genes',      trisomy: 'Partial (MMU16)',



        <div className="bg-white rounded-xl shadow-lg p-6">      category: 'Procedures',

          {activeTab === 'models' && (

            <div>      item: 'Describe experimental outcomes',      phenotypes: ['Motor deficits', 'Hyperactivity', 'Memory defects', 'Interferon dysregulation'],      genes: '33 genes',

              <div className="mb-6">

                <div className="relative">      details: 'Primary and secondary outcome measures',

                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />

                  <input      checked: false      advantages: ['Defined gene set', 'Good breeding', 'Interferon studies', 'JAK pathway research'],      phenotypes: ['Motor deficits', 'Hyperactivity', 'Memory defects', 'Interferon dysregulation'],

                    type="text"

                    placeholder="Search models by name, phenotype, or application..."    },

                    value={searchQuery}

                    onChange={(e) => setSearchQuery(e.target.value)}    {      limitations: ['Smaller gene set', 'Limited cognitive phenotype', 'Newer model'],      advantages: ['Defined gene set', 'Good breeding', 'Interferon studies', 'JAK pathway research'],

                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                  />      category: 'Statistics',

                </div>

              </div>      item: 'Describe statistical methods',      applications: ['Interferon pathway', 'Specific gene studies', 'Immunotherapy', 'JAK inhibitor studies'],      limitations: ['Smaller gene set', 'Limited cognitive phenotype', 'Newer model'],



              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">      details: 'Statistical tests used and rationale',

                {filteredModels.map(model => (

                  <div       checked: false      jackson_link: 'https://www.jax.org/strain/013530',      applications: ['Interferon pathway', 'Specific gene studies', 'Immunotherapy', 'JAK inhibitor studies'],

                    key={model.id} 

                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${    }

                      selectedModels.includes(model.id)

                        ? 'border-blue-500 bg-blue-50'  ];      rrid: 'IMSR_JAX:013530',      jackson_link: 'https://www.jax.org/strain/013530',

                        : 'border-gray-200 hover:border-gray-300'

                    }`}

                    onClick={() => handleModelSelect(model.id)}

                  >  const simulateLLMResponse = (query) => {      references: ['PMC8217057', 'PMC7492826'],      rrid: 'IMSR_JAX:013530',

                    <div className="flex justify-between items-start mb-3">

                      <h3 className="text-lg font-semibold text-gray-800">{model.name}</h3>    const lowerQuery = query.toLowerCase();

                      <div className="flex gap-2">

                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{model.species}</span>          key_papers: [      references: ['PMC8217057', 'PMC7492826'],

                        <a 

                          href={model.jackson_link}     if (lowerQuery.includes('ts65dn') || lowerQuery.includes('cognitive')) {

                          target="_blank" 

                          rel="noopener noreferrer"      return 'For cognitive studies, Ts65Dn is the gold standard DS mouse model (RRID: IMSR_JAX:001924). It shows robust learning and memory deficits similar to DS. Recommended tests: Morris Water Maze (spatial learning), Novel Object Recognition (episodic memory), Y-maze (working memory). Consider n≥10 per group, account for sex differences, and control for motor deficits.';        {      key_papers: [

                          className="text-blue-600 hover:text-blue-800"

                          onClick={(e) => e.stopPropagation()}    }

                        >

                          <ExternalLink size={16} />              title: 'Dp(16)1Yey mouse model of Down syndrome',        {

                        </a>

                      </div>    if (lowerQuery.includes('rrid')) {

                    </div>

                          return 'RRIDs (Research Resource Identifiers) are required for proper scientific reporting. For DS models: Ts65Dn (IMSR_JAX:001924), Tc1 (IMSR_JAX:004924), Dp16 (IMSR_JAX:013530), Dp17 (IMSR_JAX:013529). Include RRIDs in your methods section for reproducibility and journal compliance.';          authors: 'Yu et al.',          title: 'Dp(16)1Yey mouse model of Down syndrome',

                    <div className="space-y-2 text-sm mb-3">

                      <div><span className="font-medium">Background:</span> {model.background}</div>    }

                      <div><span className="font-medium">Trisomy:</span> {model.trisomy}</div>

                      <div><span className="font-medium">Genes:</span> {model.genes}</div>          year: '2010',          authors: 'Yu et al.',

                      <div>

                        <span className="font-medium">RRID:</span>{' '}    return 'I can help with DS animal model selection, experimental design, sample size calculations, ARRIVE compliance, and RRID identification. Ask me about specific models, study types, or research guidelines.';

                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">

                          {model.rrid}  };          pmid: '20890288'          year: '2010',

                        </span>

                      </div>

                    </div>

  const handleChat = () => {        }          pmid: '20890288'

                    <div className="mb-3">

                      <span className="font-medium text-sm">Key Phenotypes:</span>    if (!chatInput.trim()) return;

                      <div className="flex flex-wrap gap-1 mt-1">

                        {model.phenotypes.slice(0, 3).map((phenotype, idx) => (          ]        }

                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">

                            {phenotype}    const userMessage = { type: 'user', content: chatInput };

                          </span>

                        ))}    const llmResponse = { type: 'assistant', content: simulateLLMResponse(chatInput) };    },      ]

                        {model.phenotypes.length > 3 && (

                          <span className="text-xs text-gray-500">+{model.phenotypes.length - 3} more</span>    

                        )}

                      </div>    setChatMessages(prev => [...prev, userMessage, llmResponse]);    {    },

                    </div>

    setChatInput('');

                    <div className="mb-3">

                      <span className="font-medium text-sm">Best Applications:</span>  };      id: 'dp17',    {

                      <div className="flex flex-wrap gap-1 mt-1">

                        {model.applications.slice(0, 2).map((app, idx) => (

                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">

                            {app}  const handleModelSelect = (modelId) => {      name: 'Dp(17)1Yey',      id: 'dp17',

                          </span>

                        ))}    setSelectedModels(prev => 

                        {model.applications.length > 2 && (

                          <span className="text-xs text-gray-500">+{model.applications.length - 2} more</span>      prev.includes(modelId)       species: 'Mouse',       name: 'Dp(17)1Yey',

                        )}

                      </div>        ? prev.filter(id => id !== modelId)

                    </div>

        : [...prev, modelId]      background: 'C57BL/6J',      species: 'Mouse', 

                    <div className="text-xs text-gray-500">

                      Click to select for comparison • External link to Jackson Lab    );

                    </div>

                  </div>  };      trisomy: 'Partial (MMU17)',      background: 'C57BL/6J',

                ))}

              </div>

            </div>

          )}  const handleGuidelineCheck = (index) => {      genes: '24 genes',      trisomy: 'Partial (MMU17)',



          {activeTab === 'compare' && (    setGuidelines(prev => prev.map((item, i) => 

            <div>

              <h2 className="text-2xl font-semibold mb-4">Model Comparison</h2>      i === index ? { ...item, checked: !item.checked } : item      phenotypes: ['Mild cognitive deficits', 'Motor learning defects'],      genes: '24 genes',

              {selectedModels.length === 0 ? (

                <div className="text-center py-12 text-gray-500">    ));

                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />

                  <p>Select models from the Animal Models tab to compare them here</p>  };      advantages: ['Smaller gene set', 'Good breeding', 'Controls for Ts65Dn'],      phenotypes: ['Mild cognitive deficits', 'Motor learning defects'],

                </div>

              ) : (

                <div>

                  <div className="overflow-x-auto mb-6">  const exportChecklist = () => {      limitations: ['Mild phenotype', 'Limited applications'],      advantages: ['Smaller gene set', 'Good breeding', 'Controls for Ts65Dn'],

                    <table className="w-full border-collapse">

                      <thead>    const completedItems = guidelines.filter(g => g.checked);

                        <tr className="bg-gray-50">

                          <th className="border p-3 text-left">Feature</th>    const totalItems = guidelines.length;      applications: ['Control studies', 'Gene mapping', 'Complementation analysis'],      limitations: ['Mild phenotype', 'Limited applications'],

                          {selectedModels.map(modelId => {

                            const model = animalModels.find(m => m.id === modelId);    const completionRate = Math.round((completedItems.length / totalItems) * 100);

                            return <th key={modelId} className="border p-3 text-center">{model.name}</th>;

                          })}          jackson_link: 'https://www.jax.org/strain/013529',      applications: ['Control studies', 'Gene mapping', 'Complementation analysis'],

                        </tr>

                      </thead>    const exportText = `ARRIVE Guidelines Checklist Export

                      <tbody>

                        {['background', 'trisomy', 'genes', 'rrid'].map(feature => (Generated: ${new Date().toLocaleDateString()}      rrid: 'IMSR_JAX:013529',      jackson_link: 'https://www.jax.org/strain/013529',

                          <tr key={feature}>

                            <td className="border p-3 font-medium capitalize">Completion: ${completedItems.length}/${totalItems} items (${completionRate}%)

                              {feature === 'rrid' ? 'RRID' : feature.replace('_', ' ')}

                            </td>      references: ['PMC3174970'],      rrid: 'IMSR_JAX:013529',

                            {selectedModels.map(modelId => {

                              const model = animalModels.find(m => m.id === modelId);COMPLETED ITEMS:

                              return (

                                <td key={modelId} className="border p-3 text-center">${completedItems.map(item => `✓ ${item.category}: ${item.item}`).join('\n')}      key_papers: [      references: ['PMC3174970'],

                                  {feature === 'rrid' ? (

                                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">

                                      {model[feature]}

                                    </span>REMAINING ITEMS:        {      key_papers: [

                                  ) : (

                                    model[feature]${guidelines.filter(g => !g.checked).map(item => `☐ ${item.category}: ${item.item}`).join('\n')}

                                  )}

                                </td>`;          title: 'Segmental trisomy mouse models',        {

                              );

                            })}

                          </tr>

                        ))}    const blob = new Blob([exportText], { type: 'text/plain' });          authors: 'Yu et al.',           title: 'Segmental trisomy mouse models',

                      </tbody>

                    </table>    const url = URL.createObjectURL(blob);

                  </div>

    const a = document.createElement('a');          year: '2010',          authors: 'Yu et al.', 

                  <div className="grid gap-6 md:grid-cols-2">

                    {selectedModels.map(modelId => {    a.href = url;

                      const model = animalModels.find(m => m.id === modelId);

                      return (    a.download = 'arrive-checklist.txt';          pmid: '20890288'          year: '2010',

                        <div key={modelId} className="bg-gray-50 rounded-lg p-4">

                          <div className="flex justify-between items-start mb-3">    a.click();

                            <h3 className="font-semibold text-lg">{model.name}</h3>

                            <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">    URL.revokeObjectURL(url);        }          pmid: '20890288'

                              {model.rrid}

                            </span>  };

                          </div>

                                ]        }

                          <div className="mb-3">

                            <h4 className="font-medium text-green-700">Advantages</h4>  const filteredModels = animalModels.filter(model =>

                            <ul className="text-sm list-disc list-inside">

                              {model.advantages.map((adv, idx) => (    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||    }      ]

                                <li key={idx}>{adv}</li>

                              ))}    model.phenotypes.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||

                            </ul>

                          </div>    model.applications.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))  ];    }



                          <div className="mb-3">  );

                            <h4 className="font-medium text-red-700">Limitations</h4>

                            <ul className="text-sm list-disc list-inside">  ];

                              {model.limitations.map((limit, idx) => (

                                <li key={idx}>{limit}</li>  if (loading) {

                              ))}

                            </ul>    return (  // Mock ARRIVE guidelines

                          </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">

                          <div>

                            <h4 className="font-medium text-blue-700">Best Applications</h4>        <div className="text-center">  const arriveGuidelines = [  // Mock ARRIVE guidelines

                            <ul className="text-sm list-disc list-inside">

                              {model.applications.map((app, idx) => (          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>

                                <li key={idx}>{app}</li>

                              ))}          <p className="text-gray-600">Loading DS research data...</p>    { category: 'Study Design', item: 'For each experiment, provide precise details of study design including primary research question, key variables, timeline, and experimental unit', details: '- Primary research question and secondary questions\n- Key dependent and independent variables\n- Study timeline and duration\n- Experimental unit (individual animal, cage, litter)', checked: false },  const arriveGuidelines = [

                            </ul>

                          </div>        </div>

                        </div>

                      );      </div>    { category: 'Study Design', item: 'Explain how sample size was determined', details: '- Power analysis calculations\n- Effect size estimates\n- Alpha and beta levels\n- Reference to pilot data or literature', checked: false },    { category: 'Study Design', item: 'For each experiment, provide precise details of study design including primary research question, key variables, timeline, and experimental unit', details: '- Primary research question and secondary questions\n- Key dependent and independent variables\n- Study timeline and duration\n- Experimental unit (individual animal, cage, litter)', checked: false },

                    })}

                  </div>    );

                </div>

              )}  }    { category: 'Animals', item: 'Provide details of animals used including species, strain, sex, age, source, and health status', details: '- Species, strain, substrain\n- Sex and age/weight\n- Source and vendor\n- Health/microbiological status', checked: false },    { category: 'Study Design', item: 'Explain how sample size was determined', details: '- Power analysis calculations\n- Effect size estimates\n- Alpha and beta levels\n- Reference to pilot data or literature', checked: false },

            </div>

          )}



          {activeTab === 'design' && (  return (    { category: 'Animals', item: 'Explain housing and husbandry conditions', details: '- Housing system and environment\n- Diet and feeding schedule\n- Environmental enrichment\n- Social housing arrangements', checked: false },    { category: 'Animals', item: 'Provide details of animals used including species, strain, sex, age, source, and health status', details: '- Species, strain, substrain\n- Sex and age/weight\n- Source and vendor\n- Health/microbiological status', checked: false },

            <div>

              <h2 className="text-2xl font-semibold mb-4">Study Design Wizard</h2>    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">

              

              <div className="grid md:grid-cols-2 gap-6">      <div className="max-w-7xl mx-auto">    { category: 'Procedures', item: 'For each experimental group describe procedures in detail', details: '- What, how, when, where procedures were carried out\n- Dosing regimens and administration routes\n- Anesthesia and analgesic protocols\n- Method of euthanasia', checked: false },    { category: 'Animals', item: 'Explain housing and husbandry conditions', details: '- Housing system and environment\n- Diet and feeding schedule\n- Environmental enrichment\n- Social housing arrangements', checked: false },

                <div className="space-y-4">

                  <div>        <header className="text-center mb-8">

                    <label className="block text-sm font-medium mb-2">Research Question</label>

                    <textarea          <h1 className="text-4xl font-bold text-gray-800 mb-2">DS Research Assistant</h1>    { category: 'Procedures', item: 'Describe experimental outcomes and how they were assessed', details: '- Primary and secondary outcome measures\n- Assessment methods and timing\n- Who assessed outcomes and whether blinded\n- Quality control measures', checked: false },    { category: 'Procedures', item: 'For each experimental group describe procedures in detail', details: '- What, how, when, where procedures were carried out\n- Dosing regimens and administration routes\n- Anesthesia and analgesic protocols\n- Method of euthanasia', checked: false },

                      placeholder="What is your main research question? e.g., 'Does compound X improve learning deficits in Ts65Dn mice?'"

                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"          <p className="text-gray-600">Down syndrome animal model comparison and experimental design guidance</p>

                      rows="3"

                    />          <div className="text-sm text-gray-500 mt-2 bg-white/50 rounded-lg p-2 inline-block">    { category: 'Statistics', item: 'Describe statistical methods for each analysis', details: '- Statistical tests used and rationale\n- Unit of analysis and experimental unit\n- How data were handled (transformations, outliers)\n- Multiple comparisons corrections', checked: false },    { category: 'Procedures', item: 'Describe experimental outcomes and how they were assessed', details: '- Primary and secondary outcome measures\n- Assessment methods and timing\n- Who assessed outcomes and whether blinded\n- Quality control measures', checked: false },

                  </div>

            💡 100% Open Source • Free GitHub Hosting • ARRIVE/FAIR compliant

                  <div className="grid grid-cols-2 gap-4">

                    <div>          </div>    { category: 'Statistics', item: 'Report exact P values and effect sizes where possible', details: '- Exact P values (not just <0.05)\n- Confidence intervals\n- Effect sizes with interpretation\n- Number of animals in each analysis', checked: false },    { category: 'Statistics', item: 'Describe statistical methods for each analysis', details: '- Statistical tests used and rationale\n- Unit of analysis and experimental unit\n- How data were handled (transformations, outliers)\n- Multiple comparisons corrections', checked: false },

                      <label className="block text-sm font-medium mb-2">Animal Model</label>

                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">        </header>

                        <option value="">Select model...</option>

                        {animalModels.map(model => (    { category: 'Results', item: 'Report study timeline and actual sample sizes', details: '- When study was performed\n- Number of animals in each group at each time point\n- Reasons for attrition or exclusion\n- Flow diagram if complex design', checked: false },    { category: 'Statistics', item: 'Report exact P values and effect sizes where possible', details: '- Exact P values (not just <0.05)\n- Confidence intervals\n- Effect sizes with interpretation\n- Number of animals in each analysis', checked: false },

                          <option key={model.id} value={model.id}>{model.name}</option>

                        ))}        <nav className="flex justify-center mb-8">

                      </select>

                    </div>          <div className="bg-white rounded-lg p-1 shadow-lg">    { category: 'Results', item: 'Present results for each analysis with appropriate statistics', details: '- Raw data or summary statistics\n- Variability measures (SD, SEM, CI)\n- Statistical test results\n- Biological as well as statistical significance', checked: false }    { category: 'Results', item: 'Report study timeline and actual sample sizes', details: '- When study was performed\n- Number of animals in each group at each time point\n- Reasons for attrition or exclusion\n- Flow diagram if complex design', checked: false },



                    <div>            {[

                      <label className="block text-sm font-medium mb-2">Study Type</label>

                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">              { id: 'models', label: 'Animal Models', icon: Search },  ];    { category: 'Results', item: 'Present results for each analysis with appropriate statistics', details: '- Raw data or summary statistics\n- Variability measures (SD, SEM, CI)\n- Statistical test results\n- Biological as well as statistical significance', checked: false }

                        <option value="">Select type...</option>

                        <option value="cognitive">Cognitive/Behavioral</option>              { id: 'compare', label: 'Compare', icon: FileText },

                        <option value="molecular">Molecular/Biochemical</option>

                        <option value="therapeutic">Therapeutic intervention</option>              { id: 'design', label: 'Study Design', icon: Info },  ];

                        <option value="pathophysiology">Pathophysiology</option>

                      </select>              { id: 'guidelines', label: 'ARRIVE Check', icon: CheckSquare },

                    </div>

                  </div>              { id: 'chat', label: 'AI Assistant', icon: BookOpen }  const [guidelines, setGuidelines] = useState(arriveGuidelines);



                  <div className="grid grid-cols-2 gap-4">            ].map(tab => (

                    <div>

                      <label className="block text-sm font-medium mb-2">Sample Size per Group</label>              <button  const [guidelines, setGuidelines] = useState(arriveGuidelines);

                      <input

                        type="number"                key={tab.id}

                        placeholder="e.g., 10"

                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"                onClick={() => setActiveTab(tab.id)}  // Simulate LLM chat response with DS-specific knowledge

                      />

                    </div>                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${



                    <div>                  activeTab === tab.id  const simulateLLMResponse = (query) => {  // Simulate LLM chat response with DS-specific knowledge

                      <label className="block text-sm font-medium mb-2">Study Duration</label>

                      <input                    ? 'bg-blue-500 text-white shadow-md'

                        type="text"

                        placeholder="e.g., 8 weeks"                    : 'text-gray-600 hover:bg-gray-100'    const lowerQuery = query.toLowerCase();  const simulateLLMResponse = (query) => {

                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"

                      />                }`}

                    </div>

                  </div>              >        const lowerQuery = query.toLowerCase();



                  <div>                <tab.icon size={16} />

                    <label className="block text-sm font-medium mb-2">Primary Endpoint</label>

                    <input                {tab.label}    if (lowerQuery.includes('ts65dn') || lowerQuery.includes('cognitive')) {    

                      type="text"

                      placeholder="e.g., Performance in Morris Water Maze"              </button>

                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"

                    />            ))}      return 'For cognitive studies, Ts65Dn is the gold standard DS mouse model (RRID: IMSR_JAX:001924). It shows robust learning and memory deficits similar to DS. Recommended tests: Morris Water Maze (spatial learning), Novel Object Recognition (episodic memory), Y-maze (working memory). Consider n≥10 per group, account for sex differences, and control for motor deficits.';    if (lowerQuery.includes('ts65dn') || lowerQuery.includes('cognitive')) {

                  </div>

                </div>          </div>



                <div className="bg-blue-50 p-4 rounded-lg">        </nav>    }      return 'For cognitive studies, Ts65Dn is the gold standard DS mouse model (RRID: IMSR_JAX:001924). It shows robust learning and memory deficits similar to DS. Recommended tests: Morris Water Maze (spatial learning), Novel Object Recognition (episodic memory), Y-maze (working memory). Consider n≥10 per group, account for sex differences, and control for motor deficits.';

                  <h3 className="font-medium text-blue-800 mb-3">💡 Design Recommendations</h3>

                  <div className="space-y-3 text-sm text-blue-700">

                    <div>

                      <h4 className="font-medium">Sample Size Guidelines:</h4>        <div className="bg-white rounded-xl shadow-lg p-6">        }

                      <ul className="list-disc list-inside mt-1">

                        <li>Behavioral studies: n≥10 per group</li>          {activeTab === 'models' && (

                        <li>Molecular studies: n≥6 per group</li>

                        <li>Use G*Power for calculations</li>            <div>    if (lowerQuery.includes('tc1') || lowerQuery.includes('human')) {    

                        <li>Account for 10-20% attrition</li>

                      </ul>              <div className="mb-6">

                    </div>

                                    <div className="relative">      return 'Tc1 mice (RRID: IMSR_JAX:004924) carry the complete human chromosome 21, making them genetically most similar to DS. However, they have breeding difficulties and high mortality. Best for molecular studies and understanding gene dosage effects. Limited availability - contact research colonies directly.';    if (lowerQuery.includes('tc1') || lowerQuery.includes('human')) {

                    <div>

                      <h4 className="font-medium">Experimental Design:</h4>                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />

                      <ul className="list-disc list-inside mt-1">

                        <li>Include both sexes (sex as biological variable)</li>                  <input    }      return 'Tc1 mice (RRID: IMSR_JAX:004924) carry the complete human chromosome 21, making them genetically most similar to DS. However, they have breeding difficulties and high mortality. Best for molecular studies and understanding gene dosage effects. Limited availability - contact research colonies directly.';

                        <li>Randomize cage assignments</li>

                        <li>Blind investigators to treatment</li>                    type="text"

                        <li>Use appropriate controls</li>

                      </ul>                    placeholder="Search models by name, phenotype, or application..."        }

                    </div>

                    value={searchQuery}

                    <div>

                      <h4 className="font-medium">Common Endpoints by Model:</h4>                    onChange={(e) => setSearchQuery(e.target.value)}    if (lowerQuery.includes('dp16') || lowerQuery.includes('interferon') || lowerQuery.includes('immune')) {    

                      <ul className="list-disc list-inside mt-1">

                        <li>Ts65Dn: Morris Water Maze, Y-maze, NOR</li>                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                        <li>Tc1: Molecular markers, gene expression</li>

                        <li>Dp16: Cytokines, interferon signaling</li>                  />      return 'Dp(16)1Yey mice (RRID: IMSR_JAX:013530) are excellent for interferon pathway and immunotherapy studies. They show hyperactive IFN signaling like DS individuals. Perfect for JAK inhibitor studies (ruxolitinib), cytokine analysis, and neuroinflammation research. Good breeding performance.';    if (lowerQuery.includes('dp16') || lowerQuery.includes('interferon') || lowerQuery.includes('immune')) {

                      </ul>

                    </div>                </div>



                    <div>              </div>    }      return 'Dp(16)1Yey mice (RRID: IMSR_JAX:013530) are excellent for interferon pathway and immunotherapy studies. They show hyperactive IFN signaling like DS individuals. Perfect for JAK inhibitor studies (ruxolitinib), cytokine analysis, and neuroinflammation research. Good breeding performance.';

                      <h4 className="font-medium">RRID Usage:</h4>

                      <ul className="list-disc list-inside mt-1">

                        <li>Always include RRIDs in methods</li>

                        <li>Required by most journals</li>              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">        }

                        <li>Ensures reproducibility</li>

                      </ul>                {filteredModels.map(model => (

                    </div>

                  </div>                  <div     if (lowerQuery.includes('sample size') || lowerQuery.includes('power')) {    

                </div>

              </div>                    key={model.id} 

            </div>

          )}                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${      return 'Sample size depends on effect size and variability. For behavioral studies: n=8-12 per group (80% power, α=0.05). For molecular studies: n=6-8 may suffice. Use G*Power calculator. Account for potential dropouts (~10-20%). Consider sex as biological variable (equal males/females).';    if (lowerQuery.includes('sample size') || lowerQuery.includes('power')) {



          {activeTab === 'guidelines' && (                      selectedModels.includes(model.id)

            <div>

              <div className="flex justify-between items-center mb-4">                        ? 'border-blue-500 bg-blue-50'    }      return 'Sample size depends on effect size and variability. For behavioral studies: n=8-12 per group (80% power, α=0.05). For molecular studies: n=6-8 may suffice. Use G*Power calculator. Account for potential dropouts (~10-20%). Consider sex as biological variable (equal males/females).';

                <h2 className="text-2xl font-semibold">ARRIVE Guidelines Checklist</h2>

                <button                        : 'border-gray-200 hover:border-gray-300'

                  onClick={exportChecklist}

                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"                    }`}        }

                >

                  <Download size={16} />                    onClick={() => handleModelSelect(model.id)}

                  Export Checklist

                </button>                  >    if (lowerQuery.includes('rrid') || lowerQuery.includes('identifier')) {    

              </div>

                    <div className="flex justify-between items-start mb-3">

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">

                <div className="text-sm">                      <h3 className="text-lg font-semibold text-gray-800">{model.name}</h3>      return 'RRIDs (Research Resource Identifiers) are required for proper scientific reporting. For DS models: Ts65Dn (IMSR_JAX:001924), Tc1 (IMSR_JAX:004924), Dp16 (IMSR_JAX:013530), Dp17 (IMSR_JAX:013529). Include RRIDs in your methods section for reproducibility and journal compliance.';    if (lowerQuery.includes('rrid') || lowerQuery.includes('identifier')) {

                  Completed: {guidelines.filter(g => g.checked).length}/{guidelines.length} items

                </div>                      <div className="flex gap-2">

                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">

                  <div                         <span className="text-xs bg-gray-200 px-2 py-1 rounded">{model.species}</span>    }      return 'RRIDs (Research Resource Identifiers) are required for proper scientific reporting. For DS models: Ts65Dn (IMSR_JAX:001924), Tc1 (IMSR_JAX:004924), Dp16 (IMSR_JAX:013530), Dp17 (IMSR_JAX:013529). Include RRIDs in your methods section for reproducibility and journal compliance.';

                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"

                    style={{ width: `${(guidelines.filter(g => g.checked).length / guidelines.length) * 100}%` }}                        <a 

                  ></div>

                </div>                          href={model.jackson_link}         }

              </div>

                                        target="_blank" 

              <div className="space-y-3">

                {guidelines.map((item, index) => (                          rel="noopener noreferrer"    if (lowerQuery.includes('arrive') || lowerQuery.includes('guidelines')) {    

                  <div 

                    key={index}                          className="text-blue-600 hover:text-blue-800"

                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${

                      item.checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'                          onClick={(e) => e.stopPropagation()}      return 'ARRIVE guidelines ensure reproducible research. Key points: detailed methods, randomization, blinding, appropriate statistics, exact sample sizes, housing conditions. Use our checklist tab to ensure compliance. Funding agencies increasingly require ARRIVE compliance.';    if (lowerQuery.includes('arrive') || lowerQuery.includes('guidelines')) {

                    }`}

                    onClick={() => handleGuidelineCheck(index)}                        >

                  >

                    <div className="flex items-start gap-3">                          <ExternalLink size={16} />    }      return 'ARRIVE guidelines ensure reproducible research. Key points: detailed methods, randomization, blinding, appropriate statistics, exact sample sizes, housing conditions. Use our checklist tab to ensure compliance. Funding agencies increasingly require ARRIVE compliance.';

                      <CheckSquare 

                        size={20}                         </a>

                        className={item.checked ? 'text-green-600' : 'text-gray-400'}

                      />                      </div>    }

                      <div className="flex-1">

                        <div className="font-medium text-sm text-blue-600 mb-1">{item.category}</div>                    </div>

                        <div className="text-sm text-gray-700 mb-2">{item.item}</div>

                        {item.details && (                        return 'I can help with DS animal model selection, experimental design, sample size calculations, ARRIVE compliance, and RRID identification. Ask me about specific models (Ts65Dn, Tc1, Dp16), study types (cognitive, molecular, therapeutic), or research guidelines.';

                          <div className="text-xs text-gray-500 whitespace-pre-line">{item.details}</div>

                        )}                    <div className="space-y-2 text-sm mb-3">

                      </div>

                    </div>                      <div><span className="font-medium">Background:</span> {model.background}</div>  };    return 'I can help with DS animal model selection, experimental design, sample size calculations, ARRIVE compliance, and RRID identification. Ask me about specific models (Ts65Dn, Tc1, Dp16), study types (cognitive, molecular, therapeutic), or research guidelines.';

                  </div>

                ))}                      <div><span className="font-medium">Trisomy:</span> {model.trisomy}</div>

              </div>

            </div>                      <div><span className="font-medium">Genes:</span> {model.genes}</div>  };

          )}

                      <div>

          {activeTab === 'chat' && (

            <div>                        <span className="font-medium">RRID:</span>{' '}  const handleChat = () => {

              <h2 className="text-2xl font-semibold mb-4">AI Research Assistant</h2>

              <div className="border rounded-lg h-96 flex flex-col">                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">

                <div className="flex-1 p-4 overflow-y-auto space-y-4">

                  {chatMessages.length === 0 ? (                          {model.rrid}    if (!chatInput.trim()) return;  const handleChat = () => {

                    <div className="text-center text-gray-500 mt-8">

                      <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />                        </span>

                      <p className="mb-4">Ask me about DS animal models, experimental design, or research guidance!</p>

                      <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg">                      </div>        if (!chatInput.trim()) return;

                        <p><strong>Try asking:</strong></p>

                        <p>• "Which model is best for cognitive studies?"</p>                    </div>

                        <p>• "How many mice do I need for behavioral testing?"</p>

                        <p>• "What are the advantages of Ts65Dn vs Tc1?"</p>    const userMessage = { type: 'user', content: chatInput };    

                        <p>• "Design tips for immunotherapy studies?"</p>

                        <p>• "What RRID should I use for Dp16 mice?"</p>                    <div className="mb-3">

                        <p>• "ARRIVE guidelines for my study?"</p>

                      </div>                      <span className="font-medium text-sm">Key Phenotypes:</span>    const llmResponse = { type: 'assistant', content: simulateLLMResponse(chatInput) };    const userMessage = { type: 'user', content: chatInput };

                    </div>

                  ) : (                      <div className="flex flex-wrap gap-1 mt-1">

                    chatMessages.map((msg, idx) => (

                      <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>                        {model.phenotypes.slice(0, 3).map((phenotype, idx) => (        const llmResponse = { type: 'assistant', content: simulateLLMResponse(chatInput) };

                        <div className={`max-w-[80%] p-3 rounded-lg ${

                          msg.type === 'user'                           <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">

                            ? 'bg-blue-500 text-white' 

                            : 'bg-gray-100 text-gray-800'                            {phenotype}    setChatMessages(prev => [...prev, userMessage, llmResponse]);    

                        }`}>

                          <div className="whitespace-pre-wrap">{msg.content}</div>                          </span>

                        </div>

                      </div>                        ))}    setChatInput('');    setChatMessages(prev => [...prev, userMessage, llmResponse]);

                    ))

                  )}                        {model.phenotypes.length > 3 && (

                </div>

                <div className="border-t p-4 flex gap-2">                          <span className="text-xs text-gray-500">+{model.phenotypes.length - 3} more</span>  };    setChatInput('');

                  <input

                    type="text"                        )}

                    value={chatInput}

                    onChange={(e) => setChatInput(e.target.value)}                      </div>  };

                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}

                    placeholder="Ask about DS models, experimental design, RRIDs, sample sizes..."                    </div>

                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"

                  />  const handleModelSelect = (modelId) => {

                  <button

                    onClick={handleChat}                    <div className="mb-3">

                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"

                  >                      <span className="font-medium text-sm">Best Applications:</span>    setSelectedModels(prev =>   const handleModelSelect = (modelId) => {

                    Send

                  </button>                      <div className="flex flex-wrap gap-1 mt-1">

                </div>

              </div>                        {model.applications.slice(0, 2).map((app, idx) => (      prev.includes(modelId)     setSelectedModels(prev => 

            </div>

          )}                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">

        </div>

                            {app}        ? prev.filter(id => id !== modelId)      prev.includes(modelId) 

        <footer className="text-center text-gray-500 text-sm mt-8">

          <p>DS Research Assistant • Open Source •                           </span>

            <a href="https://github.com/YOUR_USERNAME/ds-research-tool" className="text-blue-600 hover:underline ml-1">

              View on GitHub                        ))}        : [...prev, modelId]        ? prev.filter(id => id !== modelId)

            </a>

          </p>                        {model.applications.length > 2 && (

          <p className="mt-2">✨ Featuring proper RRIDs for reproducible research</p>

        </footer>                          <span className="text-xs text-gray-500">+{model.applications.length - 2} more</span>    );        : [...prev, modelId]

      </div>

    </div>                        )}

  );

};                      </div>  };    );



export default DSResearchTool;                    </div>

  };

                    <div className="text-xs text-gray-500">

                      Click to select for comparison • External link to Jackson Lab  const handleGuidelineCheck = (index) => {

                    </div>

                  </div>    setGuidelines(prev => prev.map((item, i) =>   const handleGuidelineCheck = (index) => {

                ))}

              </div>      i === index ? { ...item, checked: !item.checked } : item    setGuidelines(prev => prev.map((item, i) => 

            </div>

          )}    ));      i === index ? { ...item, checked: !item.checked } : item



          {activeTab === 'compare' && (  };    ));

            <div>

              <h2 className="text-2xl font-semibold mb-4">Model Comparison</h2>  };

              {selectedModels.length === 0 ? (

                <div className="text-center py-12 text-gray-500">  const exportChecklist = () => {

                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />

                  <p>Select models from the Animal Models tab to compare them here</p>    const completedItems = guidelines.filter(g => g.checked);  const exportChecklist = () => {

                </div>

              ) : (    const totalItems = guidelines.length;    const completedItems = guidelines.filter(g => g.checked);

                <div>

                  <div className="overflow-x-auto mb-6">    const completionRate = Math.round((completedItems.length / totalItems) * 100);    const totalItems = guidelines.length;

                    <table className="w-full border-collapse">

                      <thead>        const completionRate = Math.round((completedItems.length / totalItems) * 100);

                        <tr className="bg-gray-50">

                          <th className="border p-3 text-left">Feature</th>    const exportText = `ARRIVE Guidelines Checklist Export    

                          {selectedModels.map(modelId => {

                            const model = animalModels.find(m => m.id === modelId);Generated: ${new Date().toLocaleDateString()}    const exportText = `ARRIVE Guidelines Checklist Export

                            return <th key={modelId} className="border p-3 text-center">{model.name}</th>;

                          })}Completion: ${completedItems.length}/${totalItems} items (${completionRate}%)Generated: ${new Date().toLocaleDateString()}

                        </tr>

                      </thead>Completion: ${completedItems.length}/${totalItems} items (${completionRate}%)

                      <tbody>

                        {['background', 'trisomy', 'genes', 'rrid'].map(feature => (COMPLETED ITEMS:

                          <tr key={feature}>

                            <td className="border p-3 font-medium capitalize">${completedItems.map(item => `✓ ${item.category}: ${item.item}`).join('\n')}COMPLETED ITEMS:

                              {feature === 'rrid' ? 'RRID' : feature.replace('_', ' ')}

                            </td>${completedItems.map(item => `✓ ${item.category}: ${item.item}`).join('\n')}

                            {selectedModels.map(modelId => {

                              const model = animalModels.find(m => m.id === modelId);REMAINING ITEMS:

                              return (

                                <td key={modelId} className="border p-3 text-center">${guidelines.filter(g => !g.checked).map(item => `☐ ${item.category}: ${item.item}`).join('\n')}REMAINING ITEMS:

                                  {feature === 'rrid' ? (

                                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">`;${guidelines.filter(g => !g.checked).map(item => `☐ ${item.category}: ${item.item}`).join('\n')}

                                      {model[feature]}

                                    </span>`;

                                  ) : (

                                    model[feature]    const blob = new Blob([exportText], { type: 'text/plain' });

                                  )}

                                </td>    const url = URL.createObjectURL(blob);    const blob = new Blob([exportText], { type: 'text/plain' });

                              );

                            })}    const a = document.createElement('a');    const url = URL.createObjectURL(blob);

                          </tr>

                        ))}    a.href = url;    const a = document.createElement('a');

                      </tbody>

                    </table>    a.download = 'arrive-checklist.txt';    a.href = url;

                  </div>

    a.click();    a.download = 'arrive-checklist.txt';

                  <div className="grid gap-6 md:grid-cols-2">

                    {selectedModels.map(modelId => {    URL.revokeObjectURL(url);    a.click();

                      const model = animalModels.find(m => m.id === modelId);

                      return (  };    URL.revokeObjectURL(url);

                        <div key={modelId} className="bg-gray-50 rounded-lg p-4">

                          <div className="flex justify-between items-start mb-3">  };

                            <h3 className="font-semibold text-lg">{model.name}</h3>

                            <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">  const filteredModels = animalModels.filter(model =>

                              {model.rrid}

                            </span>    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||  const filteredModels = animalModels.filter(model =>

                          </div>

                              model.phenotypes.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

                          <div className="mb-3">

                            <h4 className="font-medium text-green-700">Advantages</h4>    model.applications.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))    model.phenotypes.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||

                            <ul className="text-sm list-disc list-inside">

                              {model.advantages.map((adv, idx) => (  );    model.applications.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))

                                <li key={idx}>{adv}</li>

                              ))}  );

                            </ul>

                          </div>  return (        



                          <div className="mb-3">    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">        // Flatten guidelines for checklist

                            <h4 className="font-medium text-red-700">Limitations</h4>

                            <ul className="text-sm list-disc list-inside">      <div className="max-w-7xl mx-auto">        const flatGuidelines = guidelinesData.flatMap(category => 

                              {model.limitations.map((limit, idx) => (

                                <li key={idx}>{limit}</li>        <header className="text-center mb-8">          category.items.map(item => ({

                              ))}

                            </ul>          <h1 className="text-4xl font-bold text-gray-800 mb-2">DS Research Assistant</h1>            category: category.category,

                          </div>

          <p className="text-gray-600">Down syndrome animal model comparison and experimental design guidance</p>            ...item,

                          <div>

                            <h4 className="font-medium text-blue-700">Best Applications</h4>          <div className="text-sm text-gray-500 mt-2 bg-white/50 rounded-lg p-2 inline-block">            checked: false

                            <ul className="text-sm list-disc list-inside">

                              {model.applications.map((app, idx) => (            💡 100% Open Source • Free GitHub Hosting • ARRIVE/FAIR compliant          }))

                                <li key={idx}>{app}</li>

                              ))}          </div>        );

                            </ul>

                          </div>        </header>        setGuidelines(flatGuidelines);

                        </div>

                      );        setLoading(false);

                    })}

                  </div>        <nav className="flex justify-center mb-8">      } catch (error) {

                </div>

              )}          <div className="bg-white rounded-lg p-1 shadow-lg">        console.error('Error loading data:', error);

            </div>

          )}            {[        setLoading(false);



          {activeTab === 'design' && (              { id: 'models', label: 'Animal Models', icon: Search },      }

            <div>

              <h2 className="text-2xl font-semibold mb-4">Study Design Wizard</h2>              { id: 'compare', label: 'Compare', icon: FileText },    };

              

              <div className="grid md:grid-cols-2 gap-6">              { id: 'design', label: 'Study Design', icon: Info },

                <div className="space-y-4">

                  <div>              { id: 'guidelines', label: 'ARRIVE Check', icon: CheckSquare },    loadData();

                    <label className="block text-sm font-medium mb-2">Research Question</label>

                    <textarea              { id: 'chat', label: 'AI Assistant', icon: BookOpen }  }, []);

                      placeholder="What is your main research question? e.g., 'Does compound X improve learning deficits in Ts65Dn mice?'"

                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"            ].map(tab => (

                      rows="3"

                    />              <button  if (loading) {

                  </div>

                key={tab.id}    return (

                  <div className="grid grid-cols-2 gap-4">

                    <div>                onClick={() => setActiveTab(tab.id)}      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">

                      <label className="block text-sm font-medium mb-2">Animal Model</label>

                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${        <div className="text-center">

                        <option value="">Select model...</option>

                        {animalModels.map(model => (                  activeTab === tab.id          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>

                          <option key={model.id} value={model.id}>{model.name}</option>

                        ))}                    ? 'bg-blue-500 text-white shadow-md'          <p className="text-gray-600">Loading DS research data...</p>

                      </select>

                    </div>                    : 'text-gray-600 hover:bg-gray-100'        </div>



                    <div>                }`}      </div>

                      <label className="block text-sm font-medium mb-2">Study Type</label>

                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">              >    );

                        <option value="">Select type...</option>

                        <option value="cognitive">Cognitive/Behavioral</option>                <tab.icon size={16} />  }

                        <option value="molecular">Molecular/Biochemical</option>

                        <option value="therapeutic">Therapeutic intervention</option>                {tab.label}  return (

                        <option value="pathophysiology">Pathophysiology</option>

                      </select>              </button>    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>

                    </div>

                  </div>            ))}      <div className='max-w-7xl mx-auto'>



                  <div className="grid grid-cols-2 gap-4">          </div>        <header className='text-center mb-8'>

                    <div>

                      <label className="block text-sm font-medium mb-2">Sample Size per Group</label>        </nav>          <h1 className='text-4xl font-bold text-gray-800 mb-2'>DS Research Assistant</h1>

                      <input

                        type="number"          <p className='text-gray-600'>Down syndrome animal model comparison and experimental design guidance</p>

                        placeholder="e.g., 10"

                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"        <div className="bg-white rounded-xl shadow-lg p-6">          <div className="text-sm text-gray-500 mt-2 bg-white/50 rounded-lg p-2 inline-block">

                      />

                    </div>          {activeTab === 'models' && (            💡 100% Open Source • Free GitHub Hosting • ARRIVE/FAIR compliant



                    <div>            <div>          </div>

                      <label className="block text-sm font-medium mb-2">Study Duration</label>

                      <input              <div className="mb-6">        </header>

                        type="text"

                        placeholder="e.g., 8 weeks"                <div className="relative">

                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"

                      />                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />        <nav className="flex justify-center mb-8">

                    </div>

                  </div>                  <input          <div className="bg-white rounded-lg p-1 shadow-lg">



                  <div>                    type="text"            {[

                    <label className="block text-sm font-medium mb-2">Primary Endpoint</label>

                    <input                    placeholder="Search models by name, phenotype, or application..."              { id: 'models', label: 'Animal Models', icon: Search },

                      type="text"

                      placeholder="e.g., Performance in Morris Water Maze"                    value={searchQuery}              { id: 'compare', label: 'Compare', icon: FileText },

                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"

                    />                    onChange={(e) => setSearchQuery(e.target.value)}              { id: 'design', label: 'Study Design', icon: Info },

                  </div>

                </div>                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"              { id: 'guidelines', label: 'ARRIVE Check', icon: CheckSquare },



                <div className="bg-blue-50 p-4 rounded-lg">                  />              { id: 'chat', label: 'AI Assistant', icon: BookOpen }

                  <h3 className="font-medium text-blue-800 mb-3">💡 Design Recommendations</h3>

                  <div className="space-y-3 text-sm text-blue-700">                </div>            ].map(tab => (

                    <div>

                      <h4 className="font-medium">Sample Size Guidelines:</h4>              </div>              <button

                      <ul className="list-disc list-inside mt-1">

                        <li>Behavioral studies: n≥10 per group</li>                key={tab.id}

                        <li>Molecular studies: n≥6 per group</li>

                        <li>Use G*Power for calculations</li>              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">                onClick={() => setActiveTab(tab.id)}

                        <li>Account for 10-20% attrition</li>

                      </ul>                {filteredModels.map(model => (                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${

                    </div>

                                      <div                   activeTab === tab.id

                    <div>

                      <h4 className="font-medium">Experimental Design:</h4>                    key={model.id}                     ? 'bg-blue-500 text-white shadow-md'

                      <ul className="list-disc list-inside mt-1">

                        <li>Include both sexes (sex as biological variable)</li>                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${                    : 'text-gray-600 hover:bg-gray-100'

                        <li>Randomize cage assignments</li>

                        <li>Blind investigators to treatment</li>                      selectedModels.includes(model.id)                }`}

                        <li>Use appropriate controls</li>

                      </ul>                        ? 'border-blue-500 bg-blue-50'              >

                    </div>

                        : 'border-gray-200 hover:border-gray-300'                <tab.icon size={16} />

                    <div>

                      <h4 className="font-medium">Common Endpoints by Model:</h4>                    }`}                {tab.label}

                      <ul className="list-disc list-inside mt-1">

                        <li>Ts65Dn: Morris Water Maze, Y-maze, NOR</li>                    onClick={() => handleModelSelect(model.id)}              </button>

                        <li>Tc1: Molecular markers, gene expression</li>

                        <li>Dp16: Cytokines, interferon signaling</li>                  >            ))}

                      </ul>

                    </div>                    <div className="flex justify-between items-start mb-3">          </div>



                    <div>                      <h3 className="text-lg font-semibold text-gray-800">{model.name}</h3>        </nav>

                      <h4 className="font-medium">RRID Usage:</h4>

                      <ul className="list-disc list-inside mt-1">                      <div className="flex gap-2">        <div className='bg-white rounded-xl shadow-lg p-6'>

                        <li>Always include RRIDs in methods</li>

                        <li>Required by most journals</li>                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{model.species}</span>          {activeTab === 'models' && (

                        <li>Ensures reproducibility</li>

                      </ul>                        <a             <div>

                    </div>

                  </div>                          href={model.jackson_link}               <h2 className="text-2xl font-semibold mb-4">Animal Models</h2>

                </div>

              </div>                          target="_blank"               <p className="text-gray-600 mb-4">Browse DS mouse models for your research</p>

            </div>

          )}                          rel="noopener noreferrer"              <div className="grid gap-4 md:grid-cols-2">



          {activeTab === 'guidelines' && (                          className="text-blue-600 hover:text-blue-800"                <div className="border rounded-lg p-4">

            <div>

              <div className="flex justify-between items-center mb-4">                          onClick={(e) => e.stopPropagation()}                  <h3 className="font-semibold text-lg mb-2">Ts65Dn</h3>

                <h2 className="text-2xl font-semibold">ARRIVE Guidelines Checklist</h2>

                <button                        >                  <p className="text-sm text-gray-600 mb-2">Most widely used DS mouse model</p>

                  onClick={exportChecklist}

                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"                          <ExternalLink size={16} />                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-block">

                >

                  <Download size={16} />                        </a>                    Cognitive studies

                  Export Checklist

                </button>                      </div>                  </div>

              </div>

                    </div>                </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">

                <div className="text-sm">                                    <div className="border rounded-lg p-4">

                  Completed: {guidelines.filter(g => g.checked).length}/{guidelines.length} items

                </div>                    <div className="space-y-2 text-sm mb-3">                  <h3 className="font-semibold text-lg mb-2">Tc1</h3>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">

                  <div                       <div><span className="font-medium">Background:</span> {model.background}</div>                  <p className="text-sm text-gray-600 mb-2">Complete human chromosome 21</p>

                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"

                    style={{ width: `${(guidelines.filter(g => g.checked).length / guidelines.length) * 100}%` }}                      <div><span className="font-medium">Trisomy:</span> {model.trisomy}</div>                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded inline-block">

                  ></div>

                </div>                      <div><span className="font-medium">Genes:</span> {model.genes}</div>                    Molecular studies

              </div>

                                    <div>                  </div>

              <div className="space-y-3">

                {guidelines.map((item, index) => (                        <span className="font-medium">RRID:</span>{' '}                </div>

                  <div 

                    key={index}                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">              </div>

                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${

                      item.checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'                          {model.rrid}            </div>

                    }`}

                    onClick={() => handleGuidelineCheck(index)}                        </span>          )}

                  >

                    <div className="flex items-start gap-3">                      </div>          

                      <CheckSquare 

                        size={20}                     </div>          {activeTab === 'compare' && (

                        className={item.checked ? 'text-green-600' : 'text-gray-400'}

                      />            <div>

                      <div className="flex-1">

                        <div className="font-medium text-sm text-blue-600 mb-1">{item.category}</div>                    <div className="mb-3">              <h2 className="text-2xl font-semibold mb-4">Model Comparison</h2>

                        <div className="text-sm text-gray-700 mb-2">{item.item}</div>

                        {item.details && (                      <span className="font-medium text-sm">Key Phenotypes:</span>              <p className="text-gray-600">Select models from the Animal Models tab to compare them here</p>

                          <div className="text-xs text-gray-500 whitespace-pre-line">{item.details}</div>

                        )}                      <div className="flex flex-wrap gap-1 mt-1">            </div>

                      </div>

                    </div>                        {model.phenotypes.slice(0, 3).map((phenotype, idx) => (          )}

                  </div>

                ))}                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">          

              </div>

            </div>                            {phenotype}          {activeTab === 'design' && (

          )}

                          </span>            <div>

          {activeTab === 'chat' && (

            <div>                        ))}              <h2 className="text-2xl font-semibold mb-4">Study Design Wizard</h2>

              <h2 className="text-2xl font-semibold mb-4">AI Research Assistant</h2>

              <div className="border rounded-lg h-96 flex flex-col">                        {model.phenotypes.length > 3 && (              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

                <div className="flex-1 p-4 overflow-y-auto space-y-4">

                  {chatMessages.length === 0 ? (                          <span className="text-xs text-gray-500">+{model.phenotypes.length - 3} more</span>                <h3 className="font-semibold text-blue-800 mb-2">🎯 Research Question</h3>

                    <div className="text-center text-gray-500 mt-8">

                      <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />                        )}                <p className="text-blue-700">

                      <p className="mb-4">Ask me about DS animal models, experimental design, or research guidance!</p>

                      <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg">                      </div>                  Clearly define your research question before selecting an animal model.

                        <p><strong>Try asking:</strong></p>

                        <p>• "Which model is best for cognitive studies?"</p>                    </div>                </p>

                        <p>• "How many mice do I need for behavioral testing?"</p>

                        <p>• "What are the advantages of Ts65Dn vs Tc1?"</p>              </div>

                        <p>• "Design tips for immunotherapy studies?"</p>

                        <p>• "What RRID should I use for Dp16 mice?"</p>                    <div className="mb-3">            </div>

                        <p>• "ARRIVE guidelines for my study?"</p>

                      </div>                      <span className="font-medium text-sm">Best Applications:</span>          )}

                    </div>

                  ) : (                      <div className="flex flex-wrap gap-1 mt-1">          

                    chatMessages.map((msg, idx) => (

                      <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>                        {model.applications.slice(0, 2).map((app, idx) => (          {activeTab === 'guidelines' && (

                        <div className={`max-w-[80%] p-3 rounded-lg ${

                          msg.type === 'user'                           <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">            <div>

                            ? 'bg-blue-500 text-white' 

                            : 'bg-gray-100 text-gray-800'                            {app}              <h2 className="text-2xl font-semibold mb-4">ARRIVE Guidelines Checklist</h2>

                        }`}>

                          <div className="whitespace-pre-wrap">{msg.content}</div>                          </span>              <p className="text-gray-600">Interactive checklist for reproducible research compliance</p>

                        </div>

                      </div>                        ))}            </div>

                    ))

                  )}                        {model.applications.length > 2 && (          )}

                </div>

                <div className="border-t p-4 flex gap-2">                          <span className="text-xs text-gray-500">+{model.applications.length - 2} more</span>          

                  <input

                    type="text"                        )}          {activeTab === 'chat' && (

                    value={chatInput}

                    onChange={(e) => setChatInput(e.target.value)}                      </div>            <div>

                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}

                    placeholder="Ask about DS models, experimental design, RRIDs, sample sizes..."                    </div>              <h2 className="text-2xl font-semibold mb-4">AI Research Assistant</h2>

                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"

                  />              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">

                  <button

                    onClick={handleChat}                    <div className="text-xs text-gray-500">                <p className="text-blue-700 text-sm">

                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"

                  >                      Click to select for comparison • External link to Jackson Lab                  💡 Ask me about DS animal models, experimental design, sample sizes, or ARRIVE guidelines.

                    Send

                  </button>                    </div>                </p>

                </div>

              </div>                  </div>              </div>

            </div>

          )}                ))}              <div className="border rounded-lg h-64 mb-4 p-4 bg-gray-50 flex items-center justify-center">

        </div>

              </div>                <div className="text-center text-gray-500">

        <footer className="text-center text-gray-500 text-sm mt-8">

          <p>DS Research Assistant • Open Source •             </div>                  <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />

            <a href="https://github.com/YOUR_USERNAME/ds-research-tool" className="text-blue-600 hover:underline ml-1">

              View on GitHub          )}                  <p>Chat functionality ready - ask me anything about DS research!</p>

            </a>

          </p>                </div>

          <p className="mt-2">✨ Featuring proper RRIDs for reproducible research</p>

        </footer>          {activeTab === 'compare' && (              </div>

      </div>

    </div>            <div>            </div>

  );

};              <h2 className="text-2xl font-semibold mb-4">Model Comparison</h2>          )}



export default DSResearchTool;              {selectedModels.length === 0 ? (        </div>

                <div className="text-center py-12 text-gray-500">      </div>

                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />    </div>

                  <p>Select models from the Animal Models tab to compare them here</p>  );

                </div>};

              ) : (

                <div>export default DSResearchTool;
>>>>>>> Stashed changes
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border p-3 text-left">Feature</th>
                          {selectedModels.map(modelId => {
                            const model = animalModels.find(m => m.id === modelId);
                            return <th key={modelId} className="border p-3 text-center">{model.name}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {['background', 'trisomy', 'genes', 'rrid'].map(feature => (
                          <tr key={feature}>
                            <td className="border p-3 font-medium capitalize">
<<<<<<< Updated upstream
                              {feature === 'rrid' ? 'RRID' : feature}
=======
                              {feature === 'rrid' ? 'RRID' : feature.replace('_', ' ')}
>>>>>>> Stashed changes
                            </td>
                            {selectedModels.map(modelId => {
                              const model = animalModels.find(m => m.id === modelId);
                              return (
                                <td key={modelId} className="border p-3 text-center">
                                  {feature === 'rrid' ? (
                                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                      {model[feature]}
                                    </span>
                                  ) : (
                                    model[feature]
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {selectedModels.map(modelId => {
                      const model = animalModels.find(m => m.id === modelId);
                      return (
                        <div key={modelId} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg">{model.name}</h3>
                            <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                              {model.rrid}
                            </span>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="font-medium text-green-700">Advantages</h4>
                            <ul className="text-sm list-disc list-inside">
                              {model.advantages.map((adv, idx) => (
                                <li key={idx}>{adv}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-3">
                            <h4 className="font-medium text-red-700">Limitations</h4>
                            <ul className="text-sm list-disc list-inside">
                              {model.limitations.map((limit, idx) => (
                                <li key={idx}>{limit}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-blue-700">Best Applications</h4>
                            <ul className="text-sm list-disc list-inside">
                              {model.applications.map((app, idx) => (
                                <li key={idx}>{app}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'design' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Study Design Wizard</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Research Question</label>
                    <textarea
                      placeholder="What is your main research question? e.g., 'Does compound X improve learning deficits in Ts65Dn mice?'"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Animal Model</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Select model...</option>
                        {animalModels.map(model => (
                          <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Study Type</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Select type...</option>
                        <option value="cognitive">Cognitive/Behavioral</option>
                        <option value="molecular">Molecular/Biochemical</option>
                        <option value="therapeutic">Therapeutic intervention</option>
                        <option value="pathophysiology">Pathophysiology</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Sample Size per Group</label>
                      <input
                        type="number"
                        placeholder="e.g., 10"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Study Duration</label>
                      <input
                        type="text"
                        placeholder="e.g., 8 weeks"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
<<<<<<< Updated upstream
=======

                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Endpoint</label>
                    <input
                      type="text"
                      placeholder="e.g., Performance in Morris Water Maze"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
>>>>>>> Stashed changes
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-3">💡 Design Recommendations</h3>
                  <div className="space-y-3 text-sm text-blue-700">
                    <div>
                      <h4 className="font-medium">Sample Size Guidelines:</h4>
                      <ul className="list-disc list-inside mt-1">
                        <li>Behavioral studies: n≥10 per group</li>
                        <li>Molecular studies: n≥6 per group</li>
                        <li>Use G*Power for calculations</li>
                        <li>Account for 10-20% attrition</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Experimental Design:</h4>
                      <ul className="list-disc list-inside mt-1">
                        <li>Include both sexes (sex as biological variable)</li>
                        <li>Randomize cage assignments</li>
                        <li>Blind investigators to treatment</li>
                        <li>Use appropriate controls</li>
                      </ul>
                    </div>

                    <div>
<<<<<<< Updated upstream
                      <h4 className="font-medium">Common Endpoints:</h4>
=======
                      <h4 className="font-medium">Common Endpoints by Model:</h4>
>>>>>>> Stashed changes
                      <ul className="list-disc list-inside mt-1">
                        <li>Ts65Dn: Morris Water Maze, Y-maze, NOR</li>
                        <li>Tc1: Molecular markers, gene expression</li>
                        <li>Dp16: Cytokines, interferon signaling</li>
                      </ul>
                    </div>
<<<<<<< Updated upstream
=======

                    <div>
                      <h4 className="font-medium">RRID Usage:</h4>
                      <ul className="list-disc list-inside mt-1">
                        <li>Always include RRIDs in methods</li>
                        <li>Required by most journals</li>
                        <li>Ensures reproducibility</li>
                      </ul>
                    </div>
>>>>>>> Stashed changes
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div>
<<<<<<< Updated upstream
              <h2 className="text-2xl font-semibold mb-4">ARRIVE Guidelines Checklist</h2>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm">
                  Completed: {guidelineChecks.filter(g => g.checked).length}/{guidelineChecks.length} items
=======
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">ARRIVE Guidelines Checklist</h2>
                <button
                  onClick={exportChecklist}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download size={16} />
                  Export Checklist
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm">
                  Completed: {guidelines.filter(g => g.checked).length}/{guidelines.length} items
>>>>>>> Stashed changes
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
<<<<<<< Updated upstream
                    style={{ width: `${(guidelineChecks.filter(g => g.checked).length / guidelineChecks.length) * 100}%` }}
=======
                    style={{ width: `${(guidelines.filter(g => g.checked).length / guidelines.length) * 100}%` }}
>>>>>>> Stashed changes
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
<<<<<<< Updated upstream
                {guidelineChecks.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      item.checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => handleGuidelineCheck(item.id)}
=======
                {guidelines.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      item.checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => handleGuidelineCheck(index)}
>>>>>>> Stashed changes
                  >
                    <div className="flex items-start gap-3">
                      <CheckSquare 
                        size={20} 
                        className={item.checked ? 'text-green-600' : 'text-gray-400'}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-blue-600 mb-1">{item.category}</div>
<<<<<<< Updated upstream
                        <div className="text-sm text-gray-700">{item.item}</div>
=======
                        <div className="text-sm text-gray-700 mb-2">{item.item}</div>
                        {item.details && (
                          <div className="text-xs text-gray-500 whitespace-pre-line">{item.details}</div>
                        )}
>>>>>>> Stashed changes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">AI Research Assistant</h2>
              <div className="border rounded-lg h-96 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="mb-4">Ask me about DS animal models, experimental design, or research guidance!</p>
                      <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg">
                        <p><strong>Try asking:</strong></p>
                        <p>• "Which model is best for cognitive studies?"</p>
                        <p>• "How many mice do I need for behavioral testing?"</p>
                        <p>• "What are the advantages of Ts65Dn vs Tc1?"</p>
<<<<<<< Updated upstream
                        <p>• "What RRID should I use for Dp16 mice?"</p>
=======
                        <p>• "Design tips for immunotherapy studies?"</p>
                        <p>• "What RRID should I use for Dp16 mice?"</p>
                        <p>• "ARRIVE guidelines for my study?"</p>
>>>>>>> Stashed changes
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t p-4 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}
<<<<<<< Updated upstream
                    placeholder="Ask about DS models, experimental design, RRIDs..."
=======
                    placeholder="Ask about DS models, experimental design, RRIDs, sample sizes..."
>>>>>>> Stashed changes
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleChat}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
<<<<<<< Updated upstream

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>DS Research Assistant • Open Source • 
            <a href="https://github.com/asathyanesan/ds-research-tool" className="text-blue-600 hover:underline ml-1">
              View on GitHub
            </a>
          </p>
          <p className="mt-2">✨ Featuring proper RRIDs for reproducible research</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
=======

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>DS Research Assistant • Open Source • 
            <a href="https://github.com/YOUR_USERNAME/ds-research-tool" className="text-blue-600 hover:underline ml-1">
              View on GitHub
            </a>
          </p>
          <p className="mt-2">✨ Featuring proper RRIDs for reproducible research</p>
        </footer>
      </div>
    </div>
  );
};

export default DSResearchTool;
>>>>>>> Stashed changes
