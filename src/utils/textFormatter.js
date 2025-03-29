// src/utils/textFormatter.js
/**
 * Utility to handle text formatting for the chat input
 * Supports keyboard shortcuts for common formatting
 */

// Format text as bold
export const formatBold = (text, selectionStart, selectionEnd) => {
  const selectedText = text.substring(selectionStart, selectionEnd);
  const beforeText = text.substring(0, selectionStart);
  const afterText = text.substring(selectionEnd);

  const formattedText = `${beforeText}**${selectedText}**${afterText}`;

  return {
    text: formattedText,
    newCursorPosition: selectionEnd + 4, // Account for the added ** markers
  };
};

// Format text as italic
export const formatItalic = (text, selectionStart, selectionEnd) => {
  const selectedText = text.substring(selectionStart, selectionEnd);
  const beforeText = text.substring(0, selectionStart);
  const afterText = text.substring(selectionEnd);

  const formattedText = `${beforeText}*${selectedText}*${afterText}`;

  return {
    text: formattedText,
    newCursorPosition: selectionEnd + 2, // Account for the added * markers
  };
};

// Format text as code
export const formatCode = (text, selectionStart, selectionEnd) => {
  const selectedText = text.substring(selectionStart, selectionEnd);
  const beforeText = text.substring(0, selectionStart);
  const afterText = text.substring(selectionEnd);

  const formattedText = `${beforeText}\`${selectedText}\`${afterText}`;

  return {
    text: formattedText,
    newCursorPosition: selectionEnd + 2, // Account for the added ` markers
  };
};

// Handle keyboard shortcuts for formatting
export const handleKeyboardShortcuts = (
  e,
  text,
  selectionStart,
  selectionEnd
) => {
  // If no text is selected, return unchanged
  if (selectionStart === selectionEnd) {
    return { text, newCursorPosition: selectionEnd };
  }

  // Ctrl/Cmd + B for bold
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault();
    return formatBold(text, selectionStart, selectionEnd);
  }

  // Ctrl/Cmd + I for italic
  if ((e.ctrlKey || e.metaKey) && e.key === "i") {
    e.preventDefault();
    return formatItalic(text, selectionStart, selectionEnd);
  }

  // Ctrl/Cmd + K for code
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    return formatCode(text, selectionStart, selectionEnd);
  }

  // No formatting applied
  return { text, newCursorPosition: selectionEnd };
};

// Parse formatted text for display
export const parseFormattedText = (text) => {
  // Replace **text** with <strong>text</strong>
  let parsedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace *text* with <em>text</em> (but not inside already processed tags)
  parsedText = parsedText.replace(
    /(?<!<strong>.*)\*(.*?)\*(?!.*<\/strong>)/g,
    "<em>$1</em>"
  );

  // Replace `text` with <code>text</code>
  parsedText = parsedText.replace(/`(.*?)`/g, "<code>$1</code>");

  return parsedText;
};
