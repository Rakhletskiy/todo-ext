export const regValidate = (login, password, confPassword, haveThisLogin, setValidatingField, openNotification, setLogin) => {
  // validate e-mail input
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login);
// validate input fields with adding the flag which set the error class
login === ''
? setValidatingField(1)
: password === ''
? setValidatingField(2)
: confPassword === ''
? setValidatingField(3)
: !isValidEmail
? setValidatingField(4)
: setValidatingField(null);

// deeper validate input fields
if (password !== confPassword && password !== '' && confPassword !== '' && login !== '' && isValidEmail) {
openNotification('Error!', 'Type the identical passwords please', false);
return false
} else if (password.length < 6 && password === confPassword && password !== '' && confPassword !== '' && login !== '') {
openNotification('Error!', 'Password requires 6 or more characters', false);
return false
} else if (haveThisLogin) {
openNotification('Error!', 'This login already exists', false);
return false
} else if (password !== '' && confPassword !== '' && login !== '' && isValidEmail) {
openNotification('Success!', 'Thank you for registration! Now you can login in system.', true);
setLogin('');
return true
}

}
