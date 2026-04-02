/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'tentativa inicial' | 'parcialmente correta' | 'quase completa' | 'solução adequada';

export interface Feedback {
  good: string[];
  review: string[];
  nextStep: string;
}

export interface HeuristicResult {
  category: Category;
  feedback: Feedback;
  difficulty: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'student';
  createdAt: string;
}

export interface Attempt {
  id: string;
  userId: string;
  challengeId: string;
  timestamp: string;
  code: string;
  category: Category;
  tipsUsed: number[];
  feedback: string;
  difficultyHypothesis: string;
}

export interface ChallengeMetadata {
  content: string;
  language: string;
  level: string;
  time: string;
  requirements: string;
  skill: string;
}

export interface Tip {
  id: number;
  text: string;
}

export interface CommonError {
  title: string;
  description: string;
}

export interface Orientation {
  input: string;
  output: string;
  cases: string;
  structure: string;
}

export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  metadata: ChallengeMetadata;
  problem: string;
  guidingQuestions: string[];
  orientation: Orientation;
  tips: Tip[];
  commonErrors: CommonError[];
  solution: string;
  finalSummary: string[];
  nextChallengeSuggestion: string;
  templateCode: string;
  analyze: (code: string) => HeuristicResult;
}
