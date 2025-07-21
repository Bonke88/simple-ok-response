
import React from 'react';
import { Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PodcastCardProps {
  guestPhoto: string;
  guestName: string;
  episodeTitle: string;
  episodeBlurb: string;
  episodeDate: string;
  authorName?: string;
  category?: string;
  onClick?: () => void;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  guestPhoto,
  guestName,
  episodeTitle,
  episodeBlurb,
  episodeDate,
  authorName = "LENNY RACHITSKY",
  category,
  onClick
}) => {
  return (
    <div 
      className="podcast-card group cursor-pointer"
      onClick={onClick}
      style={{
        width: '430px',
        height: '500px',
        backgroundColor: '#F6F6F7',
        borderRadius: '6px',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
        padding: '20px',
        transition: 'box-shadow 200ms ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 18px 0 rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(0,0,0,0.06)';
      }}
    >
      {/* Hero Image Block */}
      <div className="flex justify-center mb-4">
        <div 
          className="hero-image-container group-hover:scale-[1.03] transition-transform duration-200 ease-out"
          style={{
            width: '70%',
            aspectRatio: '1/1',
            border: '4px solid white',
            borderRadius: '8px',
            boxShadow: '0 3px 10px 0 rgba(0,0,0,0.10)',
            background: 'linear-gradient(to bottom, #F9D7B9, #FADFCF)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Category Badge */}
          {category && (
            <Badge 
              className="absolute top-3 left-3 text-xs font-semibold"
              style={{
                backgroundColor: '#969AA2',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}
            >
              {category}
            </Badge>
          )}
          {/* Lenny's Podcast Text */}
          <div 
            className="absolute top-0 left-0 right-0 text-center pt-4"
            style={{
              fontFamily: 'Kalam, cursive',
              fontSize: '24px',
              fontWeight: '700',
              color: '#2C1810',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Lenny's<br/>Podcast
          </div>
          
          {/* Guest Photo */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <img 
              src={guestPhoto}
              alt={guestName}
              className="w-20 h-20 rounded-full object-cover border-2 border-white/50"
            />
            
            {/* Name Label */}
            <div 
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.05)',
                padding: '4px 12px',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: '600',
                color: '#101010'
              }}
            >
              {guestName}
            </div>
          </div>
        </div>
      </div>
      
      {/* Text Block */}
      <div className="text-block" style={{ width: '70%', margin: '0 auto' }}>
        {/* Headline */}
        <h3 
          className="group-hover:text-[#2F81F7] transition-colors duration-200 mb-2"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '20px',
            fontWeight: '700',
            color: '#101010',
            lineHeight: '26px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {episodeTitle}
        </h3>
        
        {/* Sub-headline */}
        <p 
          className="mb-4"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: '400',
            color: '#5F6368',
            lineHeight: '22px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {episodeBlurb}
        </p>
      </div>
      
      {/* Metadata Footer Row */}
      <div 
        className="flex items-center gap-2"
        style={{ width: '70%', margin: '0 auto' }}
      >
        <Lock 
          size={12} 
          style={{ color: '#969AA2' }}
        />
        <span 
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: '500',
            color: '#969AA2',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}
        >
          {episodeDate}
        </span>
        <span 
          style={{
            width: '5px',
            height: '5px',
            backgroundColor: '#969AA2',
            borderRadius: '50%'
          }}
        />
        <span 
          className="hover:text-[#2F81F7] transition-colors duration-200 cursor-pointer"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: '600',
            color: '#969AA2',
            letterSpacing: '0.2px'
          }}
        >
          {authorName}
        </span>
      </div>
    </div>
  );
};

export default PodcastCard;
