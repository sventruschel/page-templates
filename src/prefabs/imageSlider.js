(() => ({
  name: 'ImageSlider',
  icon: 'IconIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'ImageSlider',
      options: [
        {
          value: [],
          label: 'Source',
          key: 'imageSource',
          type: 'VARIABLE',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'img',
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
