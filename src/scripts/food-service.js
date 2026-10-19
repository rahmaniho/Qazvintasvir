const toLatinDigits = (value) => {
  const digits = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  };
  return String(value).replace(/[۰-۹٠-٩]/g, (digit) => digits[digit] ?? digit);
};

const tabs = Array.from(document.querySelectorAll('.food-tab'));
const panels = Array.from(document.querySelectorAll('.food-panel'));

function activateTab(tab) {
  const panelId = tab.getAttribute('aria-controls');
  tabs.forEach((candidate) => {
    const selected = candidate === tab;
    candidate.classList.toggle('is-active', selected);
    candidate.setAttribute('aria-selected', String(selected));
    candidate.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    const selected = panel.id === panelId;
    panel.classList.toggle('is-active', selected);
    if (selected) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden', '');
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex = null;
    const rtl = document.documentElement.dir === 'rtl';
    if (event.key === 'ArrowLeft') nextIndex = (index + (rtl ? 1 : -1) + tabs.length) % tabs.length;
    else if (event.key === 'ArrowRight') nextIndex = (index + (rtl ? -1 : 1) + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus({ preventScroll: true });
  });
});

const mealInputs = Array.from(document.querySelectorAll('.food-meal input[type="checkbox"]'));
const mealsMirror = document.getElementById('food-meals-mirror');
const mealsFeedback = document.querySelector('[data-feedback-for="food-meals"]');

function syncMealSelection() {
  const selectedMeals = [];
  mealInputs.forEach((input) => {
    input.closest('.food-meal')?.classList.toggle('is-checked', input.checked);
    if (input.checked) selectedMeals.push(input.value);
  });
  if (mealsMirror) mealsMirror.value = selectedMeals.join(document.documentElement.dir === 'rtl' ? '، ' : ', ');
  if (selectedMeals.length) mealsFeedback?.classList.remove('is-error');
}

mealInputs.forEach((input) => input.addEventListener('change', syncMealSelection));
syncMealSelection();

const foodForm = document.getElementById('personnel-food-form');
if (foodForm instanceof HTMLFormElement) {
  const fieldSpecs = [
    { id: 'food-company', validate: (value) => value.trim().length >= 2 },
    { id: 'food-person', validate: (value) => value.trim().length >= 2 },
    { id: 'food-phone', validate: (value) => /^(\+98|0098|0)?9\d{9}$/.test(toLatinDigits(value).replace(/[\s\-()]/g, '')) },
    { id: 'food-headcount', validate: (value) => {
      const count = Number.parseInt(toLatinDigits(value).replace(/[^\d]/g, ''), 10);
      return Number.isInteger(count) && count >= 10 && count <= 50000;
    } },
    { id: 'food-address', validate: (value) => value.trim().length >= 5 },
  ].map((spec) => ({ ...spec, element: foodForm.querySelector(`#${spec.id}`) }));

  const setFieldValidity = (field, valid) => {
    if (!(field instanceof HTMLElement)) return;
    field.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    foodForm.querySelector(`[data-feedback-for="${field.id}"]`)?.classList.toggle('is-error', !valid);
  };

  fieldSpecs.forEach((spec) => {
    spec.element?.addEventListener('input', () => {
      if (spec.element.classList.contains('is-invalid')) {
        setFieldValidity(spec.element, spec.validate(spec.element.value));
      }
    });
  });

  foodForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    let firstInvalid = null;

    fieldSpecs.forEach((spec) => {
      if (!(spec.element instanceof HTMLInputElement)) return;
      const fieldIsValid = spec.validate(spec.element.value);
      setFieldValidity(spec.element, fieldIsValid);
      if (!fieldIsValid) {
        valid = false;
        firstInvalid ??= spec.element;
      }
    });

    const selectedMeals = mealInputs.filter((input) => input.checked);
    mealsFeedback?.classList.toggle('is-error', selectedMeals.length === 0);
    if (selectedMeals.length === 0) {
      valid = false;
      firstInvalid ??= mealInputs[0] ?? null;
    }

    if (!valid) {
      window.showToast?.(document.documentElement.lang === 'fa'
        ? 'لطفاً فیلدهای الزامی فرم تأمین غذا را به درستی تکمیل فرمایید.'
        : 'Please complete the required catering form fields correctly.');
      firstInvalid?.focus({ preventScroll: true });
      return;
    }

    const submitButton = foodForm.querySelector('#food-submit-btn');
    const originalButtonText = submitButton?.innerHTML ?? '';
    const company = foodForm.querySelector('#food-company')?.value.trim() ?? '';
    const contact = foodForm.querySelector('#food-person')?.value.trim() ?? '';
    const phone = foodForm.querySelector('#food-phone')?.value.trim() ?? '';
    const headcount = foodForm.querySelector('#food-headcount')?.value.trim() ?? '';
    const address = foodForm.querySelector('#food-address')?.value.trim() ?? '';
    const notes = foodForm.querySelector('#food-notes')?.value.trim() ?? '';
    const isFa = document.documentElement.lang === 'fa';
    const mealSeparator = isFa ? '، ' : ', ';
    const lines = isFa
      ? [
          'درخواست قرارداد تأمین غذای پرسنل — وب‌سایت قزوین تصویر',
          '',
          `نام شرکت / کارخانه: ${company}`,
          `نام رابط: ${contact}`,
          `شماره تماس: ${toLatinDigits(phone)}`,
          `تعداد پرسنل: ${toLatinDigits(headcount)}`,
          `وعده‌های مورد نیاز: ${selectedMeals.map((input) => input.value).join(mealSeparator)}`,
          `آدرس محل توزیع: ${address}`,
        ]
      : [
          'Staff catering contract request — Qazvin Tasvir website',
          '',
          `Company / factory: ${company}`,
          `Contact person: ${contact}`,
          `Phone: ${toLatinDigits(phone)}`,
          `Number of staff: ${toLatinDigits(headcount)}`,
          `Meals required: ${selectedMeals.map((input) => input.value).join(mealSeparator)}`,
          `Delivery address: ${address}`,
        ];
    if (notes) lines.push(`${isFa ? 'توضیحات' : 'Notes'}: ${notes}`);

    window.open(`https://wa.me/989122815189?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
      submitButton.innerHTML = submitButton.getAttribute('data-success-label') || (isFa ? '✓ درخواست شما به واتساپ ارسال شد' : '✓ Request ready in WhatsApp');
      submitButton.style.background = '#10B981';
      submitButton.style.color = '#FFFFFF';
    }
    window.showToast?.(isFa
      ? 'درخواست شما در واتساپ آماده شد؛ لطفاً در صفحه‌ی باز شده دکمه‌ی ارسال را بزنید.'
      : 'Your request is ready in WhatsApp. Review it there and press Send.');

    window.setTimeout(() => {
      foodForm.reset();
      fieldSpecs.forEach(({ element }) => element && setFieldValidity(element, true));
      mealsFeedback?.classList.remove('is-error');
      syncMealSelection();
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.innerHTML = originalButtonText;
        submitButton.style.background = '';
        submitButton.style.color = '';
      }
    }, 4500);
  });
}
