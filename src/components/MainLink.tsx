import { ReactNode } from 'react';
import { ThemeIcon, NavLink } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';

type MainLinkProps = {
  icon: ReactNode;
  color: string;
  label: string;
};

export default function MainLink({ icon, color, label }: MainLinkProps) {
  return (
    <NavLink
      label={label}
      icon={
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
      }
      rightSection={<IconChevronRight size={12} />}
    />
  );
}
