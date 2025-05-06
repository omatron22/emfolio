'use client';

import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  project: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  project: '',
  message: '',
};

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Basic validation
    if (!formState.name || !formState.email || !formState.message) {
      setError('Please fill out all required fields');
      setIsSubmitting(false);
      return;
    }
  
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // This would normally be where you'd send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormState(initialFormState);
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setError('There was a problem submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formState.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formState.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
      
      <div>
        <label htmlFor="project" className="block text-sm font-medium mb-1">
          Project Type
        </label>
        <select
          id="project"
          name="project"
          required
          value={formState.project}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="">Select project type</option>
          <option value="theater">Theater</option>
          <option value="dance">Dance</option>
          <option value="concert">Concert/Live Music</option>
          <option value="event">Special Event</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formState.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Sending</span>
              <div className="h-4 w-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
      
      {isSuccess && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
          Thank you for your message! I&apos;ll get back to you as soon as possible.
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-md">
          {error}
        </div>
      )}
    </form>
  );
}