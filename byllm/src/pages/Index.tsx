import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Github, Download, BookOpen, Users, MessageCircle, ChevronDown, FileText, Info, Calendar } from 'lucide-react';
import { ThemeProvider } from '../components/ThemeProvider';
import { Header } from '../components/Header';
import { CodeBlock } from '../components/CodeBlock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../components/ui/carousel';

// Import example images
import example1 from '../assets/example-1.png';
import example2 from '../assets/example-2.jpg';
import example3 from '../assets/example-3.jpg';
import example4 from '../assets/example-4.png';

// Import blog post thumbnails
import promptLessImage from '/prompt_less_smile_more.webp';
import devDreamImage from '/dev_dream.webp';
import tutorialCompleteImage from '/tutorial_complete.webp';

//Import evaluation metrices images
import fig17 from '../assets/fig17.png';
import fig22 from '../assets/fig22.png';
import fig23 from '../assets/fig23.png';

import evaluationPECode from '../assets/evalPE.py?raw';
import evaluationDSPyCode from '../assets/evaldspy.py?raw';
import evaluationJacCode from '../assets/byllmeval.jac?raw';
import evaluationPyCode from '../assets/byllmeval.py?raw';  

// Import JAC examples
import firstexampleCode from '../assets/firstexample.jac?raw';
import firstexamplecodepython from '../assets/firstexample.py?raw';
import areyouaiCode from '../assets/areyouai.jac?raw';
import personalityfinderCode from '../assets/personalityfinder.jac?raw';
import wikisearchCode from '../assets/wikisearch.jac?raw';

