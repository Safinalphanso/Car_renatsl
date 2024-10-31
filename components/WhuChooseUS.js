import React from 'react';
import { Phone, User, Car, CreditCard } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Phone,
    title: 'Easy Online Booking',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    backgroundColor: 'blueBg'
  },
  {
    id: 2,
    icon: User,
    title: 'Professional Drivers',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    backgroundColor: 'blackBg'
  },
  {
    id: 3,
    icon: Car,
    title: 'Variety of Car Brands',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    backgroundColor: 'blueBg'
  },
  {
    id: 4,
    icon: CreditCard,
    title: 'Online Payment',
    description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    backgroundColor: 'blackBg'
  },
];

const WhyChooseUs = () => {
  return (
    <section className="whyChooseUs">
      <h2>Why Choose Us</h2>
      <p className="description">
        At LMVC we pride ourselves in delivering extensive services to fulfill all of your needs with first-rate customer care.
      </p>
      <div className="featuresGrid">
        {features.map(feature => (
          <div key={feature.id} className={`featureCard ${feature.backgroundColor}`}>
            <feature.icon className="icon" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .whyChooseUs {
          text-align: center;
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
          border-radius: 15px;
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
        }

        .whyChooseUs h2 {
          font-size: 2.5em;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }

        .description {
          font-size: 1.1em;
          color: #666;
          margin-bottom: 30px;
        }

        .featuresGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .featureCard {
          padding: 25px 20px;
          border-radius: 10px;
          color: #fff;
          text-align: center;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Animation on hover */
        .featureCard:hover {
          transform: scale(1.05);
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
        }

        .blueBg {
          background-color: #007bff;
        }

        .blackBg {
          background-color: #333;
        }

        .icon {
          font-size: 3em;
          margin-bottom: 15px;
          color: #fff;
        }

        .featureCard h3 {
          font-size: 1.3em;
          margin-bottom: 10px;
          font-weight: 600;
          color: #f0f0f0;
        }

        .featureCard p {
          font-size: 0.95em;
          color: #e0e0e0;
          max-width: 220px;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .featuresGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .featureCard {
            padding: 20px 15px;
          }
          .featureCard h3 {
            font-size: 1.1em;
          }
          .featureCard p {
            font-size: 0.85em;
          }
        }

        @media (max-width: 480px) {
          .whyChooseUs h2 {
            font-size: 2em;
          }
          .description {
            font-size: 1em;
          }
          .featuresGrid {
            grid-template-columns: 1fr;
          }
          .icon {
            font-size: 2.5em;
          }
          .featureCard h3 {
            font-size: 1em;
          }
          .featureCard p {
            font-size: 0.8em;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
