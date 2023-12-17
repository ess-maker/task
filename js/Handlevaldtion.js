const signupForm = document.getElementById('singup_auth');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phoneNumber = document.getElementById('PhoneNumber');
const educationLevel = document.getElementById('Edction_level');
const checkbox = document.getElementById('flexCheckDefault');
const submitButton = document.getElementById('submitButton');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const nameRegex = /^[a-zA-Z]+$/; // Only alphabetic characters allowed
const phoneRegex = /^\d{10}$/; // 10-digit phone number pattern
let rememberMe;
let Form_values; ;


function getFormValues() {
  const formValues = {
    firstNameValue: firstName.value.trim(),
    lastNameValue: lastName.value.trim(),
    phoneNumberValue: phoneNumber.value.trim(),
    educationLevelValue: educationLevel.value.trim(),
  };
  return formValues;
}

signupForm.addEventListener('submit', e => {
  e.preventDefault();
  Form_values = getFormValues()
  validateInputs();
});

checkbox.addEventListener('change', function() {
  rememberMe = checkbox.checked;
});

const validateInputs = () => {
  errorMessage.innerHTML = ''; // Clear previous error messages
  errorMessage.setAttribute('hidden', 'true');


  if (Form_values.firstNameValue === '') {
    setErrorMessage('الاسم الأول مطلوب.');
  } else if (!nameRegex.test(Form_values.firstNameValue)) {
    setErrorMessage('يجب أن يحتوي الاسم الأول على حروف أبجدية فقط.');
  } else if (Form_values.lastNameValue === '') {
    setErrorMessage('اسم العائلة مطلوب.');
  } else if (!nameRegex.test(Form_values.lastNameValue)) {
    setErrorMessage('يجب أن يحتوي اسم العائلة على حروف أبجدية فقط.');
  } else if (Form_values.phoneNumberValue === '') {
    setErrorMessage('رقم الهاتف مطلوب.');
  } else if (!phoneRegex.test(Form_values.phoneNumberValue)) {
    setErrorMessage('يجب أن يكون رقم الهاتف مكونًا من 10 أرقام.');
  } else if (Form_values.educationLevelValue === '') {
    setErrorMessage('المستوى التعليمي مطلوب.');
  } else if (!rememberMe) {
    setErrorMessage('يجب الموافقة على الشروط والأحكام.');
  } else {
    sendData()
  }

  return false;
};


// commen functions 

const setErrorMessage = (message) => {
  errorMessage.innerHTML = message;
  errorMessage.removeAttribute('hidden');
};

const setLoadingState = () => {
  submitButton.disabled = true;
  submitButton.classList.add('disabled');
  submitButton.value = 'يرجى الانتظار...';
};

const resetLoadingState = () => {
  submitButton.disabled = false;
  submitButton.classList.remove('disabled');
  submitButton.value = 'إرسال';
};

function redirect() {
  setTimeout(() => {
    window.location = '';
  }, 1000);
}

// firbase 

 
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
        import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
 
        const firebaseConfig = {
          apiKey: "AIzaSyAsO8amTJnzVndoz0uRfVlGifgHDE0mUkM",
          authDomain: "heyauth-4a3ab.firebaseapp.com",
          projectId: "heyauth-4a3ab",
          storageBucket: "heyauth-4a3ab.appspot.com",
          messagingSenderId: "943518805455",
          appId: "1:943518805455:web:5b387e0e94d55fa572f6ba"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);


const sendData = async () => {
  // loding button
    setLoadingState();

    try {
      const docRef = await addDoc(collection(db, "users"),{
        firstName: Form_values.firstNameValue,
        lastName: Form_values.lastNameValue,
        phoneNumber: Form_values.phoneNumberValue,
        educationLevel: Form_values.educationLevelValue,
        rememberMe: rememberMe
      });
      if (docRef) {
        console.log('Form data saved with ID:', docRef.id);
        successMessage.removeAttribute('hidden');
        successMessage.innerHTML = 'تم التسجيل بنجاح! شكرًا لك على التسجيل.';
        signupForm.reset()
        resetLoadingState();
        redirect()
      }
    } catch(error) {
      console.error('Error saving form data:', error);
      alert('حدث خطأ أثناء حفظ بيانات النموذج.');
      resetLoadingState();
    };
      
  
};