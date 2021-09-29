import React from "react";
import InstagramEmbed from 'react-instagram-embed';

export default function Instagram() {
  return (
      <InstagramEmbed
  url='https://www.instagram.com/p/CRY6V_JF1aR/'
  maxWidth={500}
  hideCaption={true}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
  );

}
