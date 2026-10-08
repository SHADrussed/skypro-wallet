import { FormInput } from "./SignForm.styled";

const BaseInput = ({
   id,
   name,
   placeholder = "",
   type = "text",
   error = false,
   value = "",
   onChange,

}) => {
   return (
      <FormInput
         id={id}
         name={name}
         type={type}
         placeholder={placeholder}
         $value={value}
         $error={error}
         onChange={onChange}
      />
   );
};

export default BaseInput;