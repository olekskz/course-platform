import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const referrer = request.headers.get('referer') || '';
    const courseId = ( await cookies()).get('previewCourseId')?.value;
    
    const lessonId = referrer.split('/lessons/')[1];
  
    (await draftMode()).disable();

  
    const redirectUrl = `http://localhost:3000/dashboard/instructor/courses/${courseId}/lessons/create/edit/${lessonId}`;
    
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete('previewCourseId');

    return response;
}