const Index = () => {
  // Default to the left-most example tab so the page opens with PersonalityFinder selected
  const [activeTab, setActiveTab] = useState('personalityfinder');
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);
  const [isApiNoteExpanded, setIsApiNoteExpanded] = useState(false);
  const [isLiteLLMNoteExpanded, setIsLiteLLMNoteExpanded] = useState(false);

  const examples = [
    {
      title: 'RPG Game level generation',
      description: 'An LLM powered game world generation into a simple RPG.',
      image: example1,
      link: 'https://docs.jaseci.org/learn/examples/mtp_examples/rpg_game/'
    },
    {
      title: 'Agentic AI Chatbot',
      description: 'An agentic chatbot built using byLLM and MCP',
      image: example2,
      link: 'https://docs.jaseci.org/learn/examples/rag_chatbot/Overview/'
    },
    {
      title: 'Agentic Coding Agent (Jac-Aider)',
      description: 'A coding agent built on <a href="https://aider.chat/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">aider</a> but all prompts replaced with byllm calls reducing more than 200 lines of code.',
      image: example3,
      link: 'https://github.com/jaseci-labs/Agentic-AI/tree/main/aider-genius'
    },
    {
      title: 'Jac-GPT',
      description: 'An agentic chatbot running of Jaseci (including byllm)',
      image: example4,
      link: 'https://jac-gpt.jaseci.org/'
    }
  ];

  const metricsData = [
    { model: 'GPT-4', accuracy: '94.2%', f1Score: '0.918', latency: '1.2s' },
    { model: 'Claude-3', accuracy: '92.8%', f1Score: '0.905', latency: '0.9s' },
    { model: 'Gemini Pro', accuracy: '91.5%', f1Score: '0.892', latency: '1.1s' },
    { model: 'LLaMA-2', accuracy: '89.3%', f1Score: '0.876', latency: '0.7s' }
  ];

  const modelSnippets = {
    areyouai: {
      description: 'A simple example showing how to build a Yes/No answering bot using byLLM',
      code: areyouaiCode,
    },
    personalityfinder: {
      description: 'Using custom types and enums as outputs without any parsing logic',
      code: personalityfinderCode,
    },
    wikisearch: {
      description: 'React Loop with tool usage for wikipedia search agent',
      code: wikisearchCode,
    }
  };

  const blogPosts = [
    {
      title: 'Prompt Less Smile More: Let the LLM Know your Intentions without Prompt Soup',
      description: 'Discover how byLLM revolutionizes LLM integration by eliminating complex prompt engineering and letting you focus on building.',
      link: 'https://medium.com/@jayanaka15/prompt-less-smile-more-let-the-llm-know-your-intentions-without-prompt-soup-01414cc48942',
      image: promptLessImage,
      author: '@jayanaka15',
      readTime: '5 min read'
    },
    {
      title: "The Developer's Dream: How Jaseci is Revolutionising Backend Development and AI Integration",
      description: 'Explore how Jaseci is changing the game for developers building AI-powered applications with unprecedented ease.',
      link: 'https://medium.com/@kashmithnisakya/the-developers-dream-how-jaseci-is-revolutionising-backend-development-and-ai-integration-c73be8fe2a6b',
      image: devDreamImage,
      author: '@kashmithnisakya',
      readTime: '7 min read'
    },
    {
      title: 'From Prompt Hell to AI Heaven: A Complete Tutorial on Building Intelligent Agents Effectively',
      description: 'A comprehensive guide to building intelligent AI agents without getting lost in the complexity of prompt engineering.',
      link: 'https://medium.com/@udithishanka.s/c8b44d322df1',
      image: tutorialCompleteImage,
      author: '@udithishanka.s',
      readTime: '10 min read'
    }
  ];

  const tutorials = [
    {
      title: 'Build an AI-integrated RPG (code-along)',
      description: 'Code-along: build an AI-integrated RPG using byLLM to generate dynamic level maps. Follow the video and docs to reproduce the project.',
      youtubeId: 'FSIZmwfQD1s',
      // Link to the documentation example page as requested by the user
      repoLink: 'https://docs.jaseci.org/learn/examples/mtp_examples/rpg_game/',
    },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container py-16 md:py-20">
            <div className="mx-auto max-w-4xl text-center animate-fade-in">
              <div className="flex items-center justify-center h-full mb-12">
                <div className="flex items-center space-x-4">
                  {/* Logo on the left */}
                  <img
                    src="/logo.png"
                    alt="byLLM Logo"
                    className="h-28 w-auto"
                  />

                  {/* Text on the right */}
                  <div className="flex flex-col">
                    <h1 className="text-7xl font-bold leading-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      <strong>byLLM</strong>
                    </h1>
                    <p className="text-lg text-muted-foreground mt-1">
                      Prompt Less, Smile More
                    </p>
                  </div>
                </div>
              </div>




              <div className="bg-card border rounded-xl p-8 mb-12 text-left max-w-3xl mx-auto">
                <p className="text-body leading-relaxed text-card-foreground">
                  <strong>byLLM</strong> automagically generates optimized prompts by inferring your, the coder’s, intent. It also allows you to use the best LLM for the job, multiple different ones in fact, if that’s what you think will get you the promotion. Unlocking the power of AI  has never been easier! Build your app byLLM: <strong>Prompt less, Smile more</strong>, create your unicorn in less time it takes to spell Jaseci. byLLM is a langauge construct in <a href="https://jaseci.org" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">Jac-lang/Jaseci</a>, but can also be used as a standalone Python library.

                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="btn-hero group"
                  onClick={() => window.open('https://dl.acm.org/doi/10.1145/3763092', '_blank')}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Read Research Paper
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="btn-secondary"
                  onClick={() => window.open('https://github.com/jaseci-labs/jaseci/tree/main/jac-byllm', '_blank')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
                <Button className="btn-hero group"
                  onClick={() => (window.location.href = 'https://docs.jaseci.org/learn/jac-byllm/with_llm/')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Docs
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Why by? Section */}
        <section className="py-12 bg-gradient-to-b from-background to-muted/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-section mb-4">Why byLLM?</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Built for developers who want to focus on building, not prompting
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl">🚀</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">No Prompt Engineering</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Write natural function signatures and let byLLM handle prompt generation automatically. High accuracy right out of the box relative to DSPy and LMQL frameworks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl">➕</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3"> Minimal Code Changes</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A simple by keyword, all the complexity of prompt engineering and output parsing is hidden. Switch or integrate LLMs using just one line of code.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl">🔧</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Rapid Agentic AI Development</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Leverage the broader Jaseci ecosystem to quickly build and scale agentic AI applications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl">🌐</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Model Agnostic</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Works with any LLM provider - OpenAI, Anthropic, Google, or your own hosted models. Switch easily between providers.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section id="install" className="py-12 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-section mb-4">Getting Started</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Install <strong>byLLM</strong> and start building AI applications in minutes
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <CodeBlock code="pip install byllm" language="bash" />
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 mt-2 mb-8">
                <div 
                  className="flex items-center gap-2 mb-1 cursor-pointer"
                  onClick={() => setIsApiNoteExpanded(!isApiNoteExpanded)}
                >
                  <Info className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm text-primary">Note</span>
                  <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-200 ${isApiNoteExpanded ? 'rotate-180' : ''}`} />
                </div>
                {isApiNoteExpanded && (
                  <>
                    <p className="text-sm text-muted-foreground ml-6">You'll need access to a language model, either via an API provider or a locally hosted model. Make sure to save your API key as a secret in your environment variables. For example:</p>
                    <CodeBlock code="export OPENAI_API_KEY='your-api-key'" language="bash" />
                  </>
                )}
              </div>

              <div className="text-center mb-16">
                <h4 className="text-section mb-4">How to use byLLM?</h4>
              </div>

              <div className="max-w-4xl mx-auto mb-8">
                <Tabs defaultValue="jac" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="jac">byLLM Jac</TabsTrigger>
                    <TabsTrigger value="python">byLLM Python</TabsTrigger>
                  </TabsList>
                  <TabsContent value="jac">
                    <CodeBlock code={firstexampleCode} language="jac" />
                  </TabsContent>
                  <TabsContent value="python">
                    <CodeBlock code={firstexamplecodepython} language="python" />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 mt-2 mb-8">
                <div 
                  className="flex items-center gap-2 mb-1 cursor-pointer"
                  onClick={() => setIsNoteExpanded(!isNoteExpanded)}
                >
                  <Info className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm text-primary">Note</span>
                  <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-200 ${isNoteExpanded ? 'rotate-180' : ''}`} />
                </div>
                {isNoteExpanded && (
                  <>
                    <p className="text-sm text-muted-foreground ml-6">To run your jac program </p>
                    <CodeBlock code="jac run file.jac" language="bash" />
                  </>
                )}
              </div>

              <div className="text-center mb-16">
                <p className="text-base font-semibold italic text-primary mb-4">IT IS THAT SIMPLE!</p>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-section mb-4">Let's look at some simple examples to understand how byLLM is used.</h3>
              </div>

              

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 mb-8">
                  <TabsTrigger value="personalityfinder">PersonalityFinder</TabsTrigger>
                  <TabsTrigger value="areyouai">AreYouAI</TabsTrigger>
                  <TabsTrigger value="wikisearch">WikiSearch</TabsTrigger>
                </TabsList>

                {Object.entries(modelSnippets).map(([key, snippet]) => (
                  <TabsContent key={key} value={key} className="space-y-6">
                    <Card className="card-interactive">
                      <CardContent className="p-8">
                        <p className="text-body text-muted-foreground mb-6">
                          {snippet.description}
                        </p>
                        <CodeBlock code={snippet.code} language="jac" />
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 mt-2 mb-8">
                <div 
                  className="flex items-center gap-2 mb-1 cursor-pointer"
                  onClick={() => setIsLiteLLMNoteExpanded(!isLiteLLMNoteExpanded)}
                >
                  <Info className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm text-primary">Note</span>
                  <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-200 ${isLiteLLMNoteExpanded ? 'rotate-180' : ''}`} />
                </div>
                {isLiteLLMNoteExpanded && (
                  <p className="text-sm text-muted-foreground ml-6">The Model class in byLLM serves as an interface to <a href="https://docs.litellm.ai/docs/providers" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">LiteLLM</a>. This means any model supported by LiteLLM can be used with byLLM. When configuring a model, refer to the LiteLLM documentation to see which variables are required, and pass those same variables to Model in byLLM.</p>
                )}
              </div>
            </div>
          </div>
        </section>


        

        {/* Evaluation Metrics */}
        {/* <section className="py-12">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-section mb-4">Evaluation Metrics</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Performance comparison across different language models
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-4 px-4 font-semibold">Model</th>
                          <th className="text-left py-4 px-4 font-semibold">Accuracy</th>
                          <th className="text-left py-4 px-4 font-semibold">F1 Score</th>
                          <th className="text-left py-4 px-4 font-semibold">Latency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metricsData.map((metric, index) => (
                          <tr key={index} className="border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4 font-medium">{metric.model}</td>
                            <td className="py-4 px-4 text-primary font-semibold">{metric.accuracy}</td>
                            <td className="py-4 px-4">{metric.f1Score}</td>
                            <td className="py-4 px-4 text-muted-foreground">{metric.latency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* How Users React to byLLM */}
        {/* <section className="py-12">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-section mb-4">How Users React to byLLM</h2>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={fig17}
                alt="User reactions to byLLM"
                className="max-h-96 w-auto object-contain rounded-lg shadow-md"
              />
              <div className="text-sm text-muted-foreground mt-4 text-center max-w-xl">
                User evaluation of LMQL, DSPy and MTPon five usability criteria
              </div>
            </div>
          </div>
        </section> */}

        {/* Runtime Speed and Cost Improvements */}

        <section className="py-12">
          <div className="container">
            {/* <div className="text-center mb-16">
              <h2 className="text-section mb-8">Evaluation Metrices</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Comparison of runtime performance and cost efficiency across frameworks
              </p>
            </div> */}


            {/* Figures */}
            {/* <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <img
                    src={fig22}
                    alt="Figure 22: Runtime Speed Comparison"
                    className="max-h-72 w-auto object-contain"
                  />
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Token usage comparison between MTP and DSPy.
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <img
                    src={fig23}
                    alt="Figure 23: Cost Efficiency Comparison"
                    className="max-h-72 w-auto object-contain"
                  />
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Cost and runtime speed comparison between MTP and DSPy.
                  </div>
                </CardContent>
              </Card>
            </div> */}
            {/* <div className="text-center mb-16">
              <span className="text-base font-semibold text-primary">
                Lower latency and cost on average
              </span>
            </div> */}

            {/* Code Examples Section */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">

              {/* Title below the grid */}
              <div className="col-span-2 mb-4">
                <h3 className="text-section text-center font-bold text-2xl">
                  Side-by-side code comparison
                </h3>
              </div>

              {/* Left Tabs */}
              <div>
                <Tabs defaultValue="jac" className="w-full">
                  <TabsList className="grid w-full grid-cols-1 mb-4">
                    <TabsTrigger value="jac">Prompt Engineering</TabsTrigger>
                    {/* <TabsTrigger value="python">DSPy</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="jac">
                    <Card>
                      <CardContent className="p-4">
                        <CodeBlock code={evaluationPECode} language="python" />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  {/* <TabsContent value="python">
                    <Card>
                      <CardContent className="p-4">
                        <CodeBlock code={evaluationDSPyCode} language="python" />
                      </CardContent>
                    </Card>
                  </TabsContent> */}
                </Tabs>
              </div>

              {/* Right Jac Tab */}
              <div>
                <Tabs defaultValue="jac-impl" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="jac-impl">byLLM Jac</TabsTrigger>
                    <TabsTrigger value="py-impl">byLLM Python</TabsTrigger>
                  </TabsList>
                  <TabsContent value="jac-impl">
                    <Card>
                      <CardContent className="p-4">
                        <CodeBlock code={evaluationJacCode} language="jac" />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="py-impl">
                    <Card>
                      <CardContent className="p-4">
                        <CodeBlock code={evaluationPyCode} language="python" />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>


          </div>
        </section>


        {/* How it Works */}
        {/* <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-section mb-4">How it Works</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Get up and running with <strong>byLLM</strong> in three simple steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-16">
              <div className="flex items-start gap-8">
                <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Install & Setup</h3>
                  <p className="text-body text-muted-foreground mb-6">
                    Install <strong>byLLM</strong> and configure your preferred models to get started quickly
                  </p>
                  <CodeBlock
                    code="pip install by-llm\nby-llm init my-project\ncd my-project"
                    language="bash"
                  />
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Define Modules</h3>
                  <p className="text-body text-muted-foreground mb-6">
                    Create reusable AI modules with natural language descriptions that define their behavior
                  </p>
                  <CodeBlock
                    code='from by_llm import Module\n\nclass Summarizer(Module):\n    """Summarize text concisely"""\n    pass'
                    language="python"
                  />
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Compose & Execute</h3>
                  <p className="text-body text-muted-foreground mb-6">
                    Chain modules together to build complex applications with simple composition
                  </p>
                  <CodeBlock
                    code='pipeline = Summarizer() >> Translator()\nresult = pipeline("Long text...")\nprint(result)'
                    language="python"
                  />
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Documentation CTA */}
        <section id="documentation" className="py-12">
          <div className="container text-center">
            <h2 className="text-section mb-4">Ready to dive deeper?</h2>
            <a
              href="https://docs.jaseci.org/learn/jac-byllm/with_llm/"
            >
              <Button className="btn-hero text-lg px-8 py-4">
                <BookOpen className="mr-2 h-5 w-5" />
                See Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-12 bg-background">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-section mb-4">Latest from Our Blogs</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Read our latest articles on the future of AI-Integrated Programming
              </p>
            </div>

            <div className="max-w-6xl mx-auto relative">
              <Carousel>
                <CarouselContent className="gap-4">
                  {blogPosts.map((post, idx) => (
                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <Card className="card-interactive h-full flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer">
                          <div className="overflow-hidden aspect-video relative">
                            {post.image ? (
                              <img 
                                src={post.image }
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/30 via-primary/15 to-background flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                                <div className="relative z-10 text-center p-6">
                                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center border border-primary/20">
                                    <BookOpen className="w-8 h-8 text-primary" />
                                  </div>
                                  <div className="inline-block px-4 py-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
                                    <span className="text-xs font-medium text-muted-foreground">Medium Article</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <CardHeader className="flex-1 pb-2">
                            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors leading-snug mb-2">
                              {post.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-sm">
                              {post.description}
                            </CardDescription>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between w-full px-4 py-2 rounded-md bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-sm font-medium">
                              <span>Read on Medium</span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Tutorials */}
        <section id="tutorials" className="py-12 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-section mb-4">Tutorials</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">Watch video walkthroughs and grab the documentation for each tutorial</p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <Carousel>
                <CarouselContent className="gap-4">
                  {tutorials.map((t, idx) => (
                    <CarouselItem key={idx}>
                      <Card className="card-interactive">
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <iframe
                            src={`https://www.youtube.com/embed/${t.youtubeId}`}
                            title={t.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{t.title}</CardTitle>
                          </div>
                          <CardDescription>{t.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex justify-end">
                            <Button variant="outline" onClick={() => (window.location.href = t.repoLink)}>
                              View Docs
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-section mb-4">Projects</h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Explore real-world applications and get inspired by what's possible
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 max-w-3xl mx-auto">
                {examples.map((example, index) => (
                <Card
                  key={index}
                  className="card-interactive group cursor-pointer overflow-hidden"
                    onClick={() => (window.location.href = example.link)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={example.image}
                      alt={example.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardDescription dangerouslySetInnerHTML={{ __html: example.description }} />
                    {/* <CardDescription>{example.description}</CardDescription> */}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* References */}
        <section className="py-12">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-section mb-4">References</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-6">
                      <p className="text-sm text-muted-foreground mt-2">
                        Jayanaka L. Dantanarayana, Yiping Kang, Kugesan Sivasothynathan, Christopher Clarke, Baichuan Li, Savini Kashmira, Krisztian Flautner, Lingjia Tang, and Jason Mars. 2025
                      </p>
                      <p className="text-body italic text-muted-foreground">
                        "MTP: A Meaning-Typed Language Abstraction for AI-Integrated Programming." : Proc. ACM Program. Lang. 9, OOPSLA2, Article 314 (October 2025), 29 pages.{" "}
                        <a
                          href="https://dl.acm.org/doi/10.1145/3763092"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary/80"
                        >
                          https://doi.org/10.1145/3763092
                        </a>
                      </p>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="community" className="border-t bg-card">
          <div className="container py-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                {/* <div className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">BL</span>
                  </div>
                  <span className="text-xl font-semibold">byLLM</span>
                </div> */}
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src="/logo.png"
                    alt="byLLM Logo"
                    className="h-8 w-auto rounded-lg bg-primary"
                    style={{ background: 'none' }}
                  />
                  <span className="text-xl font-semibold">byLLM</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Building the future of AI development with declarative, composable frameworks.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://discord.gg/6j3QNdtcN6" target="_blank" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Discord Server
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://docs.jaseci.org/learn/jac-byllm/with_llm/" className="text-muted-foreground hover:text-primary transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/jaseci-labs/jaseci/tree/main/jac-byllm/examples" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                      Projects
                    </a>
                  </li>
                  {/* <li>
                    <a href="#" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                      Tutorials
                    </a>
                  </li> */}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">FAQ</h4>
                <ul className="space-y-2 text-sm">
                  {/* <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Model Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Troubleshooting
                    </a>
                  </li> */}
                  <li>
                    <a href="https://docs.jaseci.org/internals/contrib/" className="text-muted-foreground hover:text-primary transition-colors">
                      Contributing
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 byLLM Project. Built with passion for the AI development community.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;