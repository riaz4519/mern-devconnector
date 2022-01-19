import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={classnames("form-control", {
          "is-invalid": error,
        })}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.prototypes = {
    name : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value : PropTypes.string.isRequired,
    info : PropTypes.string,
    error : PropTypes.string,
    tpe : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    disabled : PropTypes.string
}

TextFieldGroup.defaultProps = {
    type : 'text'
}

export default TextFieldGroup;
