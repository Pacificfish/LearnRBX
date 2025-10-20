'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion } from '@/types/curriculum';

interface QuizStepProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export function QuizStep({ questions, onComplete }: QuizStepProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;
    
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    if (selectedAnswers.length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answerIndex) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    onComplete(finalScore);
  };

  const isCorrect = (questionIndex: number, answerIndex: number) => {
    if (!submitted) return null;
    const question = questions[questionIndex];
    const isSelected = selectedAnswers[questionIndex] === answerIndex;
    const isRightAnswer = answerIndex === question.answerIndex;
    
    if (isRightAnswer) return 'correct';
    if (isSelected && !isRightAnswer) return 'incorrect';
    return null;
  };

  const getButtonVariant = (questionIndex: number, answerIndex: number) => {
    const result = isCorrect(questionIndex, answerIndex);
    if (result === 'correct') return 'default';
    if (result === 'incorrect') return 'destructive';
    if (selectedAnswers[questionIndex] === answerIndex) return 'secondary';
    return 'outline';
  };

  return (
    <div className="space-y-6">
      {questions.map((question, questionIndex) => (
        <Card key={questionIndex}>
          <CardHeader>
            <CardTitle className="text-lg">
              Question {questionIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="font-medium">{question.prompt}</p>
              
              <div className="space-y-2">
                {question.choices.map((choice, choiceIndex) => (
                  <Button
                    key={choiceIndex}
                    variant={getButtonVariant(questionIndex, choiceIndex)}
                    className="w-full justify-start h-auto p-4 text-left"
                    onClick={() => handleAnswerSelect(questionIndex, choiceIndex)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      {submitted && isCorrect(questionIndex, choiceIndex) === 'correct' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {submitted && isCorrect(questionIndex, choiceIndex) === 'incorrect' && (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>{choice}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {submitted && question.explanation && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {selectedAnswers.length}/{questions.length} questions answered
        </div>
        
        {!submitted ? (
          <Button 
            onClick={handleSubmit}
            disabled={selectedAnswers.length !== questions.length}
          >
            Submit Quiz
          </Button>
        ) : (
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {score}%
            </div>
            <div className="text-sm text-gray-600">
              {score >= 70 ? 'Great job!' : 'Keep studying!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
