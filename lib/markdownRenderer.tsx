import React from 'react';
import CodeBlock from '@/components/CodeBlock';

interface ParsedContent {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

export function parseMarkdownContent(content: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({
          type: 'text',
          content: textContent
        });
      }
    }

    // Add code block
    const language = match[1] || 'lua';
    const code = match[2].trim();
    parts.push({
      type: 'code',
      content: code,
      language: language
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex).trim();
    if (textContent) {
      parts.push({
        type: 'text',
        content: textContent
      });
    }
  }

  // If no code blocks found, return the entire content as text
  if (parts.length === 0) {
    parts.push({
      type: 'text',
      content: content
    });
  }

  return parts;
}

export function renderMarkdownContent(content: string): React.ReactNode[] {
  const parts = parseMarkdownContent(content);
  
  return parts.map((part, index) => {
    if (part.type === 'code') {
      return (
        <div key={index} className="my-4">
          <CodeBlock 
            code={part.content} 
            language={part.language} 
          />
        </div>
      );
    } else {
      return (
        <div 
          key={index} 
          className="whitespace-pre-wrap text-sm leading-relaxed"
        >
          {part.content}
        </div>
      );
    }
  });
}
