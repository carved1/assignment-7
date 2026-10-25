function ErrorMessage({ message }) {
  return (
    <div className="error-message" role="alert">
      <p>{message || 'Something went wrong. Please try again.'}</p>
    </div>
  );
}

export default ErrorMessage;
