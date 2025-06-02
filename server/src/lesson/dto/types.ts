export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  lessonOrder: number;
  courseId: string;
  materials?: string | null;
}

export interface GetLessonsResponse {
  lessons: Lesson[];
  success: boolean;
  message: string;
}

export interface CreateLessonResponse {
  success: boolean;
  message: string;
}