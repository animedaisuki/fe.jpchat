import React, { useMemo } from "react";
import styles from "./ChatMessage.module.scss";
import parse from "html-react-parser";

export default function ChatMessage(props) {
  const { message, stickers } = props;

  const findSticker = (unicode, stickers) => {
    const foundSticker = stickers.find(
      (sticker) => sticker.unicode === unicode
    );
    if (foundSticker) {
      // console.log("Sticker found:", foundSticker);
      return `<img src="${foundSticker.png}" style="width:100%;height:100%;" alt="${foundSticker.unicode}" />`;
    } else {
      // console.log("Sticker not found:", unicode);
      return unicode;
    }
  };

  const replaceEmojisWithStickers = (text, stickers) => {
    const emojiRegex = /stk\{(\d{4})\}/g;
    let newText = text;
    let match;
    // console.log(newText);
    while ((match = emojiRegex.exec(text)) !== null) {
      const unicode = match[0];
      const stickerOrUnicode = findSticker(unicode, stickers);
      newText = newText.replace(unicode, stickerOrUnicode);
    }
    return newText;
  };

  // const messageWithStickers = replaceEmojisWithStickers(message.text, stickers);
  const messageWithStickers = useMemo(
    () => replaceEmojisWithStickers(message.text, stickers),
    [message.text, replaceEmojisWithStickers, stickers]
  );

  //使用 html-react-parser 将返回的字符串解析为 React 组件
  const parsedElements = parse(messageWithStickers);

  // const emojiArray = toArray(messageWithStickers);

  return (
    <div className={styles.chatDetailsChatArea}>
      <div className={styles.chatDetailsChatAreaAvatarContainer}>
        {/*之后可以通过senderId找到对应的avatar*/}
        <img
          className={styles.chatDetailsChatAreaAvatar}
          src={message?.senderId.avatar}
          alt={message?.senderId.username}
        />
      </div>
      <div className={styles.chatDetailsChatAreaDateAndBoxContainer}>
        <div>
          <p>
            <span className={styles.chatDetailsChatAreaChatBoxUsername}>
              {message?.senderId.username}
            </span>
            {"  "}
            01-03-2023
          </p>
        </div>
        <div className={styles.chatDetailsChatAreaChatBox}>
          {/*<EmojioneV4 text={message.text} size={32} />*/}
          {/*{message.text}*/}
          {/*<EmojioneV4 text={messageWithStickers} size={32} />*/}
          {/*<div dangerouslySetInnerHTML={{ __html: messageWithStickers }} />*/}
          {parsedElements}
        </div>
      </div>
    </div>
  );
}
