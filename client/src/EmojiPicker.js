import React from 'react';
import { Picker, Emoji } from 'emoji-mart';

const EmojiPicker = () => {

  return (
    <div>
      <Picker
        emojiSize={20}
        perLine={9}
        skin={1}
        set={'apple'}
        onClick={(emoji) => console.log(emoji)}
      />
    </div>

  )
}

export default EmojiPicker;