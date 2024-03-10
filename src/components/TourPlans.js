// TourPlans.js

import React, { useEffect, useState } from 'react';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';
import { Link, useNavigate } from 'react-router-dom';

import '../ui/TourPlans.css';



const builder = imageUrlBuilder(client);




function urlFor(source) {
    return builder.image(source);
}
const TourPlans = () => {
    const [plans, setPlans] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Using useHistory to navigate

    useEffect(() => {
        client.fetch('*[_type == "tourPlan"]')
            .then((data) => setPlans(data))
            .catch(console.error);
    }, []);

    const filteredPlans = plans.filter(plan =>
        plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && filteredPlans.length === 1) {
          // Navigate to the detail page of the first (and only) filtered plan
          navigate(`/plan/${filteredPlans[0]._id}`);
        }
      };

    return (
        <div >
        <div className="landing-page">
            <header className="hero-section">
                <h1>Explore Our Tour Plans</h1>
                <p>Find your next adventure</p>
            </header>
            <div className="search-container">
        <input
          type="text"
          placeholder="Search tours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // Adding the onKeyDown event listener
        />
      </div>
            <div className="cards-container">
                {filteredPlans.map(plan => (
                    <div key={plan._id} className="card">
                        <img
                            src={plan.image && urlFor(plan.image).url()}
                            alt={plan.title}
                            className="card-image"
                        />
                        <div className="card-content">
                            <h2>{plan.title}</h2>
                            <p>{plan.description}</p>
                            <Link to={`/plan/${plan._id}`} className="details-link">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default TourPlans;
