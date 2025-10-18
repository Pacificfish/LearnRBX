'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface LessonNavProps {
  prevLesson?: {
    url: string;
    title: string;
  };
  nextLesson?: {
    url: string;
    title: string;
  };
  taskCompleted?: boolean;
}

export function LessonNav({ prevLesson, nextLesson, taskCompleted = false }: LessonNavProps) {
  return (
    <div className="flex justify-between items-center py-6 border-t">
      <div>
        {prevLesson ? (
          <Link href={prevLesson.url}>
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="text-sm font-medium">{prevLesson.title}</div>
              </div>
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div>
        {nextLesson ? (
          taskCompleted ? (
            <Link href={nextLesson.url}>
              <Button className="gap-2">
                <div className="text-right">
                  <div className="text-xs">Next</div>
                  <div className="text-sm font-medium">{nextLesson.title}</div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button disabled className="gap-2 opacity-50 cursor-not-allowed">
              <div className="text-right">
                <div className="text-xs">Complete Task First</div>
                <div className="text-sm font-medium">{nextLesson.title}</div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

