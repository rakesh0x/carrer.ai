// Define the shape of CareerGuidanceState
export interface CareerGuidanceState {
  careerGoal: {
    goal: string;
    timeline: string;
    priority: string;
  };
  activeComponents: string[];
  clarity: number;
  confidence: number;
  [key: string]: any; // Allow for extension
}
// Define types directly here to avoid circular imports


export interface UIAction {
  component: string;
  position?: 'top' | 'main' | 'bottom';
  props?: Record<string, any>;
  type?: string;
}

export interface TamboResponse {
  actions: UIAction[];
  intent?: string;
  state?: any;

  clarity?: number;
  confidence?: number;
  // ...other properties as needed
}

export class TamboAIService {
  private static readonly MOCK_RESPONSES = [
    {
      keywords: ['software engineer', 'developer', 'coding'],
      response: (input: string): TamboResponse => ({
        intent: 'set_career_goal',
        actions: [
          {
            type: 'render',
            component: 'CareerGoalCard',
            props: {
              goal: input,
              timeline: '2-3 years',
              priority: 'high',
            },
            position: 'top',
          },
          {
            type: 'render',
            component: 'SkillAssessmentPanel',
            props: {
              skills: [
                {
                  name: 'JavaScript/TypeScript',
                  level: 'intermediate',
                  proficiency: 65,
                },
                { name: 'React', level: 'intermediate', proficiency: 60 },
                { name: 'System Design', level: 'beginner', proficiency: 35 },
                { name: 'DevOps', level: 'beginner', proficiency: 25 },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'LearningGapVisualizer',
            props: {
              gaps: [
                {
                  skill: 'Advanced Algorithms',
                  currentLevel: 35,
                  requiredLevel: 85,
                  gapSize: 50,
                },
                {
                  skill: 'System Design',
                  currentLevel: 35,
                  requiredLevel: 80,
                  gapSize: 45,
                },
                {
                  skill: 'Database Design',
                  currentLevel: 45,
                  requiredLevel: 75,
                  gapSize: 30,
                },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'RoadmapTimeline',
            props: {
              milestones: [
                {
                  title: 'Master Core Fundamentals',
                  description: 'Deepen knowledge in data structures and algorithms',
                  timeframe: 'Months 1-3',
                  status: 'upcoming',
                },
                {
                  title: 'Build Medium-Scale Projects',
                  description: 'Create full-stack applications with complexity',
                  timeframe: 'Months 4-9',
                  status: 'upcoming',
                },
                {
                  title: 'System Design Focus',
                  description: 'Learn distributed systems and architecture',
                  timeframe: 'Months 10-18',
                  status: 'upcoming',
                },
                {
                  title: 'Apply for Senior Roles',
                  description: 'Target senior engineer positions',
                  timeframe: 'Month 24+',
                  status: 'upcoming',
                },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'JobFitExplorer',
            props: {
              roles: [
                {
                  title: 'Senior Full-Stack Engineer',
                  fitScore: 72,
                  description: 'Lead development of core platform features',
                  matchedSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
                },
                {
                  title: 'Solutions Architect',
                  fitScore: 58,
                  description: 'Design scalable system solutions',
                  matchedSkills: ['System Design', 'Cloud Architecture'],
                },
                {
                  title: 'Backend Engineer',
                  fitScore: 85,
                  description: 'Build robust server-side systems',
                  matchedSkills: [
                    'JavaScript',
                    'System Design',
                    'Databases',
                  ],
                },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'ResourceRecommendations',
            props: {
              resources: [
                {
                  title: 'The System Design Interview',
                  type: 'book',
                  provider: 'Alex Xu',
                  description: 'Master system design concepts for interviews',
                  estimatedTime: '40 hours',
                  relevance: 'high',
                },
                {
                  title: 'LeetCode Premium',
                  type: 'tool',
                  provider: 'LeetCode',
                  description: 'Practice coding problems and mock interviews',
                  estimatedTime: 'Ongoing',
                  relevance: 'high',
                },
                {
                  title: 'Designing Data-Intensive Applications',
                  type: 'book',
                  provider: 'Martin Kleppmann',
                  description: 'Deep dive into distributed systems design',
                  estimatedTime: '60 hours',
                  relevance: 'high',
                },
                {
                  title: 'Advanced React Patterns',
                  type: 'course',
                  provider: 'Epic React',
                  description: 'Master advanced React patterns and hooks',
                  estimatedTime: '20 hours',
                  relevance: 'medium',
                },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'ConfidenceMeter',
            props: {
              clarity: 75,
              confidence: 62,
              insights: [
                'You have strong fundamentals in modern web development',
                'Focus on system design and architecture patterns',
                'Consider contributing to open source projects',
              ],
            },
            position: 'bottom',
          },
        ],
        state: {
          careerGoal: {
            goal: input,
            timeline: '2-3 years',
            priority: 'high',
          },
          activeComponents: [
            'CareerGoalCard',
            'SkillAssessmentPanel',
            'LearningGapVisualizer',
            'RoadmapTimeline',
            'JobFitExplorer',
            'ResourceRecommendations',
            'ConfidenceMeter',
          ],
          clarity: 75,
          confidence: 62,
        },
      }),
    },
    {
      keywords: ['product manager', 'pm', 'product'],
      response: (input: string): TamboResponse => ({
        intent: 'set_career_goal',
        actions: [
          {
            type: 'render',
            component: 'CareerGoalCard',
            props: {
              goal: input,
              timeline: '18-24 months',
              priority: 'high',
            },
            position: 'top',
          },
          {
            type: 'render',
            component: 'SkillAssessmentPanel',
            props: {
              skills: [
                {
                  name: 'Product Strategy',
                  level: 'intermediate',
                  proficiency: 70,
                },
                { name: 'User Research', level: 'advanced', proficiency: 80 },
                { name: 'Analytics', level: 'intermediate', proficiency: 65 },
                { name: 'Stakeholder Management', level: 'intermediate', proficiency: 75 },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'LearningGapVisualizer',
            props: {
              gaps: [
                {
                  skill: 'Data Analysis & Metrics',
                  currentLevel: 65,
                  requiredLevel: 90,
                  gapSize: 25,
                },
                {
                  skill: 'Technical Fundamentals',
                  currentLevel: 55,
                  requiredLevel: 80,
                  gapSize: 25,
                },
                {
                  skill: 'Business Strategy',
                  currentLevel: 70,
                  requiredLevel: 85,
                  gapSize: 15,
                },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'JobFitExplorer',
            props: {
              roles: [
                {
                  title: 'Senior Product Manager',
                  fitScore: 80,
                  description: 'Own product roadmap and strategy',
                  matchedSkills: [
                    'Product Strategy',
                    'User Research',
                    'Storytelling',
                  ],
                },
                {
                  title: 'Product Lead',
                  fitScore: 88,
                  description: 'Lead cross-functional product teams',
                  matchedSkills: [
                    'Leadership',
                    'Communication',
                    'Strategy',
                  ],
                },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'ResourceRecommendations',
            props: {
              resources: [
                {
                  title: 'Inspired: How to Create Products Customers Love',
                  type: 'book',
                  provider: 'Marty Cagan',
                  description: 'Essential PM mindset and methodology',
                  estimatedTime: '15 hours',
                  relevance: 'high',
                },
                {
                  title: 'Product Management by Practice',
                  type: 'course',
                  provider: 'Maven Analytics',
                  description: 'Learn data-driven product decisions',
                  estimatedTime: '25 hours',
                  relevance: 'high',
                },
              ],
            },
            position: 'bottom',
          },
          {
            type: 'render',
            component: 'ConfidenceMeter',
            props: {
              clarity: 82,
              confidence: 75,
              insights: [
                'You have strong product intuition and user empathy',
                'Develop deeper technical understanding for credibility',
                'Build a track record with metrics and data',
              ],
            },
            position: 'bottom',
          },
        ],
        state: {
          careerGoal: {
            goal: input,
            timeline: '18-24 months',
            priority: 'high',
          },
          activeComponents: [
            'CareerGoalCard',
            'SkillAssessmentPanel',
            'LearningGapVisualizer',
            'JobFitExplorer',
            'ResourceRecommendations',
            'ConfidenceMeter',
          ],
          clarity: 82,
          confidence: 75,
        },
      }),
    },
  ]

  static async processInput(input: string): Promise<TamboResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const lowerInput = input.toLowerCase()

    // Find matching response pattern
    for (const pattern of this.MOCK_RESPONSES) {
      if (pattern.keywords.some((keyword) => lowerInput.includes(keyword))) {
        return pattern.response(input)
      }
    }

    // Default response
    return {
      intent: 'generic_career_guidance',
      actions: [
        {
          type: 'render',
          component: 'CareerGoalCard',
          props: {
            goal: input,
            timeline: 'To be determined',
            priority: 'medium',
          },
          position: 'top',
        },
        {
          type: 'render',
          component: 'ConfidenceMeter',
          props: {
            clarity: 45,
            confidence: 40,
            insights: [
              'Tell us more about your target role',
              'Share your current skills and experience',
              'Describe any specific challenges you face',
            ],
          },
          position: 'bottom',
        },
      ],
      state: {
        careerGoal: {
          goal: input,
          timeline: 'To be determined',
          priority: 'medium',
        },
        activeComponents: ['CareerGoalCard', 'ConfidenceMeter'],
        clarity: 45,
        confidence: 40,
      },
    }
  }

  static generateUIActions(response: TamboResponse): UIAction[] {
    return response.actions
  }

  static mergeState(
    current: CareerGuidanceState,
    updates: Partial<CareerGuidanceState>,
  ): CareerGuidanceState {
    return {
      ...current,
      ...updates,
    }
  }
}
