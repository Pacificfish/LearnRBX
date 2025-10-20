'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { StepStatus } from '@/types/curriculum';

interface StepGatingProps {
  status: StepStatus;
  checkpoint?: boolean;
  onUnlock?: () => void;
  message?: string;
}

export function StepGating({ 
  status, 
  checkpoint = false, 
  onUnlock, 
  message 
}: StepGatingProps) {
  if (status === 'unlocked') {
    return null; // Step is unlocked, no gating needed
  }

  if (status === 'passed') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-800">Step Completed</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">
            {checkpoint 
              ? 'Checkpoint completed! You can now proceed to the next step.'
              : 'This step has been completed successfully.'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === 'locked') {
    return (
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-gray-500" />
            <CardTitle className="text-gray-700">Step Locked</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {checkpoint 
              ? 'Complete the previous checkpoint to unlock this step.'
              : 'Complete the previous step to unlock this one.'
            }
          </p>
          {message && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p className="text-yellow-800 text-sm">{message}</p>
            </div>
          )}
          {onUnlock && (
            <Button 
              onClick={onUnlock}
              variant="outline"
              className="mt-3"
            >
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}
