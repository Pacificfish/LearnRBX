import { NextResponse } from 'next/server';
import { createLessonExport } from '@/lib/exporter';

export const runtime = 'nodejs';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Code required' }, { status: 400 });
    }

    // Generate export
    const zipBlob = await createLessonExport(slug, code);

    // Return as downloadable file
    return new NextResponse(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${slug}-starter.zip"`,
      },
    });
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

