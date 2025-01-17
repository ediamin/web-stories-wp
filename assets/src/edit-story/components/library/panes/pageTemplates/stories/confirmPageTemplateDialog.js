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
import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import ConfirmPageTemplateDialog from '../confirmPageTemplateDialog';

export default {
  title: 'Stories Editor/Components/Dialog/Confirm Page Template',
  component: ConfirmPageTemplateDialog,
};

export const _default = () => {
  return (
    <ConfirmPageTemplateDialog
      onConfirm={action('confirmed')}
      onClose={action('closed')}
    />
  );
};
