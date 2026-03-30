import "./style.css";

const giveUpInfo = document.getElementById(
    "submit-button",
) as HTMLButtonElement;
const dataStealer = document.getElementById("data-steal") as HTMLFormElement;

if (giveUpInfo) {
    giveUpInfo.addEventListener("click", (e) => {
        e.preventDefault();
        validateFirstName();
        validateLastName();
        validateEmail();
        validateZipCode();
        validatePasswd();
        validateRePasswd();
        if (dataStealer.checkValidity()) {
            alert("Your data has been stolen successafully");
        }
    });
}

const firstName = document.getElementById("first-name") as HTMLInputElement;
const firstNameErrorSpace = document.querySelector(
    "#first-name + span",
) as HTMLSpanElement;
firstName.addEventListener("input", validateFirstName);

function validateFirstName(): boolean {
    if (!isValidName(firstName.value)) {
        firstNameErrorSpace.textContent = "You moron! GIVE US THE REAL NAME";
        firstName.setCustomValidity("Invalid name!");
        return true;
    } else {
        firstNameErrorSpace.textContent = "";
        firstName.setCustomValidity("");
        return false;
    }
}

const lastName = document.getElementById("last-name") as HTMLInputElement;
const errorDisplay = document.querySelector(
    "#last-name + span",
) as HTMLSpanElement;
lastName.addEventListener("input", validateLastName);

function validateLastName() {
    if (!isValidName(lastName.value)) {
        errorDisplay.textContent = "🤬";
    } else {
        errorDisplay.textContent = "";
    }
}

function isValidName(e: string): boolean {
    return e.length >= 2;
}

const email = document.getElementById("email-address") as HTMLInputElement;
const emailErrorSpace = document.querySelector(
    "#email-address + span",
) as HTMLSpanElement;

email.addEventListener("input", validateEmail);

function validateEmail() {
    email.setCustomValidity("");
    emailErrorSpace.textContent = "";
    if (email.validity.typeMismatch) {
        emailErrorSpace.textContent = "Please use a real email";
        email.setCustomValidity("Invalid email");
    } else if (email.validity.valueMissing) {
        emailErrorSpace.textContent = "????";
        email.setCustomValidity("Invalid email");
    }
}

const country = document.getElementById("country") as HTMLSelectElement;
const zipCode = document.getElementById("postal-code") as HTMLInputElement;
const zipErrorSpace = document.querySelector(
    "#postal-code + span",
) as HTMLSpanElement;
const constraints: CountryData[] = [
    {
        nameID: "ch",
        errorMessage:
            "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
        regex: "^(CH-)?\\d{4}$",
    },
    {
        nameID: "fr",
        regex: "^(F-)?\\d{5}$",
        errorMessage:
            "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    },
    {
        nameID: "de",
        regex: "^(D-)?\\d{5}$",
        errorMessage:
            "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    },
    {
        nameID: "nl",
        regex: "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        errorMessage:
            "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    },
];

if (country) {
    country.addEventListener("input", validateZipCode);
}

if (zipCode) {
    zipCode.addEventListener("input", validateZipCode);
}

function validateZipCode() {
    const countryVal = country.value;
    const givenZipCode = zipCode.value;
    zipCode.setCustomValidity("");

    // Match the zip code with the constrain
    const selectedCountry = constraints.find((x) => x.nameID === countryVal);
    if (selectedCountry) {
        const reg = new RegExp(selectedCountry.regex, "");
        const isValid = reg.test(givenZipCode);
        if (isValid) {
            zipCode.setCustomValidity("");
            zipErrorSpace.textContent = "";
        } else {
            zipCode.setCustomValidity(selectedCountry.errorMessage);
            zipErrorSpace.textContent = selectedCountry.errorMessage;
        }
    }
}
interface CountryData {
    nameID: string;
    regex: string;
    errorMessage: string;
}

const passwd = document.getElementById("passwd") as HTMLInputElement;
const passwdError = document.querySelector("#passwd + span") as HTMLSpanElement;

const regexWord = /[a-zA-Z]/;
const regexDigit = /\d/;
const regexSpecialDigits = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

if (passwd) {
    passwd.addEventListener("input", validatePasswd);
}

function validatePasswd() {
    passwd.setCustomValidity("");
    const userPassword = passwd.value;

    let errorMessage = "";

    if (userPassword.length <= 7) {
        errorMessage += "<br>❌ Password too sort";
        passwd.setCustomValidity("length error");
    } else if (userPassword.length >= 33) {
        errorMessage += "<br>❌ Password too Large";
        passwd.setCustomValidity("length error");
    } else {
        errorMessage += "<br>✅ Good length";
    }

    if (regexWord.test(userPassword)) {
        errorMessage += "<br>✅ Contains at least an alphabet character";
    } else {
        errorMessage +=
            "<br>❌ Doesn't contain at least one alphabet character";
        passwd.setCustomValidity("char error");
    }

    if (regexDigit.test(userPassword)) {
        errorMessage += "<br>✅ Contains at least a digit character";
    } else {
        passwd.setCustomValidity("char error");
        errorMessage += "<br>❌ Doesn't contain at least one numeric character";
    }

    if (regexSpecialDigits.test(userPassword)) {
        errorMessage += "<br>✅ Contains at least a special character";
    } else {
        passwd.setCustomValidity("char error");
        errorMessage += `<br>❌ Doesn't contain at least one special character: ${regexSpecialDigits}`;
    }

    passwdError.innerHTML = errorMessage;
    validateRePasswd(true);
}

const rePasswd = document.getElementById("passwd-confirm") as HTMLInputElement;
const rePasswdError = document.querySelector(
    "#passwd-confirm + span",
) as HTMLSpanElement;

if (rePasswd) {
    rePasswd.addEventListener("input", () => validateRePasswd);
}

function validateRePasswd(quiet = false) {
    if (quiet) {
        rePasswdError.textContent = "";
        rePasswd.setCustomValidity("pending");
    } else {
        if (rePasswd.value === passwd.value) {
            if (rePasswd.value.trim() === "") {
                rePasswd.setCustomValidity("empty");
                rePasswdError.textContent = "-_-";
            } else {
                rePasswd.setCustomValidity("");
                rePasswdError.textContent = "✅ Passwords match";
            }
        } else {
            rePasswd.setCustomValidity("not match");
            rePasswdError.textContent = "Passwords doesn't match";
        }
    }
}
