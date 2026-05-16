import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface ContentRendererProps {
  content: string;
  className?: string;
  truncate?: boolean;
  maxLength?: number;
}

// Function to safely strip HTML tags for plain text previews
const stripHtml = (html: string) => {
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || "";
  return text.replace(/\u00A0/g, ' ');
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ 
  content, 
  className = "", 
  truncate = false,
  maxLength = 400
}) => {
  // Safe default: if content isn't valid string, return empty
  if (typeof content !== 'string') {
    return null;
  }

  if (truncate) {
    const plainText = stripHtml(content);
    const truncatedText = plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
    
    return (
      <p className={`whitespace-pre-wrap break-words ${className}`}>
        {truncatedText}
      </p>
    );
  }

  const sanitizedHTML = DOMPurify.sanitize(content);

  return (
    <div 
      className={`rich-text-content break-words ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }} 
    />
  );
};

export default ContentRenderer;
