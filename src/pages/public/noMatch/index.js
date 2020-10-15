import React from 'react'
import { Redirect } from 'react-router-dom'

function noMatch() {
  return (
    <Redirect to='/' />
  );
}

export default noMatch;
