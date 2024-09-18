// Validation for Email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Invalid email address.";
    return null;
  };
  
  //  Validation for Mobile
  export const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) return "Mobile number is required.";
    if (!mobileRegex.test(mobile)) return "Invalid mobile number.";
    return null;
  };

//Validation for 4 digit pin
  export const validatePinCode = (pin) => {
    const pinCodePattern = /^\d{4}$/;
    if(!pin)return "4 Digit pin required"
    if (!pinCodePattern.test(pin)) {
      return "PIN must be exactly 4 digits.";
    }
    return null;
  };
  
  // Validation for Name
  export const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name) return "Name is required.";
    if (!nameRegex.test(name)) return "Name must contain only characters.";
    return null;
  };

  //Validation for Gst Number
  export const validateGstNumber=(gstnumber)=>{
    const gstnumberRegex= /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
    if(!gstnumber)return "GST Number required";
    if(!gstnumberRegex.test(gstnumber)) return "Invalid GST Number";
    return null;

  }

  export const validateTelephone = (telephone) => {
    const telephoneRegex = /^[0-9]{10}$/;
    if (!telephone) return "Telephone number is required.";
    if (!telephoneRegex.test(telephone)) return "Invalid telephone number.";
    return null;
  };

  

  //Validation for File
  export const validateImageFile = (file) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!file) {
      return "No file selected.";
    }
    if (!allowedTypes.includes(file.type)) {
      return "Only image files (PNG, JPG, JPEG) are allowed.";
    }
    return "";
  };

//validate multiple images
  export const validateGalleryFile = (files) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!files || files.length === 0) {
      return "No file selected.";
    }
    
    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        return "Only image files (PNG, JPG, JPEG) are allowed.";
      }
    }
  
    return "";
  };


  export const validateEmailOptional = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address.";
    return null;
  };
  

  export const validateDescriptionLength = (description) => {
    // console.log(description);
    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount < 100) {
      return "The description must be at least 100 words.";
    }
    return "";
  };


