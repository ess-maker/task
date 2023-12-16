const signupForm = document.getElementById('singup_auth');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const phoneNumber = document.getElementById('PhoneNumber');
const educationLevel = document.getElementById('Edction_level');
const checkbox = document.getElementById('flexCheckDefault');
const submitButton = document.getElementById('submitButton');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
let rememberMe;


signupForm.addEventListener('submit', e => {
  e.preventDefault();
  validateInputs();
});

checkbox.addEventListener('change', function() {
  rememberMe = checkbox.checked;
});

const validateInputs = () => {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();
  const educationLevelValue = educationLevel.value.trim();
  const nameRegex = /^[a-zA-Z]+$/; // Only alphabetic characters allowed
  const phoneRegex = /^\d{10}$/; // 10-digit phone number pattern

  errorMessage.innerHTML = ''; // Clear previous error messages
  errorMessage.setAttribute('hidden', 'true');

  if (firstNameValue === '') {
    setErrorMessage('الاسم الأول مطلوب.');
  } else if (!nameRegex.test(firstNameValue)) {
    setErrorMessage('يجب أن يحتوي الاسم الأول على حروف أبجدية فقط.');
  } else if (lastNameValue === '') {
    setErrorMessage('اسم العائلة مطلوب.');
  } else if (!nameRegex.test(lastNameValue)) {
    setErrorMessage('يجب أن يحتوي اسم العائلة على حروف أبجدية فقط.');
  } else if (phoneNumberValue === '') {
    setErrorMessage('رقم الهاتف مطلوب.');
  } else if (!phoneRegex.test(phoneNumberValue)) {
    setErrorMessage('يجب أن يكون رقم الهاتف مكونًا من 10 أرقام.');
  } else if (educationLevelValue === '') {
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
    window.location = 'https://www.tutorialspoint.com/javascript/javascript_page_redirect.htm';
  }, 1000);
}


        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
        import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
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
    setLoadingState();
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const educationLevelValue = educationLevel.value.trim();
    try {
      const docRef = await addDoc(collection(db, "users"),{
        firstName: firstNameValue,
        lastName: lastNameValue,
        phoneNumber: phoneNumberValue,
        educationLevel: educationLevelValue,
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