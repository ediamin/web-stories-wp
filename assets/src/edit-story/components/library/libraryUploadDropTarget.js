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
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@web-stories-wp/i18n';

/**
 * Internal dependencies
 */
import { UploadDropTarget, UploadDropTargetMessage } from '../uploadDropTarget';
import { useMedia } from '../../app/media';
import { getResourceFromLocalFile } from '../../app/media/utils';

const MESSAGE_ID = 'edit-story-library-upload-message';

function LibraryUploadDropTarget({ children }) {
  const { localStoryAdMedia: media, setLocalStoryAdMedia } = useMedia(
    ({
      local: {
        state: { localStoryAdMedia },
        actions: { setLocalStoryAdMedia },
      },
    }) => ({
      localStoryAdMedia,
      setLocalStoryAdMedia,
    })
  );

  const onDropHandler = useCallback(
    async (files) => {
      const mediaItems = [...media];

      await Promise.all(
        files.map(async (file) => {
          const mediaData = await getResourceFromLocalFile(file);
          mediaData.local = false; // this disables the UploadingIndicator
          mediaItems.push(mediaData);
        })
      );

      setLocalStoryAdMedia(mediaItems);
    },
    [media, setLocalStoryAdMedia]
  );

  return (
    <UploadDropTarget onDrop={onDropHandler} labelledBy={MESSAGE_ID}>
      {children}
      <UploadDropTargetMessage
        id={MESSAGE_ID}
        message={__('Upload to media library', 'web-stories')}
      />
    </UploadDropTarget>
  );
}

LibraryUploadDropTarget.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LibraryUploadDropTarget;
