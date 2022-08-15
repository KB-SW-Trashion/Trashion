import React from 'react';
import styled from 'styled-components';
import { Navbar, Styles_img } from 'components';

const Main = styled.div``;

const Container = styled.div`
  width: 1300px;
  display: flex;
  margin: 0 auto;
  margin-top: 80px;
`;

const PictureSetting = styled.div`
  width: 600px;
  background-color: black;
`;

const Image = styled.div`
  width: 318px;
  margin: 0 auto;
`;

const PersonalInfo = styled.div`
  width: 700px;
  background-color: grey;
`;

const NickName = styled.h1`
  margin-top: 50px;
`;
const Size = styled.h1``;
const Height = styled.h1``;
const Weight = styled.h1``;
const EditButton = styled.div``;
const SaveButton = styled.div``;

const ProfileSetting = () => {
  return (
    <Main>
      <Navbar />
      <Container>
        <PictureSetting>
          <Image>
            <Styles_img />
          </Image>
        </PictureSetting>
        <PersonalInfo>
          <NickName>
            <span>닉네임: </span>13123123123131231231
          </NickName>
          <Size>사이즈: 3333</Size>
          <Height>키: 132131231</Height>
          <Weight>몸무게: 444</Weight>
          <EditButton></EditButton>
          <SaveButton></SaveButton>
        </PersonalInfo>
      </Container>
    </Main>
  );
};

export default ProfileSetting;
