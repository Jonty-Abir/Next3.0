interface obj {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  cpassword: string;
}

export function formikValidateHandlerRegiseter(value: obj): object {
  const errors = {};
  /***_______  firstName    ________**/
  if (!value.firstname) {
    // @ts-ignore
    errors.firstname = "Required*";
  }
  /***_______  lastName    ________**/
  if (!value.lastname) {
    // @ts-ignore

    errors.lastname = "Required*";
  }
  /***_______  Mobile    ________**/
  if (!value.mobile) {
    // @ts-ignore

    errors.mobile = "Required*";
  } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value.mobile)) {
    // @ts-ignore

    errors.mobile = "invalid mobile no!";
  }
  /***_______  email   ________**/

  if (!value.email) {
    // @ts-ignore

    errors.email = "Required*";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
    // @ts-ignore

    errors.email = "enter a valid email address!";
  }
  /***_______  Password    ________**/

  if (!value.password) {
    // @ts-ignore

    errors.password = "Required*";
  } else if (value.password.length < 5) {
    // @ts-ignore

    errors.password = "At-least 5 digit must!";
  }
  /***_______  Confirm password   ________**/

  if (!value.cpassword) {
    // @ts-ignore

    errors.cpassword = "Required*";
  } else if (value.cpassword.length < 5) {
    // @ts-ignore

    errors.cpassword = "At-least 5 digit must!";
  } else if (value.password !== value.cpassword) {
    // errors.password = "both password are not same!";
    // @ts-ignore

    errors.cpassword = "both password are not same!";
  }

  return errors;
}

interface loginObj {
  email: string;
  password: string;
}
export function formikValidateHandlerLogin(value: loginObj): object {
  const errors = {};
  /***_______  email   ________**/

  if (!value.email) {
    // @ts-ignore

    errors.email = "Required*";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
    // @ts-ignore

    errors.email = "enter a valid email address!";
  }
  /***_______  Password    ________**/

  if (!value.password) {
    // @ts-ignore

    errors.password = "Required*";
  }
  return errors;
}

interface update {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
}
export async function updateValidatorHandler(value: update) {
  const errors = {};
  /***_______  firstName    ________**/
  if (!value.firstname) {
    // @ts-ignore
    errors.firstname = "Required*";
  }
  /***_______  lastName    ________**/
  if (!value.lastname) {
    // @ts-ignore

    errors.lastname = "Required*";
  }
  /***_______  Mobile    ________**/
  if (!value.mobile) {
    // @ts-ignore

    errors.mobile = "Required*";
  } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value.mobile)) {
    // @ts-ignore

    errors.mobile = "invalid mobile no!";
  }
  /***_______  email   ________**/

  if (!value.email) {
    // @ts-ignore

    errors.email = "Required*";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
    // @ts-ignore

    errors.email = "enter a valid email address!";
  }

  return errors;
}

export function resetPasswordValidation(value: any) {
  const errors = {};
  /***_______     ________**/

  if (!value.password) {
    // @ts-ignore

    errors.password = "Required*";
  } else if (value.password.length < 5) {
    // @ts-ignore

    errors.password = "At-least 5 digit must!";
  }
  /***_______     ________**/

  if (!value.cpassword) {
    // @ts-ignore

    errors.cpassword = "Required*";
  } else if (value.cpassword.length < 5) {
    // @ts-ignore

    errors.cpassword = "At-least 5 digit must!";
  } else if (value.password !== value.cpassword) {
    // errors.password = "both password are not same!";
    // @ts-ignore

    errors.cpassword = "both password are not same!";
  }
  return errors;
}
