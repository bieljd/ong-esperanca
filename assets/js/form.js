import { applyCpfMask, applyPhoneMask } from "./masks.js";
import { isValidCpf, isValidEmail } from "./validators.js";
const form = document.querySelector("#volunteer-form");
if (form) {
    const phoneInput = form.querySelector("#phone");
    const cpfInput = form.querySelector("#cpf");
    const status = form.querySelector("#form-status");
    if (phoneInput)
        applyPhoneMask(phoneInput);
    if (cpfInput)
        applyCpfMask(cpfInput);
    const showError = (fieldName, message) => {
        const field = form.elements.namedItem(fieldName);
        const error = document.querySelector(`[data-error="${fieldName}"]`);
        field?.setAttribute("aria-invalid", "true");
        if (error)
            error.textContent = message;
    };
    const clearError = (fieldName) => {
        const field = form.elements.namedItem(fieldName);
        const error = document.querySelector(`[data-error="${fieldName}"]`);
        field?.removeAttribute("aria-invalid");
        if (error)
            error.textContent = "";
    };
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        ["name", "email", "phone", "cpf", "interest", "consent"].forEach(clearError);
        const name = form.elements.namedItem("name");
        const email = form.elements.namedItem("email");
        const phone = form.elements.namedItem("phone");
        const cpf = form.elements.namedItem("cpf");
        const interest = form.elements.namedItem("interest");
        const consent = form.elements.namedItem("consent");
        let isValid = true;
        if (name.value.trim().length < 3) {
            showError("name", "Digite seu nome completo.");
            isValid = false;
        }
        if (!isValidEmail(email.value)) {
            showError("email", "Digite um e-mail válido.");
            isValid = false;
        }
        if (phone.value.replace(/\D/g, "").length < 10) {
            showError("phone", "Digite um telefone válido.");
            isValid = false;
        }
        if (!isValidCpf(cpf.value)) {
            showError("cpf", "Confira o CPF informado.");
            isValid = false;
        }
        if (!interest.value) {
            showError("interest", "Escolha uma área de interesse.");
            isValid = false;
        }
        if (!consent.checked) {
            showError("consent", "Precisamos da sua autorização para continuar.");
            isValid = false;
        }
        if (!isValid) {
            status?.classList.remove("is-visible");
            form.querySelector('[aria-invalid="true"]')?.focus();
            return;
        }
        if (status) {
            status.textContent = "Cadastro recebido! Em breve nossa equipe entrará em contato com você.";
            status.classList.add("is-visible");
        }
        form.reset();
    });
}
