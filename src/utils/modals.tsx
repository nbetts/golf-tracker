import { openModal } from '@mantine/modals';
import AddCourseModal from 'src/components/modals/AddCourseModal';
import AddPlayerModal, { AddPlayerModalProps } from 'src/components/modals/AddPlayerModal';
import AddScorecardModal, { AddScorecardModalProps } from 'src/components/modals/AddScorecardModal';
import EditCourseModal, { EditCourseModalProps } from 'src/components/modals/EditCourseModal';
import EditPlayerModal, { EditPlayerModalProps } from 'src/components/modals/EditPlayerModal';

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
