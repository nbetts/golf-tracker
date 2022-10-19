import { openModal } from '@mantine/modals';
import AddCourseModal from 'src/components/modals/AddCourseModal';
import AddPlayerModal, { AddPlayerModalProps } from 'src/components/modals/AddPlayerModal';
import EditCourseModal, { EditCourseModalProps } from 'src/components/modals/EditCourseModal';

export const openAddPlayerModal = (props: AddPlayerModalProps) => {
  openModal({
    title: 'Welcome! Confirm your name',
    children: <AddPlayerModal {...props} />,
    withCloseButton: false,
    closeOnEscape: false,
    closeOnClickOutside: false,
  });
};

export const openAddCourseModal = () => {
  openModal({ title: 'Add course', children: <AddCourseModal /> });
};

export const openEditCourseModal = (props: EditCourseModalProps) => {
  openModal({ title: 'Edit course', children: <EditCourseModal {...props} /> });
};
