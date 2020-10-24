import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import MainHeader from '../../../components/mainHeader';
import { AuthContext } from "../../../context/auth";
import { texts, svgIcons } from '../../../constant';

const SPageWrap = styled.div`
  height: 100vh;
  transition: transform 0.5s ease,opacity 1s ease;
  &:before {
    content: '';
    display: block;
    position: fixed;
    bottom: -5vh;
    left: -5vw;
    width: 110vw;
    height: 110vh;
    pointer-events: none;
    transform: scale(1);
    z-index: -1;
    background-image: url('/images/overlay.png'), linear-gradient(30deg, rgba(121,82,119,0.975) 30%, #355192 85%);
    background-size: 256px, cover;
    background-position: center, center;
    background-repeat: repeat, no-repeat;
  }
  &:after {
    content: '';
    display: block;
    position: fixed;
    bottom: -5vh;
    left: -5vw;
    width: 110vw;
    height: 110vh;
    pointer-events: none;
    transform: scale(1);
    z-index: -1;
    background-image: url('/images/bg.svg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    transition: filter 0.5s ease,opacity 1s ease;
  }
`;
const SContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: -4em;
  min-height: calc(100vh - 64px);
  padding: 4em 0;
  transition: transform 0.5s ease,opacity 1s ease;
  h1 {
    color: #fff;
    font-size: 3.5em;
    margin-bottom: 1.25em;
    letter-spacing: -0.025em;
    text-align: center;
  }
  img {
    width: 20em;
    height: 6em;
  }
`;
const SLink = styled(Link)`
  transition: background-color .2s ease-in-out,box-shadow .2s ease-in-out,opacity .2s ease-in-out,color .2s ease-in-out;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  height: 3.3em;
  line-height: 3.3em;
  padding: 0 1.5em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  background-color: #33ada9;
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.125);
  color: #fff !important;
  min-width: 16.5em;
  &:hover,
  &:focus {
    box-shadow: inset 0 0 0 2px #33fff9;
  }
`;

function Home() {
  const { auth, setAuthData } = useContext(AuthContext);
  
  const logout = () => {
    setAuthData({ token: null });
  };

  return (
    <SPageWrap>
      <MainHeader auth={auth} logout={logout} color={true} />
      <SContent>
        <img src={svgIcons.white_logo} alt="logo" />
        <h1>{texts.siteTitle}</h1>
        {auth.token ? 
          <SLink to="/admin/pages">{texts.dashboard}</SLink>
          :
          <SLink to="/login">{texts.login}</SLink>
        }
      </SContent>
    </SPageWrap>
  );
}

export default Home;
