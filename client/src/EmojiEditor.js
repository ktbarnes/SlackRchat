import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const EmojiEditor = ({ editorState, onChange }) => (
  <div>
    <Editor
      editorState={editorState}
      onChange={onChange}
      plugins={[emojiPlugin]}
    />
    <EmojiSuggestions />
  </div>
)

export default EmojiEditor;