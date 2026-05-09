'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Loader } from 'lucide-react';

const lessonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  gradeLevel: z.string().min(1, 'Grade level is required'),
  subject: z.string().min(1, 'Subject is required'),
  duration: z.string().min(1, 'Duration is required'),
  learningObjectives: z.string().min(1, 'Learning objectives are required'),
  lessons: z.array(
    z.object({
      title: z.string().min(1, 'Lesson title is required'),
      content: z.string().min(1, 'Lesson content is required'),
      activities: z.string().min(1, 'Activities are required'),
    })
  ).min(1, 'At least one lesson is required'),
});

type LessonFormData = z.infer<typeof lessonSchema>;

export default function LessonForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: '',
      gradeLevel: '',
      subject: '',
      duration: '',
      learningObjectives: '',
      lessons: [{ title: '', content: '', activities: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lessons',
  });

  const onSubmit = async (data: LessonFormData) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate lesson plan');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title.replace(/\s+/g, '_')}_lesson_plan.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Error generating lesson plan: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Lesson Plan Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Plan Title *
            </label>
            <input
              {...register('title')}
              type="text"
              placeholder="e.g., Introduction to Photosynthesis"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              {...register('subject')}
              type="text"
              placeholder="e.g., Biology"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.subject && <span className="text-red-500 text-sm mt-1">{errors.subject.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade Level *
            </label>
            <input
              {...register('gradeLevel')}
              type="text"
              placeholder="e.g., 9th Grade"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.gradeLevel && <span className="text-red-500 text-sm mt-1">{errors.gradeLevel.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration *
            </label>
            <input
              {...register('duration')}
              type="text"
              placeholder="e.g., 45 minutes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.duration && <span className="text-red-500 text-sm mt-1">{errors.duration.message}</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Learning Objectives *
          </label>
          <textarea
            {...register('learningObjectives')}
            placeholder="Describe what students will learn..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {errors.learningObjectives && (
            <span className="text-red-500 text-sm mt-1">{errors.learningObjectives.message}</span>
          )}
        </div>
      </div>

      {/* Lessons */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Lessons *</h2>
          <button
            type="button"
            onClick={() => append({ title: '', content: '', activities: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Lesson
          </button>
        </div>

        <div className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">Lesson {index + 1}</h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Title *
                  </label>
                  <input
                    {...register(`lessons.${index}.title`)}
                    type="text"
                    placeholder="e.g., Photosynthesis Basics"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {errors.lessons?.[index]?.title && (
                    <span className="text-red-500 text-sm mt-1">{errors.lessons[index]?.title?.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    {...register(`lessons.${index}.content`)}
                    placeholder="Describe the lesson content..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {errors.lessons?.[index]?.content && (
                    <span className="text-red-500 text-sm mt-1">{errors.lessons[index]?.content?.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activities *
                  </label>
                  <textarea
                    {...register(`lessons.${index}.activities`)}
                    placeholder="List activities for this lesson..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {errors.lessons?.[index]?.activities && (
                    <span className="text-red-500 text-sm mt-1">{errors.lessons[index]?.activities?.message}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.lessons && <span className="text-red-500 text-sm">{errors.lessons.message}</span>}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isGenerating}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating && <Loader className="w-5 h-5 animate-spin" />}
          {isGenerating ? 'Generating...' : 'Generate Lesson Plan'}
        </button>
        <button
          type="reset"
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
