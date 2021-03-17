(() => ({
  name: 'ImageSlider',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { MobileStepper, Button } = window.MaterialUI.Core;
    const { env, getCustomModelAttribute, useText } = B;
    const isDev = env === 'dev';

    const tutorialSteps = [
      {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
          'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: 'Bird',
        imgPath:
          'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: 'Bali, Indonesia',
        imgPath:
          'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      },
      {
        label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
        imgPath:
          'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
      },
      {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      },
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const carousel = (
      <div>
        <img
          className={classes.img}
          src={options.imageSource}
          alt={tutorialSteps[activeStep].label}
        />
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
          }
        />
      </div>
    );

    return isDev ? <div>{carousel}</div> : <div>{carousel}</div>;
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);

    return {
      root: {
        '& .MuiRating-iconEmpty': {
          color: ({ options: { emptyColor } }) => style.getColor(emptyColor),
        },
        '& .MuiRating-iconFilled': {
          color: ({ options: { filledColor } }) => style.getColor(filledColor),
        },
        '& .MuiRating-iconHover': {
          color: ({ options: { hoverColor } }) => style.getColor(hoverColor),
        },
      },
    };
  },
}))();
