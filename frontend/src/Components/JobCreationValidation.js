import validator from 'validator';

class ValidateFields{

    validatejobTitle(jobTitle) {
        if (validator.isEmpty(jobTitle)) {
          return 'job title is required';
        } else if (!validator.isLength(jobTitle)) {
          return 'Invalid job title';
        }
        return false;
      }



}


const validateFields = new ValidateFields();


export {validateFields};