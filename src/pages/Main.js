import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// modules
import { getRecentDB } from '../redux/modules/recent';
import { getFavoriteDB } from '../redux/modules/favorite';
import { getRecommendedDB, getMostUsedKeyDB } from '../redux/modules/search';

// elements & components
import MainBody from '../components/Main_MainBody';
import LogoHeader from '../shared/LogoHeader';

// helmet
import {Helmet} from 'react-helmet';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 박용태
*/

const Main = (props) => {

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    if (is_login) {
      dispatch(getRecentDB());
      dispatch(getFavoriteDB());
    }
    dispatch(getRecommendedDB())
    dispatch(getMostUsedKeyDB());

  }, []);

  return (
    <React.Fragment>
      
      {/* 헬멧 */}
      <Helmet>
        <title>[Calog] 칼로리 검색</title>
        <meta property="og:image" content="%PUBLIC_URL%/icons/helmet.png" />
      </Helmet>

      <LogoHeader/>
      <MainBody/>
    </React.Fragment>
  );
}

Main.defaultProps = {

}

export default Main;