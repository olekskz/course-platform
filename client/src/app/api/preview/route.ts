import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const redirectPath = searchParams.get('redirect');
    const courseId = searchParams.get('courseId');

    if (!redirectPath || !courseId) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    (await draftMode()).enable();
    
    const response = NextResponse.redirect(new URL(redirectPath, 'http://localhost:3000'));
    response.cookies.set('previewCourseId', courseId);

    return response;
}