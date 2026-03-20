import React from "react";

export default function FAQ() {
  return (
    <div className="container mt-5 mb-5">

      <h2 className="text-center mb-4">Frequently Asked Questions</h2>

      <div className="accordion" id="faqAccordion">

        {/* Question 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq1"
            >
              How do I book an appointment?
            </button>
          </h2>

          <div
            id="faq1"
            className="accordion-collapse collapse show "
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Login as a patient, select a doctor, choose date and time,
              and confirm your appointment.
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq2"
            >
              Can I cancel my appointment?
            </button>
          </h2>

          <div
            id="faq2"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, you can cancel your appointment from the
              "View Appointments" section.
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq3"
            >
              Do I need to login to book an appointment?
            </button>
          </h2>

          <div
            id="faq3"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, login is required to book and manage appointments.
            </div>
          </div>
        </div>

        {/* Question 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq4"
            >
              Is my personal data secure?
            </button>
          </h2>

          <div
            id="faq4"
            className="accordion-collapse collapse"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, our system ensures secure authentication and protects
              patient information.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}