/**
 * Telegram Mini App - Random Number Generator
 * Clean, readable JavaScript code
 */

(() => {
  // Telegram WebApp API
  const tg = window.Telegram?.WebApp;
  tg?.ready?.();
  tg?.expand?.();

  // DOM Elements
  const els = {
    currentValue: document.getElementById('currentValue'),
    minValue: document.getElementById('minValue'),
    maxValue: document.getElementById('maxValue'),
    randomBtn: document.getElementById('randomBtn'),
    errorMsg: document.getElementById('errorMsg')
  };

  /**
   * Initialize default values
   */
  function setDefaults() {
    els.minValue.textContent = '1';
    els.maxValue.textContent = '100';
    els.currentValue.textContent = '';
  }

  /**
   * Apply Telegram theme colors
   */
  function applyTheme() {
    if (!tg || !tg.themeParams) return;
    
    const themeParams = tg.themeParams;
    
    // Apply background color
    if (themeParams.bg_color) {
      document.body.style.backgroundColor = themeParams.bg_color;
    }
    
    // Apply text color
    if (themeParams.text_color) {
      document.body.style.color = themeParams.text_color;
    }
  }

  /**
   * Safely parse integer from string
   * @param {string} value - String to parse
   * @returns {number|null} - Parsed integer or null if invalid
   */
  function parseIntSafe(value) {
    const parsed = Number.parseInt(String(value).trim(), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  /**
   * Validate min and max values
   * @param {string} minStr - Minimum value string
   * @param {string} maxStr - Maximum value string
   * @returns {Object} - Validation result
   */
  function validate(minStr, maxStr) {
    const min = parseIntSafe(minStr);
    const max = parseIntSafe(maxStr);
    
    if (min === null || max === null) {
      return { ok: false, message: 'Введите целые числа.' };
    }
    
    if (Math.abs(min) > 2147483647 || Math.abs(max) > 2147483647) {
      return { ok: false, message: 'Числа слишком большие.' };
    }
    
    if (min > max) {
      return { ok: false, message: 'Минимум не может быть больше максимума.' };
    }
    
    return { ok: true, min, max };
  }

  /**
   * Generate random integer in range [min, max]
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} - Random integer
   */
  function randInt(min, max) {
    const range = max - min + 1;
    let randomValue;
    
    // Use crypto.getRandomValues if available, fallback to Math.random
    if (window.crypto && window.crypto.getRandomValues) {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      randomValue = buffer[0];
    } else {
      randomValue = Math.floor(Math.random() * 0xffffffff);
    }
    
    return min + (randomValue % range);
  }

  /**
   * Show or hide error message
   * @param {string} message - Error message to display
   */
  function setError(message) {
    if (tg) {
      if (message) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }
    }
    
    // Disable button if error
    els.randomBtn.disabled = Boolean(message);
    els.randomBtn.title = message || '';
    
    // Show/hide error message
    if (els.errorMsg) {
      if (message) {
        els.errorMsg.textContent = message;
        els.errorMsg.style.display = 'block';
      } else {
        els.errorMsg.textContent = '';
        els.errorMsg.style.display = 'none';
      }
    }
  }

  /**
   * Update validation state
   * @returns {Object} - Validation result
   */
  function updateValidity() {
    const min = (els.minValue.textContent || '').trim();
    const max = (els.maxValue.textContent || '').trim();
    const validation = validate(min, max);
    
    setError(validation.ok ? '' : validation.message);
    return validation;
  }

  /**
   * Animate result number
   */
  function animateResult() {
    els.currentValue.style.transform = 'scale(1.1)';
    els.currentValue.style.opacity = '0.6';
    
    setTimeout(() => {
      els.currentValue.style.transform = 'scale(1)';
      els.currentValue.style.opacity = '1';
    }, 180);
  }

  /**
   * Generate random number
   * @param {Event} event - Click event
   */
  function onGenerate(event) {
    event?.preventDefault?.();
    
    const validation = updateValidity();
    if (!validation.ok) return;
    
    const randomNumber = randInt(validation.min, validation.max);
    els.currentValue.textContent = String(randomNumber);
    animateResult();
  }

  /**
   * Handle min value click
   */
  function onMinValueClick() {
    const currentValue = els.minValue.textContent || '1';
    const newValue = prompt('Минимум', currentValue);
    
    if (newValue !== null) {
      els.minValue.textContent = newValue;
      updateValidity();
    }
  }

  /**
   * Handle max value click
   */
  function onMaxValueClick() {
    const currentValue = els.maxValue.textContent || '100';
    const newValue = prompt('Максимум', currentValue);
    
    if (newValue !== null) {
      els.maxValue.textContent = newValue;
      updateValidity();
    }
  }

  /**
   * Handle Enter key press
   * @param {KeyboardEvent} event - Keyboard event
   */
  function onKeyDown(event) {
    if (event.key === 'Enter') {
      onGenerate(event);
    }
  }

  // Initialize app
  setDefaults();
  updateValidity();

  // Event listeners
  els.randomBtn.addEventListener('click', onGenerate);
  els.minValue.addEventListener('click', onMinValueClick);
  els.maxValue.addEventListener('click', onMaxValueClick);
  document.addEventListener('keydown', onKeyDown);

  // Telegram WebApp integration
  if (tg) {
    tg.MainButton.setText('Рандом');
    tg.MainButton.onClick(onGenerate);
    applyTheme();
    tg.onEvent('themeChanged', applyTheme);
    
    // Hide HTML button in Telegram, use only MainButton
    els.randomBtn.style.display = 'none';
    
    // Enable closing confirmation for better UX
    tg.enableClosingConfirmation();
  }
})();