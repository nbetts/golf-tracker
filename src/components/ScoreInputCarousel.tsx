import { Carousel } from '@mantine/carousel';
import { useMantineColorScheme, Button } from '@mantine/core';

const scoreInputs = new Array(21).fill(0).map((_, index) => index);

type ScoreInputCarouselProps = {
  value: number;
  onChange: (value: number) => void;
};

export const ScoreInputCarousel = ({ value, onChange }: ScoreInputCarouselProps) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Carousel sx={{ maxWidth: '100%', display: 'grid' }} dragFree withControls={false} mx="auto" mb="xs" slideSize="10%" align="start" slideGap="xs">
      {scoreInputs.map((scoreInput) => (
        <Carousel.Slide key={scoreInput}>
          <Button
            variant={scoreInput === value ? 'filled' : 'outline'}
            color={colorScheme === 'dark' ? 'dark.1' : 'dark'}
            size="xs"
            onClick={() => onChange(scoreInput)}
          >
            {scoreInput}
          </Button>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
