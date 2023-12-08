const FieldErrorMessage = ({ errors }) => {
    if (!errors || (Array.isArray(errors) && errors.length === 0)) {
      return null;
    }
    if (typeof errors === 'string') {
      errors = [errors];
    }
    return (
      <div className="text-danger">
        {errors.map((error, index) => (
          <p key={index} className="error">
            {error}
          </p>
        ))}
      </div>
    );
  };
  export default FieldErrorMessage