import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'green',
  components: {
    DatePicker: {
      defaultProps: {
        size: 'md',
      },
    },
    Flex: {
      defaultProps: {
        gap: 'md',
        wrap: 'wrap',
      },
    },
    MultiSelect: {
      defaultProps: {
        size: 'md',
      },
    },
    NumberInput: {
      defaultProps: {
        size: 'md',
        inputMode: 'numeric',
      },
    },
    Select: {
      defaultProps: {
        size: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        size: 'md',
      },
    },
  },
};
