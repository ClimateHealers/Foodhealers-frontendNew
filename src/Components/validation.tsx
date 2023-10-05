import * as Yup from "yup";
import { localized } from "../locales/localization";

//signup form
export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,15}$/,
      "NAME_MUST_BE_15"
    ),
  email: Yup.string()
    .email(`${localized.t("PLEASE_ENTER_YOUR_EMAIL")}`)
    .required(`${localized.t("EMAIL_IS_REQUIRED")}`),
  password: Yup.string()
    .trim()
    .matches(/\w*[a-z]\w*/, `${localized.t("PASSWORD_MUST_HAVE_SMALL")}`)
    .matches(/\w*[A-Z]\w*/, `${localized.t("PASSWORD_MUST_HAVE_CAPS")}`)
    .matches(/\d/, `${localized.t("PASSWORD_MUST_HAVE_NUMBERS")}`)
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      `${localized.t("PASSWORD_MUST_HAVE_CHAR")}`
    )
    .min(
      6,
      ({ min }) =>
        `${localized.t("PASSWORD_MUST_BE_LEAST")} ${min} ${localized.t(
          "CHARACTERS"
        )}`
    )
    .required(`${localized.t("PASSWORD_IS_REQUIRED")}`),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], `${localized.t("Passwords do not match")}`)
    .required(`${localized.t("CONFIRM_PASSWORD_IS_REQUIRED")}`),
});

//   login form
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(`${localized.t("PLEASE_ENTER_YOUR_EMAIL")}`)
    .required(`${localized.t("EMAIL_IS_REQUIRED")}`),
  password: Yup.string()
    .trim()
    .matches(/\w*[a-z]\w*/, `${localized.t("PASSWORD_MUST_HAVE_SMALL")}`)
    .matches(/\w*[A-Z]\w*/, `${localized.t("PASSWORD_MUST_HAVE_CAPS")}`)
    .matches(/\d/, `${localized.t("PASSWORD_MUST_HAVE_NUMBERS")}`)
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      `${localized.t("PASSWORD_MUST_HAVE_CHAR")}`
    )
    .min(
      6,
      ({ min }) =>
        `${localized.t("PASSWORD_MUST_BE_LEAST")} ${min} ${localized.t(
          "CHARACTERS"
        )}`
    )
    .required(`${localized.t("PASSWORD_IS_REQUIRED")}`),
});

//post event form

export const postEventSchema = Yup.object().shape({
  eventName: Yup.string()
    .required(`${localized.t("EVENT_NAME_IS_REQUIRED")}`)
    .matches(/\w*[a-z]\w*/, `${localized.t("ONLY_ALPHABETS_ARE_ALLOWED")}`),
  address: Yup.string()
    .required(`${localized.t("ADDRESS_IS_REQUIRED")}`)
    .matches(/\w*[a-z]\w*/, `${localized.t("ONLY_ALPHABETS_ARE_ALLOWED")}`),
  served: Yup.string()
    .required(`${localized.t("THIS_FIELD_IS_REQUIRED")}`)
    .min(
      6,
      ({ min }) =>
        `${localized.t("THIS_FIELD_MUST_BE_AT_LEAST")} ${min} ${localized.t(
          "CHARACTERS"
        )}`
    )
    .matches(/\w*[a-z]\w*/, `${localized.t("ONLY_ALPHABETS_ARE_ALLOWED")}`),
  volunteers: Yup.string().matches(
    /^[0-9]{1,3}$/,
    `${localized.t("PLEASE_ENTER_A_VALID_VOLUNTEER")}`
  ),
});

//post event form

export const AddDonations = Yup.object().shape({
  foodItem: Yup.string()
    .required(`${localized.t("NAME_IS_REQUIRED")}`)
    .matches(/\w*[a-z]\w*/, `${localized.t("ONLY_ALPHABETS_ARE_ALLOWED")}`),
  quantity: Yup.string().required(`${localized.t("THIS_FIELD_IS_REQUIRED")}`),
  // .matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric CHARACTERS are allowed'),
  address: Yup.string()
    .required(`${localized.t("ADDRESS_IS_REQUIRED")}`)
    .matches(/\w*[a-z]\w*/, `${localized.t("ONLY_ALPHABETS_ARE_ALLOWED")}`),
  phoneNumber: Yup.string()
    .required(`${localized.t("THIS_FIELD_IS_REQUIRED")}`)
    .matches(/^[0-9]+$/, {
      message: `${localized.t("Only numbers are allowed")}`,
      excludeEmptyString: true,
    }),
  flatNo: Yup.string()
    .required(`${localized.t("THIS_FIELD_IS_REQUIRED")}`)
    .matches(/^[0-9]+$/, {
      message: `${localized.t("Only numbers are allowed")}`,
      excludeEmptyString: true,
    }),
  zipCode: Yup.string()
    .required(`${localized.t("THIS_FIELD_IS_REQUIRED")}`)
    .matches(/^[0-9]+$/, {
      message: `${localized.t("Only numbers are allowed")}`,
      excludeEmptyString: true,
    })
    .min(
      6,
      ({ min }) =>
        `${localized.t("THIS_FIELD_MUST_BE_AT_LEAST")} ${min} ${localized.t(
          "CHARACTERS"
        )}`
    ),
});

//addVolunteerATAnEvent

export const addVolunteer = Yup.object().shape({
  name: Yup.string()
    .required(`${localized.t("VOLUNTEER_NAME_IS_REQUIRED")}`)
    .matches(/\w*[a-z]\w*/, `${localized.t("ONLY_ALPHABETS_ARE_ALLOWED")}`),
  // volunteerFullAddress: Yup.string()
  // .required("Address is required")
  //   // .matches(/\w*[a-z]\w*/, "Only alphabets are allowed"),
  // address: Yup.string()
  //   .required(`${localized.t("Address is required")}`)
  //   .matches(/\w*[a-z]\w*/, `${localized.t("ONLY_ALPHABETS_ARE_ALLOWED")}`),
  phoneNumber: Yup.string()
    .required(`${localized.t("THIS_FIELD_IS_REQUIRED")}`)
    .matches(/^[0-9]+$/, {
      message: `${localized.t("Only numbers are allowed")}`,
      excludeEmptyString: true,
    }),
  zipCode: Yup.string()
    .required(`${localized.t("THIS_FIELD_IS_REQUIRED")}`)
    .matches(/^[0-9]+$/, {
      message: `${localized.t("Only numbers are allowed")}`,
      excludeEmptyString: true,
    })
    .min(
      6,
      ({ min }) =>
        `${localized.t("THIS_FIELD_MUST_BE_AT_LEAST")} ${min} ${localized.t(
          "CHARACTERS"
        )}`
    ),
});
