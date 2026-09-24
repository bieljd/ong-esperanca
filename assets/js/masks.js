export function applyPhoneMask(input) {
    input.addEventListener("input", () => {
        const digits = input.value.replace(/\D/g, "").slice(0, 11);
        if (digits.length <= 10) {
            input.value = digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
        }
        else {
            input.value = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
        }
    });
}
export function applyCpfMask(input) {
    input.addEventListener("input", () => {
        const digits = input.value.replace(/\D/g, "").slice(0, 11);
        input.value = digits
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    });
}
