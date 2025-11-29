
import React, { useState } from 'react';

export default function Password() {
  const [Status, SetStatus] = useState(1);
  const Show = () => {
    SetStatus(!Status);
  };

  return (
    <>
      <center>
        <input type={Status ? 'Password' : 'text'} />
      </center>
      <center>
        <button onClick={Show}>{Status ? 'show' : 'hide'}</button>
      </center>
    </>
  );
}


