'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  activities: string;
}

export default function LessonForm() {
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: '1', title: '', content: '', activities: '' },
  ]);

  const addLesson = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setLessons([...lessons, { id: newId, title: '', content: '', activities: '' }]);
  };

  const removeLesson = (id: string) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    }
  };

  const updateLesson = (id: string, field: keyof Lesson, value: string) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  return (
    <div className="space-y-8">
      {lessons.map((lesson, index) => (
        <div key={lesson.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Lesson {index + 1}</h4>
            {lessons.length > 1 && (
              <button
                onClick={() => removeLesson(lesson.id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title
              </label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) =>
                  updateLesson(lesson.id, 'title', e.target.value)
                }
                placeholder="e.g., Introduction to Variables"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                rows={4}
                value={lesson.content}
                onChange={(e) =>
                  updateLesson(lesson.id, 'content', e.target.value)
                }
                placeholder="Describe the main content of this lesson..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities
              </label>
              <textarea
                rows={3}
                value={lesson.activities}
                onChange={(e) =>
                  updateLesson(lesson.id, 'activities', e.target.value)
                }
                placeholder="Describe the activities students will complete..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addLesson}
        className="flex items-center gap-2 px-6 py-2 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:border-indigo-500 hover:text-indigo-700 transition font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Another Lesson
      </button>
    </div>
  );
}
