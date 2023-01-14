import { openModal } from '@mantine/modals';
import {
  AddPlayerModalProps,
  AddPlayerModal,
  EditPlayerModalProps,
  EditPlayerModal,
  AddCourseModal,
  EditCourseModalProps,
  EditCourseModal,
  AddScorecardModalProps,
  AddScorecardModal,
  EditScorecardModalProps,
  EditScorecardModal,
} from 'src/components';
import { AccountSettingsModal } from 'src/components/modals/AccountSettingsModal';

export const openAccountSettingsModal = () => {
  openModal({ title: 'Account settings', children: <AccountSettingsModal /> });
};

export const openAddPlayerModal = (props: AddPlayerModalProps) => {
  openModal({
    title: 'Welcome! Confirm your name',
    children: <AddPlayerModal {...props} />,
    withCloseButton: false,
    closeOnEscape: false,
    closeOnClickOutside: false,
  });
};

export const openEditPlayerModal = (props: EditPlayerModalProps) => {
  openModal({ title: 'Edit profile', children: <EditPlayerModal {...props} /> });
};

export const openAddCourseModal = () => {
  openModal({ title: 'Add course', children: <AddCourseModal /> });
};

export const openEditCourseModal = (props: EditCourseModalProps) => {
  openModal({ title: 'Edit course', children: <EditCourseModal {...props} /> });
};

export const openAddScorecardModal = (props: AddScorecardModalProps) => {
  openModal({ title: 'Add scorecard', children: <AddScorecardModal {...props} /> });
};

export const openEditScorecardModal = (props: EditScorecardModalProps) => {
  openModal({ title: 'Edit scorecard', children: <EditScorecardModal {...props} /> });
};
