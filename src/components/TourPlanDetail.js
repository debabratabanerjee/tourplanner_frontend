import React, { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { useParams,Link } from 'react-router-dom';
import client from '../client';
import '../ui/TourDetails.css';

const builder = imageUrlBuilder(client);

const query = `*[_type == "tourPlan" && _id == $planId]{
  ...,
  "pdfUrl": pdf.asset->url
}[0]`;


function urlFor(source) {
  return builder.image(source);
}
const TourPlanDetail = () => {
  const [plan, setPlan] = useState(null);
  const { planId } = useParams();

  useEffect(() => {
    client
      .fetch(query, { planId })
      .then((data) => setPlan(data))
      .catch(console.error);
  }, [planId]);

  if (!plan) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  // console.log(plan);
  return (
    <div >
    <div className="detail-page">
      <Link to="/" className="back-button">&larr; Back to Tours</Link>
      <div className="detail-header">
        {plan.image && (
          <img
            src={urlFor(plan.image).url()}
            alt={plan.title}
            className="detail-image"
          />
        )}
      </div>
      <div className="detail-content">
        <h1 className="detail-title">{plan.title}</h1>
        <p className="detail-description">{plan.description}</p>
      {plan.pdfUrl && (
        <a href={plan.pdfUrl} className="pdf-download-link"
        download={`${plan.title}.pdf`}
        type="application/pdf"
      >
        Download PDF
      </a>
    )}
    <p className="detail-contact">Contact Details: {plan.contactDetails}</p>
  </div>
</div>
</div>
);
};

export default TourPlanDetail;
