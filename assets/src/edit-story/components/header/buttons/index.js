/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import CircularProgress from '../../circularProgress';
import useAdStory from '../../../app/storyAd/useAdStory';
import DownloadZip from './downloadZip';
import Preview from './preview';

const LOADER_SIZE = 26;

const ButtonList = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1em;
  height: 100%;
`;

const List = styled.div`
  display: flex;
  align-items: center;
`;

const Space = styled.div`
  width: 8px;
`;

function Loading() {
  const {
    state: { isDownloading },
  } = useAdStory();

  return isDownloading && <CircularProgress size={LOADER_SIZE} />;
}

function Buttons() {
  return (
    <ButtonList>
      <List>
        <Loading />
        <Space />
        <Preview />
        <Space />
        <DownloadZip />
        <Space />
      </List>
    </ButtonList>
  );
}

export default Buttons;
