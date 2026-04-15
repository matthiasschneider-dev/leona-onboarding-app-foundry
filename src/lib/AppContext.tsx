import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  AppState,
  OnboardingActivity,
  Participant,
  UseCase,
  Canvas,
  Metric,
  Milestone,
  Action,
  Brand,
  ToastType,
  PackageEntry,
} from '../types';
import { defaultState, scenarioData } from '../data/mockData';

interface AppContextType extends AppState {
  updateOnboardingActivity: (activity: OnboardingActivity) => void;
  addParticipant: (participant: Participant) => void;
  updateParticipant: (id: string, participant: Participant) => void;
  removeParticipant: (id: string) => void;
  updateMaturity: (currentLevel: number, targetLevel: number) => void;
  addUseCase: (useCase: UseCase) => void;
  updateUseCase: (id: string, useCase: UseCase) => void;
  removeUseCase: (id: string) => void;
  selectUseCase: (id: string | null) => void;
  voteUseCase: (id: string) => void;
  updateCanvas: (canvas: Canvas) => void;
  addMetric: (metric: Metric) => void;
  updateMetric: (id: string, metric: Metric) => void;
  removeMetric: (id: string) => void;
  addMilestone: (milestone: Milestone) => void;
  updateMilestone: (id: string, milestone: Milestone) => void;
  removeMilestone: (id: string) => void;
  addAction: (action: Action) => void;
  updateAction: (id: string, action: Action) => void;
  removeAction: (id: string) => void;
  toggleActionDone: (id: string) => void;
  updateBrand: (brand: Brand) => void;
  loadScenario: (packageEntry: PackageEntry) => void;
  resetDemo: () => void;
  showToast: (message: string, type: ToastType) => void;
  toast: { message: string; type: ToastType } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'easy-jumpin-state';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultState;
    } catch {
      return defaultState;
    }
  });

  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [state]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const updateOnboardingActivity = (activity: OnboardingActivity) => {
    setState((prev) => ({ ...prev, onboardingActivity: activity }));
  };

  const addParticipant = (participant: Participant) => {
    setState((prev) => ({
      ...prev,
      participants: [...prev.participants, participant],
    }));
  };

  const updateParticipant = (id: string, participant: Participant) => {
    setState((prev) => ({
      ...prev,
      participants: prev.participants.map((p) => (p.id === id ? participant : p)),
    }));
  };

  const removeParticipant = (id: string) => {
    setState((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== id),
    }));
  };

  const updateMaturity = (currentLevel: number, targetLevel: number) => {
    setState((prev) => ({
      ...prev,
      maturity: { currentLevel, targetLevel },
    }));
  };

  const addUseCase = (useCase: UseCase) => {
    setState((prev) => ({
      ...prev,
      useCases: [...prev.useCases, useCase],
    }));
  };

  const updateUseCase = (id: string, useCase: UseCase) => {
    setState((prev) => ({
      ...prev,
      useCases: prev.useCases.map((uc) => (uc.id === id ? useCase : uc)),
    }));
  };

  const removeUseCase = (id: string) => {
    setState((prev) => ({
      ...prev,
      useCases: prev.useCases.filter((uc) => uc.id !== id),
      selectedUseCaseId: prev.selectedUseCaseId === id ? null : prev.selectedUseCaseId,
    }));
  };

  const selectUseCase = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedUseCaseId: id }));
  };

  const voteUseCase = (id: string) => {
    setState((prev) => ({
      ...prev,
      useCases: prev.useCases.map((uc) =>
        uc.id === id ? { ...uc, votes: uc.votes + 1 } : uc
      ),
    }));
  };

  const updateCanvas = (canvas: Canvas) => {
    setState((prev) => ({ ...prev, canvas }));
  };

  const addMetric = (metric: Metric) => {
    setState((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        metrics: [...prev.canvas.metrics, metric],
      },
    }));
  };

  const updateMetric = (id: string, metric: Metric) => {
    setState((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        metrics: prev.canvas.metrics.map((m) => (m.id === id ? metric : m)),
      },
    }));
  };

  const removeMetric = (id: string) => {
    setState((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        metrics: prev.canvas.metrics.filter((m) => m.id !== id),
      },
    }));
  };

  const addMilestone = (milestone: Milestone) => {
    setState((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        timeline: [...prev.canvas.timeline, milestone],
      },
    }));
  };

  const updateMilestone = (id: string, milestone: Milestone) => {
    setState((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        timeline: prev.canvas.timeline.map((m) => (m.id === id ? milestone : m)),
      },
    }));
  };

  const removeMilestone = (id: string) => {
    setState((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        timeline: prev.canvas.timeline.filter((m) => m.id !== id),
      },
    }));
  };

  const addAction = (action: Action) => {
    setState((prev) => ({
      ...prev,
      actions: [...prev.actions, action],
    }));
  };

  const updateAction = (id: string, action: Action) => {
    setState((prev) => ({
      ...prev,
      actions: prev.actions.map((a) => (a.id === id ? action : a)),
    }));
  };

  const removeAction = (id: string) => {
    setState((prev) => ({
      ...prev,
      actions: prev.actions.filter((a) => a.id !== id),
    }));
  };

  const toggleActionDone = (id: string) => {
    setState((prev) => ({
      ...prev,
      actions: prev.actions.map((a) =>
        a.id === id ? { ...a, done: !a.done } : a
      ),
    }));
  };

  const updateBrand = (brand: Brand) => {
    setState((prev) => ({ ...prev, brand }));
  };

  const loadScenario = (packageEntry: PackageEntry) => {
    const scenario = scenarioData[packageEntry];
    setState((prev) => ({
      ...defaultState,
      ...scenario,
      brand: prev.brand, // Keep current branding
    }));
  };

  const resetDemo = () => {
    setState(defaultState);
  };

  const value: AppContextType = {
    ...state,
    updateOnboardingActivity,
    addParticipant,
    updateParticipant,
    removeParticipant,
    updateMaturity,
    addUseCase,
    updateUseCase,
    removeUseCase,
    selectUseCase,
    voteUseCase,
    updateCanvas,
    addMetric,
    updateMetric,
    removeMetric,
    addMilestone,
    updateMilestone,
    removeMilestone,
    addAction,
    updateAction,
    removeAction,
    toggleActionDone,
    updateBrand,
    loadScenario,
    resetDemo,
    showToast,
    toast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
