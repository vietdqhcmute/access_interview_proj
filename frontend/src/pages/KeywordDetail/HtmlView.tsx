import React from 'react'
import './wiki-css-2022.css';
import './wiki-css.css';
const HtmlView: React.FC<{ htmlContent: string }> = ({ htmlContent }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px', backgroundColor: '#fff' }}
    />
  );
};

export default HtmlView;
