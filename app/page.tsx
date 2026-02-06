'use client'

import { useState } from 'react'
import { motion, AnimatePresence, easeOut } from 'framer-motion'
import { CareerInputForm } from '../components/career-input-form'
import { DynamicComponentRenderer } from '../components/dynamic-component-renderer'
import { TamboAIService } from '@/lib/tambo-ai-service'
import type { UIAction, CareerGuidanceState, TamboResponse } from '../lib/types'
import { ArrowRight, Sparkles, RefreshCw, ChevronDown, Zap, Brain, Target, Trophy, Download, Share2 } from 'lucide-react'
import jsPDF from 'jspdf';
import { LinkedinShareButton, TwitterShareButton } from 'react-share';

const INITIAL_STATE: CareerGuidanceState = {
  skills: [],
  learningGaps: [],
  roadmap: [],
  jobRoles: [],
  resources: [],
  clarity: 0,
  confidence: 0,
  insights: [],
  activeComponents: [],
  careerGoal: {
    goal: '',
    timeline: '',
    priority: '',
  },
}

// Animation variants for hackathon impact
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

const glitchVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [actions, setActions] = useState<UIAction[]>([])
  const [state, setState] = useState(INITIAL_STATE)
  const [allActions, setAllActions] = useState<UIAction[]>([])
  const [showInfo, setShowInfo] = useState(false)

  const handleUserInput = async (input: string) => {
    setIsLoading(true)
    try {
      const response = await TamboAIService.processInput(input)
      const newState = TamboAIService.mergeState(state, response.state)
      setState(newState)
      setAllActions((prev) => [...prev, ...response.actions])
      setActions(response.actions)
    } catch (error) {
      console.error('Error processing input:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setState(INITIAL_STATE)
    setActions([])
    setAllActions([])
  }

  const progressValue = allActions.length > 0 ? Math.min((allActions.length / 10) * 100, 100) : 0

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* AGGRESSIVE BACKGROUND EFFECTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Neon grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .1) 25%, rgba(0, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .1) 75%, rgba(0, 255, 255, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .1) 25%, rgba(0, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .1) 75%, rgba(0, 255, 255, .1) 76%, transparent 77%, transparent)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Animated neon orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 60, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-600/30 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -60, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating particles effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -200, 0],
              x: [0, Math.sin(i) * 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            style={{
              left: `${(i / 20) * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HERO HEADER - Eye-catching */}
        <motion.header
          className="border-b border-cyan-500/20 backdrop-blur-xl bg-black/40 relative overflow-hidden"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated top border glow */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center overflow-hidden group"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Zap className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  CAREER.AI
                </h1>
                <p className="text-xs text-cyan-400/80 font-semibold tracking-widest">
                  POWERED BY TAMBO
                </p>
              </div>
            </motion.div>

            {allActions.length > 0 && (
              <motion.button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/10 transition-all group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                RESET
              </motion.button>
            )}
          </div>
        </motion.header>

        {/* MAIN CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT COLUMN - Input Section */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <div className="sticky top-8 space-y-6">
                {/* INPUT CARD - NEON BORDER */}
                <motion.div
                  className="relative bg-black/50 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl overflow-hidden group"
                  whileHover={{ borderColor: 'rgba(0, 255, 255, 0.6)' }}
                >
                  {/* Neon glow effect on hover */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      variants={glitchVariants}
                    >
                      <Brain className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-sm font-black uppercase tracking-widest text-cyan-300">
                        Your Input
                      </h2>
                    </motion.div>
                    <CareerInputForm
                      onSubmit={handleUserInput}
                      isLoading={isLoading}
                    />
                  </div>
                </motion.div>

                {/* INFO CARD - COLLAPSIBLE */}
                <motion.div
                  className="relative bg-black/50 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl overflow-hidden"
                  variants={itemVariants}
                >
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="flex items-center justify-between w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      <h3 className="text-sm font-black text-purple-300 uppercase tracking-widest">
                        How It Works
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: showInfo ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-purple-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showInfo && (
                      <motion.div
                        className="mt-4 space-y-3 text-sm"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {[
                          { icon: '1', text: 'Share your career goal' },
                          { icon: '2', text: 'AI analyzes instantly' },
                          { icon: '3', text: 'Get personalized roadmap' },
                          { icon: '4', text: 'Track your progress' },
                        ].map((step, idx) => (
                          <motion.div
                            key={idx}
                            className="flex gap-3 items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="w-6 h-6 min-w-fit bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                              {step.icon}
                            </div>
                            <p className="text-gray-300 pt-0.5">{step.text}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* STATS CARD - NEON */}
                {allActions.length > 0 && (
                  <motion.div
                    className="relative bg-black/50 border border-green-500/30 rounded-2xl p-6 backdrop-blur-xl overflow-hidden"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      variants={glitchVariants}
                    >
                      <Trophy className="w-5 h-5 text-green-400" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-green-300">
                        Metrics
                      </h3>
                    </motion.div>

                    <div className="space-y-4">
                      {/* PROGRESS METRICS */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400 uppercase font-semibold">Insights</span>
                          <span className="text-sm font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {allActions.length}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-cyan-500/30">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressValue}%` }}
                            transition={{ duration: 0.8, ease: easeOut }}
                          />
                        </div>
                      </motion.div>

                      {state.clarity > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400 uppercase font-semibold">Clarity</span>
                            <span className="text-sm font-black text-emerald-400">
                              {state.clarity}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-emerald-500/30">
                            <motion.div
                              className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${state.clarity}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </motion.div>
                      )}

                      {state.confidence > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400 uppercase font-semibold">Confidence</span>
                            <span className="text-sm font-black text-pink-400">
                              {state.confidence}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-pink-500/30">
                            <motion.div
                              className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${state.confidence}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* RIGHT COLUMN - Results */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              {/* EMPTY STATE */}
              {allActions.length === 0 && !isLoading && (
                <motion.div
                  className="relative bg-black/50 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-xl text-center overflow-hidden group"
                  variants={itemVariants}
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity"
                  />

                  <motion.div
                    className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/50 rounded-2xl mb-6"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 text-cyan-400" />
                  </motion.div>

                  <h3 className="text-3xl font-black mb-3 tracking-tight bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                    Ready to Transform?
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto leading-relaxed text-sm">
                    Enter your career goals above and watch as AI generates a personalized roadmap in real-time.
                  </p>

                  {/* Pulsing call-to-action */}
                  <motion.div
                    className="mt-8 flex justify-center"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                </motion.div>
              )}

              {/* LOADING STATE */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="relative bg-black/50 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col items-center justify-center gap-8">
                      {/* ANIMATED LOADING DOTS */}
                      <motion.div
                        className="flex gap-3"
                        animate="visible"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.2,
                            },
                          },
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{
                              duration: 1.4,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>

                      <div className="text-center">
                        <p className="text-cyan-300 font-black text-lg">
                          AI IS THINKING...
                        </p>
                        <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest font-semibold">
                          Generating your personalized career insights
                        </p>
                      </div>

                      {/* Loading progress bar */}
                      <motion.div
                        className="w-full h-1 bg-gray-900 rounded-full overflow-hidden"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RESULTS */}
              {allActions.length > 0 && !isLoading && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* DYNAMIC COMPONENTS */}
                  <div className="space-y-6">
                    <DynamicComponentRenderer
                      actions={allActions}
                      state={state}
                    />
                  </div>

                  {/* PDF & SHARE BUTTONS */}
                  <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
                    <button
                      onClick={() => {
                        const doc = new jsPDF();
                        doc.text('AI Career Navigator Report', 10, 10);
                        doc.text(`Goal: ${state.careerGoal?.goal || ''}`, 10, 20);
                        doc.text(`Clarity: ${state.clarity || 0}%`, 10, 30);
                        doc.text(`Confidence: ${state.confidence || 0}%`, 10, 40);
                        doc.save('career_report.pdf');
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      <Download className="w-4 h-4" /> Download Report Card
                    </button>
                    <TwitterShareButton
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      title={`Check out my AI Career Navigator report! Goal: ${state.careerGoal?.goal || ''}`}
                    >
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                        <Share2 className="w-4 h-4" /> Share on X
                      </span>
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      title={`Check out my AI Career Navigator report! Goal: ${state.careerGoal?.goal || ''}`}
                    >
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                        <Share2 className="w-4 h-4" /> Share on LinkedIn
                      </span>
                    </LinkedinShareButton>
                  </div>

                  {/* CTA - NEON CARD */}
                  <motion.div
                    className="relative bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-xl text-center group overflow-hidden"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-black mb-2 tracking-tight text-cyan-300">
                        Go Deeper
                      </h3>
                      <p className="text-gray-400 mb-6 text-sm">
                        Ask follow-up questions to refine your career path.
                      </p>
                      <motion.button
                        onClick={() => {
                          document.querySelector('input')?.focus()
                        }}
                        className="inline-flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all uppercase text-sm tracking-widest group/btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ask Next Question
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}