import { useState, useEffect, useCallback } from 'react';
import type { LikertValue, DiagnosticResults } from '../types';
import { diagnosticQuestions } from '../data/questions';
import { calculateAllScores, calculateOverallScore } from '../utils/scoring';
import { STORAGE_KEYS } from '../constants';

interface UseDiagnosticReturn {
  currentQuestion: number;
  totalQuestions: number;
  responses: Map<string, LikertValue>;
  isComplete: boolean;
  results: DiagnosticResults | null;
  currentQuestionData: typeof diagnosticQuestions[0] | undefined;
  progress: number;
  answerQuestion: (value: LikertValue) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToQuestion: (index: number) => void;
  resetSurvey: () => void;
  calculateResults: () => DiagnosticResults;
}

export function useDiagnostic(): UseDiagnosticReturn {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Map<string, LikertValue>>(new Map());
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<DiagnosticResults | null>(null);

  const totalQuestions = diagnosticQuestions.length;
  const currentQuestionData = diagnosticQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedResponses = localStorage.getItem(STORAGE_KEYS.responses);
      const savedProgress = localStorage.getItem(STORAGE_KEYS.progress);
      const savedResults = localStorage.getItem(STORAGE_KEYS.results);

      if (savedResponses) {
        const parsed = JSON.parse(savedResponses);
        setResponses(new Map(Object.entries(parsed)));
      }

      if (savedProgress) {
        const progressIndex = parseInt(savedProgress, 10);
        if (!isNaN(progressIndex) && progressIndex >= 0 && progressIndex < totalQuestions) {
          setCurrentQuestion(progressIndex);
        }
      }

      if (savedResults) {
        const parsed = JSON.parse(savedResults);
        setResults({
          ...parsed,
          responses: new Map(Object.entries(parsed.responses || {})),
        });
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Error loading saved diagnostic state:', error);
    }
  }, [totalQuestions]);

  // Save responses to localStorage
  const saveResponses = useCallback((newResponses: Map<string, LikertValue>) => {
    try {
      const obj = Object.fromEntries(newResponses);
      localStorage.setItem(STORAGE_KEYS.responses, JSON.stringify(obj));
    } catch (error) {
      console.error('Error saving responses:', error);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((questionIndex: number) => {
    try {
      localStorage.setItem(STORAGE_KEYS.progress, String(questionIndex));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, []);

  // Answer current question
  const answerQuestion = useCallback(
    (value: LikertValue) => {
      if (!currentQuestionData) return;

      const newResponses = new Map(responses);
      newResponses.set(currentQuestionData.id, value);
      setResponses(newResponses);
      saveResponses(newResponses);
    },
    [currentQuestionData, responses, saveResponses]
  );

  // Navigate to next question
  const goToNext = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      saveProgress(nextIndex);
    } else if (responses.size === totalQuestions) {
      // All questions answered, calculate results
      const dimensionScores = calculateAllScores(responses);
      const overallScore = calculateOverallScore(dimensionScores);
      const newResults: DiagnosticResults = {
        dimensionScores,
        overallScore,
        responses,
        completedAt: new Date().toISOString(),
      };
      setResults(newResults);
      setIsComplete(true);

      // Save results
      try {
        localStorage.setItem(
          STORAGE_KEYS.results,
          JSON.stringify({
            ...newResults,
            responses: Object.fromEntries(responses),
          })
        );
      } catch (error) {
        console.error('Error saving results:', error);
      }
    }
  }, [currentQuestion, totalQuestions, responses, saveProgress]);

  // Navigate to previous question
  const goToPrevious = useCallback(() => {
    if (currentQuestion > 0) {
      const prevIndex = currentQuestion - 1;
      setCurrentQuestion(prevIndex);
      saveProgress(prevIndex);
    }
  }, [currentQuestion, saveProgress]);

  // Navigate to specific question
  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentQuestion(index);
        saveProgress(index);
      }
    },
    [totalQuestions, saveProgress]
  );

  // Reset survey
  const resetSurvey = useCallback(() => {
    setCurrentQuestion(0);
    setResponses(new Map());
    setIsComplete(false);
    setResults(null);

    try {
      localStorage.removeItem(STORAGE_KEYS.responses);
      localStorage.removeItem(STORAGE_KEYS.progress);
      localStorage.removeItem(STORAGE_KEYS.results);
    } catch (error) {
      console.error('Error clearing saved state:', error);
    }
  }, []);

  // Calculate results (can be called manually)
  const calculateResults = useCallback((): DiagnosticResults => {
    const dimensionScores = calculateAllScores(responses);
    const overallScore = calculateOverallScore(dimensionScores);
    return {
      dimensionScores,
      overallScore,
      responses,
      completedAt: new Date().toISOString(),
    };
  }, [responses]);

  return {
    currentQuestion,
    totalQuestions,
    responses,
    isComplete,
    results,
    currentQuestionData,
    progress,
    answerQuestion,
    goToNext,
    goToPrevious,
    goToQuestion,
    resetSurvey,
    calculateResults,
  };
}

export default useDiagnostic;
