export function copyTextToClipboard(text: string) {
  if (navigator.clipboard) {
    // Use the modern Clipboard API
    navigator.clipboard
      .writeText(text)
      .then()
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text using execCommand: ', err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
