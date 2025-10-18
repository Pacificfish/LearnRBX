import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = params.path.join('/');
    const fullPath = path.join(process.cwd(), 'content', filePath);

    // Security check: ensure the path is within the content directory
    const contentDir = path.join(process.cwd(), 'content');
    const resolvedPath = path.resolve(fullPath);
    
    if (!resolvedPath.startsWith(contentDir)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read and return the file
    const content = fs.readFileSync(resolvedPath, 'utf8');
    
    // Set appropriate content type based on file extension
    const ext = path.extname(resolvedPath);
    let contentType = 'text/plain';
    
    if (ext === '.json') {
      contentType = 'application/json';
    } else if (ext === '.mdx') {
      contentType = 'text/markdown';
    }

    return new NextResponse(content, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Error serving content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
