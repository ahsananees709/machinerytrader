'use client';

import React, { Fragment, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { Spinner } from '../ui/spinner';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(`${BASE_URL}/email/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }
      setIsSubmitting(false)
      setSuccessMessage('Thank you for contacting us! We will get back to you soon.');
      setErrorMessage('');
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setIsSubmitting(false)
      setErrorMessage(error.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Contact us by filling this form or email us at{' '}
            <a href="mailto:example@gmail.com" className="text-primary font-semibold underline">
              example@gmail.com
            </a>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}
                      {successMessage && <p className="text-green-500 text-center text-sm">{successMessage}</p>}
                      <div className='flex items-center justify-between gap-2'>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Full Name"
                                  
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email Address"
              />
                          </div>
                          </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject (Optional)"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isSubmitting ? (
                                          <div className="flex items-center justify-center">
                                            Submitting...
                                                  <Spinner width={6} height={6}/>  
                                          </div>
                                        ) : (
                                          'Submit'
                                        )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
