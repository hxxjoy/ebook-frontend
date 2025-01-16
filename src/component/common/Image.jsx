const Image = ({ src, alt, defaultSrc = '/image/cover.png', ...props }) => {
    const handleError = (e) => {
        console.log(defaultSrc)
      e.target.src = defaultSrc;
      e.target.onerror = null;
    }
    const imageSrc = src || defaultSrc
  
    return (
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
        {...props}
      />
    );
  };
  
export default Image;