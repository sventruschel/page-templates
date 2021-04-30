(() => ({
  name: 'Carousel',
  icon: 'StepperIcon',
  category: 'NAVIGATION',
  structure: [
    {
      name: 'Carousel',
      options: [
        {
          type: 'NUMBER',
          label: 'Show image',
          key: 'activeStep',
          value: '1',
        },
        {
          type: 'TOGGLE',
          label: 'Show all images',
          key: 'showAllImages',
          value: false,
        },
        {
          type: 'TOGGLE',
          label: 'Autoplay',
          key: 'autoplay',
          value: false,
        },
        {
          type: 'NUMBER',
          label: 'Autoplay duration (ms)',
          key: 'duration',
          value: '5000',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'autoplay',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'CUSTOM',
          label: 'Variant',
          key: 'variant',
          value: 'text',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Overlay', value: 'dots' },
              { name: 'Bottom', value: 'text' },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Variant type',
          key: 'variantType',
          value: 'text',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Text', value: 'text' },
              { name: 'Dots', value: 'dots' },
              { name: 'Progress bar', value: 'progress' },
            ],
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'text',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Active color',
          key: 'activeColor',
          value: 'Primary',
        },
        {
          type: 'COLOR',
          label: 'Inactive color',
          key: 'inactiveColor',
          value: 'Secondary',
        },
        {
          type: 'COLOR',
          label: 'Background color',
          key: 'backgroundColor',
          value: 'White',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'text',
            },
          },
        },
        {
          type: 'COLOR',
          label: 'Step Progress color',
          key: 'stepProgressColor',
          value: 'Black',
        },
        {
          type: 'VARIABLE',
          label: 'Button next text',
          key: 'buttonNext',
          value: ['Next'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'text',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Button previous text',
          key: 'buttonPrev',
          value: ['Back'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'variant',
              comparator: 'EQ',
              value: 'text',
            },
          },
        },
      ],
      descendants: [
        {
          name: 'CarouselImage',
          options: [
            {
              value: [
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
              ],
              label: 'Source',
              key: 'imageSource',
              type: 'VARIABLE',
            },
            {
              type: 'SIZE',
              label: 'Width',
              key: 'width',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              type: 'SIZE',
              label: 'Height',
              key: 'height',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
          ],
          descendants: [],
        },
        {
          name: 'CarouselImage',
          options: [
            {
              value: [
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
              ],
              label: 'Source',
              key: 'imageSource',
              type: 'VARIABLE',
            },
            {
              type: 'SIZE',
              label: 'Width',
              key: 'width',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              type: 'SIZE',
              label: 'Height',
              key: 'height',
              value: '',
              configuration: {
                as: 'UNIT',
              },
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
